from fastapi import APIRouter, Body, HTTPException, status

from app.models.user import UserModel
from app.services.user import UserService

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.get(
        "/{user_id}",
        response_description="Get a single user",
        response_model=UserModel,
        response_model_by_alias=False
)
async def show_user(id: str):
    """
    Get the record for a specific user, looked up by `id`.
    """
    if (
        user := await UserService().get_user(id)
    ) is not None: 
        return user

    raise HTTPException(status_code=404, detail=f"user {id} not found")


@router.post(
    "/",
    response_description="Add new user",
    response_model=UserModel,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False,
)
async def create_user(user: UserModel = Body(...)):
    """
    Insert a new user record.

    A unique `id` will be created and provided in the response.
    """
    new_user = await UserService().post_user(user)
    created_user = await UserService().get_user(new_user.inserted_id)
    return created_user
