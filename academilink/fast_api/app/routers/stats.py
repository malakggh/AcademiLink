# app/routers/stats.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.dependencies import get_db
import pandas as pd
import matplotlib.pyplot as plt
import io
from fastapi.responses import StreamingResponse
import matplotlib.font_manager as fm
router = APIRouter()

@router.get("/stats/student-hours")
async def student_hours_distribution(db: AsyncSession = Depends(get_db)):
    query = text("""
        SELECT "courseName" as course_name, SUM("hours") as total_hours
        FROM "StudentSessionRequest"
        GROUP BY "courseName"
    """)
    result = await db.execute(query)
    data = result.fetchall()
    
    # Convert data to pandas DataFrame
    df = pd.DataFrame(data, columns=["course_name", "total_hours"])
    df['course_name'] = df['course_name'].apply(lambda x: x[::-1])  # Reverse course names
    # Plot data
    plt.figure(figsize=(20, 10))  # Increase the width and height of the figure
    df.plot(kind='bar', x='course_name', y='total_hours', legend=False)
    plt.title("Distribution of Students' Requested Hours per Course")
    plt.xlabel("Course Name")
    plt.ylabel("Total Hours Requested")
    plt.xticks(rotation=45, ha='right')  # Rotate x-axis labels and align them to the right

    # Save plot to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=200)
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png")