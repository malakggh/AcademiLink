from fastapi import APIRouter
from .courses import router as courses_router
from .stats import router as stats_router

router = APIRouter()

router.include_router(courses_router, prefix="/courses", tags=["Courses"])
router.include_router(stats_router, prefix="/stats", tags=["Stats"])
