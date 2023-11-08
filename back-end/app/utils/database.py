import motor.motor_asyncio
from typing_extensions import Annotated
from pydantic.functional_validators import BeforeValidator


uri = "mongodb+srv://test:coding-exercise-intellyse@cluster0.khnjgi9.mongodb.net/?retryWrites=true&w=majority"


client = motor.motor_asyncio.AsyncIOMotorClient(uri)
db = client.get_database("chat-db")
chat_collection = db.get_collection("chats")
user_collection = db.get_collection("users")

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]