from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.dependencies import get_db
import pandas as pd
import matplotlib.pyplot as plt
import io
import zipfile
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.get("/stats/student-hours")
async def student_hours_distribution(db: AsyncSession = Depends(get_db), test: bool = Query(False)):
    query = text("""
        SELECT "courseName" as course_name, "courseDepartment" as department_name, SUM("hours") as total_hours
        FROM "StudentSessionRequest"
        GROUP BY "courseName", "courseDepartment"
    """)
    result = await db.execute(query)
    data = result.fetchall()
    
    # Convert data to pandas DataFrame
    df = pd.DataFrame(data, columns=["course_name", "department_name", "total_hours"])
    df['course_name'] = df['course_name'].apply(lambda x: x[::-1])  # Reverse course names
    df['department_name'] = df['department_name'].apply(lambda x: x[::-1])  # Reverse department names

    # Group data by department
    grouped = df.groupby('department_name')

    # Define colors
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']

    # Create a ZIP file to hold all plot buffers
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED, False) as zip_file:
        for department, group in grouped:
            # Sort the group by total_hours
            group = group.sort_values(by='total_hours', ascending=True)
            
            fig, ax = plt.subplots(figsize=(20, 10))  # Increase the width and height of the figure
            
            # Assign colors to bars
            bar_colors = [colors[i % 5] for i in range(len(group))]
            bars = ax.bar(group['course_name'], group['total_hours'], color=bar_colors)

            ax.set_title(f"Distribution of Students' Requested Hours per Course in {department}")
            ax.set_xlabel("Course Name")
            ax.set_ylabel("Total Hours Requested")
            ax.set_xticklabels(group['course_name'], rotation=50, ha='right', fontsize=14)  # Rotate x-axis labels and align them to the center

            # Color x-tick labels
            for ticklabel, tickcolor in zip(ax.get_xticklabels(), bar_colors):
                ticklabel.set_color(tickcolor)

            plt.tight_layout()  # Adjust the layout to make room for the labels

            # Save plot to a BytesIO object
            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', dpi=200)
            buf.seek(0)

            # Add the buffer to the ZIP file
            zip_file.writestr(f"{department}.png", buf.getvalue())

            if test:
                # If testing, return the first plot
                buf.seek(0)
                return StreamingResponse(buf, media_type="image/png")

    zip_buffer.seek(0)

    return StreamingResponse(zip_buffer, media_type="application/zip", headers={"Content-Disposition": "attachment;filename=department_plots.zip"})
