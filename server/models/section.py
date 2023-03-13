from  pydantic import BaseModel

class UserSection(BaseModel):
    title: str
    content: str
    