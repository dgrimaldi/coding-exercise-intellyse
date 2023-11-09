from fastapi import APIRouter, Body, HTTPException, status

from app.models.user import UserModel, UserAuthModel
from app.services.user import UserService
from bson import json_util
from fastapi.responses import JSONResponse


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post(
    "/authentication",
    response_description="authenticate a single user by email and password",
    response_model_by_alias=False
)
async def auth(auth_user: UserAuthModel = Body(...)):
    """
    Get the record for a specific user, looked up by `email` and `psw`.
    """
    if (
        user := await UserService().user_auth(auth_user.email, auth_user.password)
    ) is not None: 
        return JSONResponse(content=json_util.dumps(user))

    raise HTTPException(status_code=401, detail=f"Incorrect email or password")

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
    try: 
        new_user = await UserService().post_user(user)
        created_user = await UserService().get_user(new_user.inserted_id)
        return created_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Creation of a new user failed, try it again!")
