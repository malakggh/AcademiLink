from fastapi import FastAPI
from app.routers import router as api_router

app = FastAPI()

app.include_router(api_router, prefix="/api")

@app.get("/")
async def read_root():
    return {"Hello": "World"}
