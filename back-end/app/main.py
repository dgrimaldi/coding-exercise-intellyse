from typing import Union
from .routers import chats

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="ChatGPT API",
    summary="A streamlined chat interface similar to ChatGPT, with FastAPI that add a ReST API to a MongoDB collection.",
)
app.include_router(chats.router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    # for simplicity all methods and headers are allowed, with *
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello from chatGPT Applications!"}
