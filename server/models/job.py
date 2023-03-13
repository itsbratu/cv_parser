from pydantic import BaseModel

class UserJob(BaseModel):
    company: str
    position: str
    description: str
    startDate: str
    endDate: str
    