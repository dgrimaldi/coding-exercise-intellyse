from typing import Optional

from datetime import datetime
from pydantic import ConfigDict, BaseModel, Field, List
from app.utils.database import PyObjectId

class ChatModel(BaseModel):
    """
    Container for a single message record.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    sender: str = Field(...)
    answer: Optional[str] = Field(...)
    message: str = Field(...)
    timestamp: Optional[datetime] = None
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "sender": "jdoe@example.com",
                "answer": "Hello from ChatGPT",
                "message": "Hi",
                "timestamp": "2022-09-19 17:44:17.858167"
            }
        },
    )

class ChatCollection(BaseModel):
    """
    A container holding a list of `ChatModel` instances.

    This exists because providing a top-level array in a JSON response can be a [vulnerability](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/)
    """

    students: List[ChatModel]