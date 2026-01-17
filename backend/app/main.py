from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://greengrade.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "GreenGrade backend running"}

@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    item_type: str = Form(...)
):
    # mock response (replace with ML later)
    return {
        "grade": "A",
        "health": 92,
        "growth_stage": "Blooming",
        "care_tips": "Water regularly and keep in sunlight",
        "filename": image.filename,
        "type": item_type
    }
