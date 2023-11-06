# "users" submodule, e.g. import app.routers.users
from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

fake_items_db = {"plumbus": {"name": "Plumbus"}, "gun": {"name": "Portal Gun"}}



@router.get("/{user_id}")
async def read_user(user_id: str):
    if user_id not in fake_items_db:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user_id}
