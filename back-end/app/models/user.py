from typing import Optional

from pydantic import ConfigDict, BaseModel, Field

from app.utils.database import PyObjectId


class UserModel(BaseModel):
    """
    Container for a single user record.
    """

    # The primary key for the UserModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses.
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: str = Field(...)
    password: str = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "email": "jdoe@example.com",
                "password": "1234"
            }
        },
    )

class UserAuthModel(BaseModel):
    """
        A set of vrified user associated with users.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: str
    password: str