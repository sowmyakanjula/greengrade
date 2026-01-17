from fastapi import APIRouter, UploadFile, File, Form
from app.services.grader import grade_item

router = APIRouter()

@router.post("/analyze")
async def analyze_image(
    item_type: str = Form(...),
    image: UploadFile = File(...)
):
    # For now: we are not doing ML; just returning grading based on type.
    result = grade_item(item_type)

    return {
        "type": item_type,
        "filename": image.filename,
        **result
    }
