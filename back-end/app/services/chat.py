import datetime
from openai import OpenAI
import os
from app.models.chat import ChatCollection
from app.utils.database import chat_collection


mocked_response = {
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "model": "gpt-3.5-turbo-0613",
    "system_fingerprint": "fp_44709d6fcb",
    "choices": [{
        "index": 0,
        "message": {
        "role": "assistant",
        "content": "\n\nHello there, how may I assist you today?",
        },
        "finish_reason": "stop"
    }],
    "usage": {
        "prompt_tokens": 9,
        "completion_tokens": 12,
        "total_tokens": 21
    }
}



class ChatService():
    async def post_message(self, chat):
        """
        response_example = {
            "id": "chatcmpl-123",
            "object": "chat.completion",
            "created": 1677652288,
            "model": "gpt-3.5-turbo-0613",
            "system_fingerprint": "fp_44709d6fcb",
            "choices": [{
                "index": 0,
                "message": {
                "role": "assistant",
                "content": "\n\nHello there, how may I assist you today?",
                },
                "finish_reason": "stop"
            }],
            "usage": {
                "prompt_tokens": 9,
                "completion_tokens": 12,
                "total_tokens": 21
            }
        }
        """
        try:
            client = OpenAI()
            completion = await client.chat.completions.create(
                
                model="gpt-3.5-turbo",
                messages=[
                       {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
                       {"role": "user", "content": chat.message}
                       ]
                )
        except Exception as e:
            # TODO remove, workaround ralated to problem of openai api key, remove as soon as solved the key problem
            print(e)
            completion = mocked_response

        chat.answer = completion["choices"][0]["message"]["content"]
        chat.timestamp = datetime.datetime.now()
        try:
            await chat_collection.insert_one(
                chat.model_dump(by_alias=True, exclude=["id"]))
            return "done"
        except Exception as e:
            print("An exception occurred ::", e)
            return None
    
    async def find_messages_by_user(self, userId):
        sort = {'timestamp': 1}
        try: 
            return ChatCollection(chats=await chat_collection.find({"sender": userId}).sort(sort).to_list(1000)) 
        except Exception as e:
            print("An exception occurred ::", e)
            return None
