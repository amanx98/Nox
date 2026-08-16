from sqlmodel import SQLModel, Field
from typing import Optional

class LastfmProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", unique=True)
    lastfm_username: str
    session_key: str