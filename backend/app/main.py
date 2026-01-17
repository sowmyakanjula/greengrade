from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("greengrade")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://greengrade.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    logger.info("Health endpoint called")
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    item_type: str = Form(...)
):
    logger.info(f"Analyze request | file={image.filename} | type={item_type}")

    result = {
        "grade": "A",
        "health": 92,
        "growth_stage": "Blooming",
        "care_tips": "Water regularly",
        "filename": image.filename,
        "type": item_type
    }

    logger.info(f"Analyze success | file={image.filename}")
    return result
