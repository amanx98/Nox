from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.tag import Tag
from app.schemas.tag import TagCreate, TagRead

router = APIRouter(prefix="/tags", tags=["tags"])

@router.post("/", response_model=TagRead)
def create_tag(tag_in: TagCreate, session: Session = Depends(get_session)):
    tag = Tag(name=tag_in.name, type=tag_in.type)
    session.add(tag)
    session.commit()
    session.refresh(tag)
    return tag

@router.get("/", response_model=list[TagRead])
def list_tags(session: Session = Depends(get_session)):
    return session.exec(select(Tag)).all()