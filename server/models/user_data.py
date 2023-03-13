from models.section import UserSection
from models.study import UserStudy
from models.job import UserJob
from pydantic import BaseModel
from typing import List

class UserData(BaseModel):
    jobs: List[UserJob]
    studies: List[UserStudy]
    otherSections: List[UserSection]
    skills: List[str]
    
    class Config:
        arbitrary_types_allowed = True

def convert_user_data_to_dict(userData: UserData) -> dict:
    jobs = [job.dict() for job in userData.jobs]
    studies = [study.dict() for study in userData.studies]
    otherSections = [section.dict() for section in userData.otherSections]
    return {
        'jobs': jobs,
        'studies': studies,
        'otherSections': otherSections,
        'skills': userData.skills,

    }
