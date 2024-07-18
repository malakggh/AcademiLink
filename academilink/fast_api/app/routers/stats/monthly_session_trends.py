from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.utils.plotting import generate_grouped_bar_plot
from app.dependencies import get_db
from app.utils.data_processing import process_data
from app.utils.zip_utils import create_zip_from_plots
from app.utils.db_utils import get_current_semester_id
from app.utils.constants import COLORS
from fastapi.responses import StreamingResponse
import logging
import pandas as pd

logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.get("/monthly-session-trends")
async def monthly_session_trends(db: AsyncSession = Depends(get_db), test: bool = False):
    semester_id = await get_current_semester_id(db)
    query = """
    SELECT TO_CHAR("date", 'YYYY-MM') AS month, 
           COUNT(*) FILTER (WHERE status = 'COMPLETED') AS total_done,
           COUNT(*) FILTER (WHERE status = 'CANCELED') AS total_cancelled,
           COUNT(*) FILTER (WHERE status = 'PENDING') AS total_pending,
           COUNT(*) AS total_request
    FROM "StudentSessionRequest"
    WHERE "semesterId" = :semester_id
    GROUP BY month
    ORDER BY month;
    """
    result = await db.execute(text(query), {"semester_id": semester_id})
    data = result.fetchall()
    logging.info(f"Raw Data: {data}")
    
    column_names = ["month", "total_done", "total_cancelled", "total_pending", "total_request"]
    df = process_data(data, column_names, columns_to_reverse=[])
    logging.info(f"Processed DataFrame: {df}")

    if test:
        buf = generate_grouped_bar_plot(df, "month", ["total_done", "total_cancelled", "total_pending", "total_request"], "Monthly Session Trends", x_label="Month", y_label="Count", colors=COLORS)
        return StreamingResponse(buf, media_type="image/png")
    else:
        _, zip_buffer = create_zip_from_plots([(df, "monthly_session_trends")], "month", ["total_done", "total_cancelled", "total_pending", "total_request"], colors=COLORS, plot_type='grouped_bar', title_template="Monthly Session Trends")
        return StreamingResponse(zip_buffer, media_type="application/zip", headers={"Content-Disposition": "attachment; filename=monthly_session_trends.zip"})
