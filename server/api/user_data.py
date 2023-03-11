from models.job import Job
from models.section import Section
from models.study import Study
from typing import List

class UserDataResponse:
    def __init__(self, jobs: List[Job], studies: List[Study], otherSections: List[Section], skills: List[str]) -> None:
        self.jobs = jobs
        self.studies = studies
        self.otherSections = otherSections
        self.skills = skills

def get_user_data_response(userData: UserDataResponse) -> dict:
    jobs = [job.toDict() for job in userData.jobs]
    studies = [study.toDict() for study in userData.studies]
    otherSections = [section.toDict() for section in userData.otherSections]
    return {
        'jobs': jobs,
        'studies': studies,
        'skills': userData.skills,
        'otherSections': otherSections
    }
