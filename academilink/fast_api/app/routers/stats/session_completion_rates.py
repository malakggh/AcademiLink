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


@router.get("/session-completion-rates") # a pie chart
async def session_completion_rates(db: AsyncSession = Depends(get_db), test: bool = Query(False)):
    current_semester_id = await get_current_semester_id(db)
    logging.info(f"Current Semester ID: {current_semester_id}")

    query = text(f"""
        SELECT status, COUNT(*) as count
        FROM "StudentSessionRequest"
        WHERE "semesterId" = :semester_id
        GROUP BY status
    """)
    result = await db.execute(query, {"semester_id": current_semester_id})
    data = result.fetchall()
    logging.info(f"Data fetched: {data}")

    column_names = ["status", "count"]
    df = pd.DataFrame(data, columns=["status", "count"]).groupby("status").sum().reset_index()
    logging.info(f"Aggregated DataFrame: {df}")

    title = "Session Completion Rates"
    plot_buf = generate_plot(df, 'status', 'count', title, "", "", COLORS, 'pie')

    if test:
        logging.info("Returning plot for testing.")
        return StreamingResponse(plot_buf, media_type="image/png")

    logging.info("Returning plot as PNG image.")
    return StreamingResponse(plot_buf, media_type="image/png")
