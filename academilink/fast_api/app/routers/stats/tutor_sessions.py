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

@router.get("/tutor-sessions")
async def tutor_sessions_distribution(db: AsyncSession = Depends(get_db), test: bool = Query(False)):
    current_semester_id = await get_current_semester_id(db)
    logging.info(f"Current Semester ID: {current_semester_id}")

    query = text(f"""
        SELECT "tutorId" as tutor_id, SUM(hours) as total_hours
        FROM "StudentSessionRequest"
        WHERE "semesterId" = :semester_id
        GROUP BY "tutorId"
    """)
    result = await db.execute(query, {"semester_id": current_semester_id})
    data = result.fetchall()
    logging.info(f"Data fetched: {data}")

    column_names = ["tutor_id", "total_hours"]
    df = process_data(data, column_names, columns_to_reverse=[])

    # Count the number of tutors for each unique total hour count
    tutor_hours_distribution = df['total_hours'].value_counts().sort_index().reset_index()
    tutor_hours_distribution.columns = ['total_hours', 'tutor_count']
    logging.info(f"Tutor Hours Distribution DataFrame: {tutor_hours_distribution}")

    # Generate a line plot for the tutor hours distribution
    title = "Number of Tutors per Total Hours"
    plot_buf = generate_line_plot(tutor_hours_distribution, 'total_hours', 'tutor_count', title, "Total Hours", "Number of Tutors", COLORS)

    if test:
        logging.info("Returning plot for testing.")
        return StreamingResponse(plot_buf, media_type="image/png")

    logging.info("Returning plot as PNG image.")
    return StreamingResponse(plot_buf, media_type="image/png")
