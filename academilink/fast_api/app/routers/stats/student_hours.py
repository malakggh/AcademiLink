from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.utils.plotting import generate_line_plot, generate_plot
from app.dependencies import get_db
from app.utils.data_processing import process_data
from app.utils.zip_utils import create_zip_from_plots
from app.utils.db_utils import get_current_semester_id
from app.utils.constants import COLORS
from fastapi.responses import StreamingResponse
import logging
import pandas as pd
import numpy as np
logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.get("/student-hours")
async def student_hours_distribution(db: AsyncSession = Depends(get_db), test: bool = Query(False)):
    # Get the current semester ID
    current_semester_id = await get_current_semester_id(db)

    query = text("""
        SELECT "courseName" as course_name, "courseDepartment" as department_name, SUM("hours") as total_hours
        FROM "StudentSessionRequest"
        WHERE "semesterId" = :semester_id
        GROUP BY "courseName", "courseDepartment"
    """)
    result = await db.execute(query, {"semester_id": current_semester_id})
    data = result.fetchall()

    column_names = ["course_name", "department_name", "total_hours"]
    columns_to_reverse = ["course_name", "department_name"]
    df = process_data(data, column_names, columns_to_reverse)
    grouped_data = df.groupby('department_name')

    title_template = "Distribution of Total Hours per Course for {key}"
    first_plot, zip_buffer = create_zip_from_plots(grouped_data, 'course_name', 'total_hours', COLORS, 'bar', title_template, "Course Name", "Total Hours Requested", test)

    if test and first_plot:
        return StreamingResponse(first_plot, media_type="image/png")

    return StreamingResponse(zip_buffer, media_type="application/zip", headers={"Content-Disposition": "attachment;filename=student_hours.zip"})
