from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.utils.plotting import generate_plot
from app.dependencies import get_db
from app.utils.data_processing import process_data
from app.utils.zip_utils import create_zip_from_plots
from app.utils.db_utils import get_current_semester_id
from app.utils.constants import COLORS
from fastapi.responses import StreamingResponse
import logging

logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.get("/tutor-course-distribution")
async def tutor_course_distribution(db: AsyncSession = Depends(get_db), test: bool = Query(False)):
    query = """
    SELECT "courseName" as course_name, "courseDepartment" as course_department, COUNT(DISTINCT "tutorId") as tutor_count
    FROM "TutorCourse"
    GROUP BY "courseName", "courseDepartment"
    ORDER BY course_department, tutor_count DESC;
    """
    result = await db.execute(text(query))
    data = result.fetchall()
    logging.info(f"Raw Data: {data}")
    
    column_names = ["course_name", "course_department", "tutor_count"]
    df = process_data(data, column_names, columns_to_reverse=["course_name", "course_department"])
    logging.info(f"Processed DataFrame: {df}")

    # Group the data by department
    grouped_data = df.groupby('course_department')

    title_template = "Tutor Distribution for {key}"
    first_plot, zip_buffer = create_zip_from_plots(grouped_data, 'course_name', 'tutor_count', COLORS, 'bar', title_template, "Course Name", "Number of Tutors", test)

    if test and first_plot:
        return StreamingResponse(first_plot, media_type="image/png")

    return StreamingResponse(zip_buffer, media_type="application/zip", headers={"Content-Disposition": "attachment;filename=tutor_course_distribution.zip"})
