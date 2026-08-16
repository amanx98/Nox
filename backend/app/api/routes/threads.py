from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.thread import Thread
from app.models.user import User
from app.schemas.thread import ThreadCreate, ThreadRead
from app.core.deps import get_current_user

router = APIRouter(prefix="/threads", tags=["threads"])

@router.post("/", response_model=ThreadRead)
def create_thread(
    thread_in: ThreadCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    thread = Thread(
        user_id=current_user.id,
        tag_id=thread_in.tag_id,
        title=thread_in.title,
        body=thread_in.body,
    )
    session.add(thread)
    session.commit()
    session.refresh(thread)
    return thread

@router.get("/", response_model=list[ThreadRead])
def list_threads(tag_id: int | None = None, session: Session = Depends(get_session)):
    query = select(Thread)
    if tag_id:
        query = query.where(Thread.tag_id == tag_id)
    return session.exec(query).all()