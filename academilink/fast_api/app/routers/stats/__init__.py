# routers/stats/__init__.py
from fastapi import APIRouter
from .student_hours import router as student_hours_router
from .tutor_sessions import router as tutor_sessions_router
from .session_completion_rates import router as session_completion_rates_router
from .monthly_session_trends import router as monthly_session_trends_router

router = APIRouter()

router.include_router(student_hours_router, tags=["Stats"])
router.include_router(tutor_sessions_router, tags=["Stats"])
router.include_router(session_completion_rates_router, tags=["Stats"])
router.include_router(monthly_session_trends_router, tags=["Stats"])
