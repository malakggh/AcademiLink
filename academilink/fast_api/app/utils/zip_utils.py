import zipfile
import io
from app.utils.plotting import generate_grouped_bar_plot, generate_plot

def create_zip_from_plots(grouped_data, x_col, y_col, colors, plot_type='bar', title_template="Distribution of {y_col} per {x_col} for {key}", x_label=None, y_label=None, test=False):
    zip_buffer = io.BytesIO()
    first_plot_buf = None
    
    with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED, False) as zip_file:
        for i, (key, group) in enumerate(grouped_data):
            title = title_template.format(x_col=x_col.replace('_', ' ').capitalize(), y_col=y_col.replace('_', ' ').capitalize(), key=key)
            x_label_final = x_label if x_label else x_col.replace('_', ' ').capitalize()
            y_label_final = y_label if y_label else y_col.replace('_', ' ').capitalize()
            # buf = generate_plot(group, x_col, y_col, title, x_label_final, y_label_final, colors, plot_type)
            if plot_type == 'grouped_bar':
                buf = generate_grouped_bar_plot(group, x_col, y_col, title, x_label_final, y_label_final, colors)
            else:
                buf = generate_plot(group, x_col, y_col[0], title, x_label_final, y_label_final, colors, plot_type)
            # Add the buffer to the ZIP file
            zip_file.writestr(f"{key}.png", buf.getvalue())

            if test and i == 0:
                # Save the first plot buffer for testing
                first_plot_buf = io.BytesIO(buf.getvalue())
    
    zip_buffer.seek(0)
    if test and first_plot_buf:
        first_plot_buf.seek(0)
        return first_plot_buf, zip_buffer
    return None, zip_buffer

