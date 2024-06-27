# app/routers/courses.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.dependencies import get_db

router = APIRouter()

@router.get("/courses")
async def read_courses(db: AsyncSession = Depends(get_db)):
    result = await db.execute(text("SELECT * FROM \"AllCoursesInSCE\""))
    courses = result.fetchall()
    parsed_courses = []
    for course in courses:
        parsed_course = {
            "courseName": course[0],
            "courseDepartment": course[1],
            "courseSemester": course[2]
        }
        parsed_courses.append(parsed_course)
    return parsed_courses
