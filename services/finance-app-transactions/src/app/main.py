
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

from .db import db
from .routers import statements

@asynccontextmanager
async def lifespan(app: FastAPI):
   db.create_db_and_tables()
   yield

load_dotenv()

app = FastAPI(
   lifespan=lifespan,
   swagger_ui_parameters={"persistAuthorization": True})


origins = [
  "http://localhost:4200",
  "http://localhost:8080"
]

app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,         
   allow_methods=["*"],            
   allow_headers=["*"]
)

app.include_router(statements.router)