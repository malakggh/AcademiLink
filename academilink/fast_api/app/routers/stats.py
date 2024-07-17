from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.dependencies import get_db
from app.utils.data_processing import process_data
from app.utils.zip_utils import create_zip_from_plots
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

    column_names = ["course_name", "department_name", "total_hours"]
    columns_to_reverse = ["course_name", "department_name"]
    df = process_data(data, column_names, columns_to_reverse)
    grouped_data = df.groupby('department_name')

    # Define colors
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']

    first_plot, zip_buffer = create_zip_from_plots(grouped_data, 'course_name', 'total_hours', colors, test)

    if test and first_plot:
        return StreamingResponse(first_plot, media_type="image/png")

    return StreamingResponse(zip_buffer, media_type="application/zip", headers={"Content-Disposition": "attachment;filename=department_plots.zip"})
