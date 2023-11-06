import os

import motor.motor_asyncio
from typing_extensions import Annotated
from pydantic.functional_validators import BeforeValidator


client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.get_database("college")
chat_collection = db.get_collection("chats")
users_collection = db.get_collection("users")

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]