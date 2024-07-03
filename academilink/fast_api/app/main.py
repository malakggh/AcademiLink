# app/main.py
from fastapi import FastAPI
from app.routers import courses, stats

app = FastAPI()

app.include_router(courses.router, prefix="/api")
app.include_router(stats.router, prefix="/api")

@app.get("/")
async def read_root():
    return {"Hello": "World"}
