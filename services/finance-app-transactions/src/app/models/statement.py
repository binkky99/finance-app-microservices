from datetime import date
from decimal import Decimal

from sqlmodel import Field, SQLModel

class StatementEntryBase(SQLModel):
   bank: str
   amount: Decimal
   description: str = Field(index=True)
   date_posted: date

class StatementEntry(StatementEntryBase, table=True):
  id: int | None = Field(default=None, primary_key=True)

class StatementEntryPublic(StatementEntryBase):
   id: int

class StatementEntryCreate(StatementEntryBase):
   pass

class StatementEntryUpdate(StatementEntryBase):
   bank: str | None = None
   amount: Decimal | None = None
   description: str | None = None
   date_posted: date | None = None