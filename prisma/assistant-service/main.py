
from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="Guitaring Assistant")


class Product(BaseModel):
    id: int
    title: str
    price: float
    description: str = ""


class Course(BaseModel):
    id: int
    title: str
    price: float
    level: Literal["beginner", "intermediate", "advanced"]
    description: str = ""


class RecommendationRequest(BaseModel):
    skill_level: Literal["beginner", "intermediate", "advanced"]
    budget: float = Field(gt=0)
    products: list[Product] = []
    courses: list[Course] = []


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/recommend")
def recommend(data: RecommendationRequest):
    products = [
        product
        for product in data.products
        if product.price <= data.budget
    ]

    products.sort(key=lambda product: product.price)

    courses = [
        course
        for course in data.courses
        if course.level == data.skill_level
    ]

    courses.sort(key=lambda course: course.price)

    return {
        "message": "Here are your recommendations!",
        "products": [
            {
                **product.model_dump(),
                "reason": "This guitar fits your budget."
            }
            for product in products[:3]
        ],
        "courses": [
            {
                **course.model_dump(),
                "reason": f"This course matches your {data.skill_level} level."
            }
            for course in courses[:3]
        ],
    }
