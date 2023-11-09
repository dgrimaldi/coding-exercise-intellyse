from fastapi import APIRouter, Body, status, HTTPException
from app.models.chat import ChatModel, ChatCollection


from app.services.chat import ChatService

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
    responses={404: {"description": "Not found"}},
)

@router.get(
        "/{id}",
        response_description="Get all messages related to a user",
        response_model=ChatCollection,
        response_model_by_alias=False
)
async def get_message_by_user(id: str):
    """
    List all of the chat data related to a user in the database.

    The response is unpaginated and limited to 1000 results.
    """
    if (
        chat := await ChatService().find_messages_by_user(id)
    ) is not None: 
        return chat

    raise HTTPException(status_code=404, detail=f"no messages for {id}")


@router.post(
    "/",
    response_description="Add new chat message",
    response_model=str,
    status_code=status.HTTP_201_CREATED, 
    response_model_by_alias=False,
)

async def create_message(chat: ChatModel = Body(..., embed=True)):
    """
    Insert a new message record.

    A unique `id` will be created.
    """
    if (
        res := await ChatService().post_message(chat)
    ) is not None: 
        return res
    
    raise HTTPException(status_code=500, detail=f"Creation of a new message failed, try it again!")