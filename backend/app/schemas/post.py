from pydantic import BaseModel
from datetime import datetime

class PostCreate(BaseModel):
    thread_id: int
    body: str

class PostRead(BaseModel):
    id: int
    thread_id: int
    user_id: int
    body: str
    created_at: datetime