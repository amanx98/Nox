from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Thread(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    tag_id: int = Field(foreign_key="tag.id")
    title: str
    body: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

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