from bson import ObjectId
from app.utils.database import user_collection

# I use service for user to avoid to expose directly the call to the database
class UserService():
    async def get_user(self, id):
        return await user_collection.find_one({"_id": ObjectId(id)})
    
    async def post_user(self, user):
        return await user_collection.insert_one(
            user.model_dump(by_alias=True, exclude=["id"]))