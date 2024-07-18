from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

async def get_current_semester_id(db: AsyncSession):
    query = text("""
        SELECT id
        FROM "SemesterInSCE"
        ORDER BY "startingDate" DESC
        LIMIT 1
    """)
    result = await db.execute(query)
    current_semester = result.fetchone()
    if not current_semester:
        raise Exception("Current semester not found")
    return current_semester[0]
