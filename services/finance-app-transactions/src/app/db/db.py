from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
  postgres_user: str
  postgres_password: str
  postgres_host: str = "db"
  postgres_port: int = 5432
  postgres_db: str

  @property
  def database_url(self) -> str:
    return (
      f"postgresql://{self.postgres_user}:{self.postgres_password}"
      f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
    )
  
  class Config:
    env_file = ".env"

settings = Settings()

engine = create_engine(settings.database_url, echo=True)

def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
