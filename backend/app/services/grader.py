def grade_item(item_type: str):
    item_type = item_type.lower().strip()

    if item_type in ["flower", "plant"]:
        return {
            "grade": "A",
            "health": 92,
            "growth_stage": "Blooming" if item_type == "flower" else "Healthy Growth",
            "care_tips": "Water 2-3 times/week, give sunlight, avoid overwatering."
        }

    if item_type == "tree":
        return {
            "grade": "B",
            "health": 80,
            "growth_stage": "Young Tree",
            "care_tips": "Deep water weekly, mulch around base, ensure good drainage."
        }

    if item_type == "seed":
        return {
            "grade": "A",
            "health": 90,
            "growth_stage": "Ready for Sowing",
            "care_tips": "Store cool/dry, sow in moist soil, avoid harsh sun initially."
        }

    return {
        "grade": "C",
        "health": 60,
        "growth_stage": "Unknown",
        "care_tips": "Basic care: water, sunlight, observe soil and leaves."
    }
