from sqlmodel import SQLModel, Field
from typing import Optional

class Tag(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)
    type: str  # "artist" | "genre" | "custom"

from pydantic import BaseModel

class TagCreate(BaseModel):
    name: str
    type: str

class TagRead(BaseModel):
    id: int
    name: str
    type: str