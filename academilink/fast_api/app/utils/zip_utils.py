import zipfile
import io
from app.utils.plotting import generate_plot

def create_zip_from_plots(grouped_data, x_col, y_col, colors, test=False):
    zip_buffer = io.BytesIO()
    first_plot_buf = None
    
    with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED, False) as zip_file:
        for i, (department, group) in enumerate(grouped_data):
            title = f"Distribution of Students' Requested Hours per Course in {department}"
            x_label = "Course Name"
            y_label = "Total Hours Requested"
            buf = generate_plot(group, x_col, y_col, title, x_label, y_label, colors)

            # Add the buffer to the ZIP file
            zip_file.writestr(f"{department}.png", buf.getvalue())

            if test and i == 0:
                # Save the first plot buffer for testing
                first_plot_buf = io.BytesIO(buf.getvalue())
    
    zip_buffer.seek(0)
    if test and first_plot_buf:
        first_plot_buf.seek(0)
        return first_plot_buf, zip_buffer
    return None, zip_buffer
