from pydantic import BaseModel

class TagCreate(BaseModel):
    name: str
    type: str

class TagRead(BaseModel):
    id: int
    name: str
    type: str