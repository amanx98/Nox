from pydantic import BaseModel
from datetime import datetime

class ThreadCreate(BaseModel):
    tag_id: int
    title: str
    body: str

class ThreadRead(BaseModel):
    id: int
    user_id: int
    tag_id: int
    title: str
    body: str
    created_at: datetime