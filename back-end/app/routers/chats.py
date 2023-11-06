# "chats" submodule, e.g. import app.routers.chats
from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
    responses={404: {"description": "Not found"}},
)

fake_items_db = {"plumbus": {"name": "Plumbus"}, "gun": {"name": "Portal Gun"}}



@router.get("/{chat_id}")
async def read_chat(chat_id: str):
    if chat_id not in fake_items_db:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"chat_id": chat_id}
