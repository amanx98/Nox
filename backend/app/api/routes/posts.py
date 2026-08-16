from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.post import Post
from app.models.user import User
from app.schemas.post import PostCreate, PostRead
from app.core.deps import get_current_user

router = APIRouter(prefix="/posts", tags=["posts"])

@router.post("/", response_model=PostRead)
def create_post(
    post_in: PostCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    post = Post(
        thread_id=post_in.thread_id,
        user_id=current_user.id,
        body=post_in.body,
    )
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@router.get("/", response_model=list[PostRead])
def list_posts(thread_id: int, session: Session = Depends(get_session)):
    return session.exec(select(Post).where(Post.thread_id == thread_id)).all()