from bson import  ObjectId
from fastapi.security import OAuth2PasswordBearer
from app.utils.database import user_collection


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# I use service for user to avoid to expose directly the call to the database
class UserService():
    async def get_user(self, id):
        try:
            return await user_collection.find_one({"_id": ObjectId(id)})
        except Exception as e:
            print("An exception occurred ::", e)
            return None
    
    async def post_user(self, user):
        try:
            return await user_collection.insert_one(
                user.model_dump(by_alias=True, exclude=["id"]))
        except Exception as e:
            print("An exception occurred ::", e)
            return None
    
    # TODO will be implemented OAuth2PasswordRequestForm
    # https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/
    # store the hased password and not as a string
    async def user_auth(self, email, password):
        try:
            return await user_collection.find_one({"email":str(email), "password": str(password)})
        except Exception as e:
            print("An exception occurred ::", e)
            return None