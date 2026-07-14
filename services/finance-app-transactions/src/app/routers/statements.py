from typing import Annotated
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlmodel import select

from ..db.db import SessionDep
from ..auth.auth import auth0, bearer_scheme
from ..models.statement import StatementEntry, StatementEntryPublic, StatementEntryCreate, StatementEntryUpdate

router = APIRouter(
    prefix="/statements",
    tags=["statements"],
    dependencies=[Depends(bearer_scheme)]
)

@router.post(
    "/statements/",
    response_model=StatementEntryPublic,
    dependencies=[Depends(auth0.require_auth(scopes="write:transactions"))])
async def create_statement(statement: StatementEntryCreate, session: SessionDep):
  db_statement = StatementEntry.model_validate(statement)
  session.add(db_statement)
  session.commit()
  session.refresh(db_statement)
  return db_statement


@router.get(
  "/statements/", 
  response_model=list[StatementEntryPublic],
  dependencies=[Depends(auth0.require_auth(scopes="read:transactions"))])
async def get_statements(
   session: SessionDep, 
   offset: int = 0, 
   limit: Annotated[int, Query(le=100)] = 100):
   statements = session.exec(select(StatementEntry).offset(offset).limit(limit)).all()
   return statements


@router.get(
  "/statements/{statement_id}", 
  response_model=StatementEntryPublic,
  dependencies=[Depends(auth0.require_auth(scopes="read:transactions"))])
async def get_statement(statement_id: int, session: SessionDep):
    transaction = session.get(StatementEntry, statement_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


@router.patch(
  "/statements/{statement_id}",
   response_model=StatementEntryPublic,
   dependencies=[Depends(auth0.require_auth(scopes="write:transactions"))])
async def update_statement(statement_id: int, statement: StatementEntryUpdate, session: SessionDep):
    db_statement = session.get(StatementEntry, statement_id)
    if not db_statement:
        raise HTTPException(status_code=404, detail="Transaction not found")
    statement_data = statement.model_dump(exclude_unset=True)
    db_statement.sqlmodel_update(statement_data)
    session.add(db_statement)
    session.commit()
    session.refresh(db_statement)
    return db_statement


@router.delete(
  "/statements/{statement_id}",
  dependencies=[Depends(auth0.require_auth(scopes="write:transactions"))])
async def delete_transaction(statement_id: int, session: SessionDep):
    statement = session.get(StatementEntry, statement_id)
    if not statement:
        raise HTTPException(status_code=404, detail="Transaction not found")
    session.delete(statement)
    session.commit()
    return {"ok": True}