from pydantic import BaseModel
    
class UserStudy(BaseModel):
    institution: str
    degree: str
    startDate: str
    endDate: str
    