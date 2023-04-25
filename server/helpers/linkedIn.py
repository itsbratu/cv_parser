import os
import typing

from helpers.user_data import get_user_relevant_information
from models.user_data import GenericUserFormData
from models.company import Company
from models.optional import optional_str
from models.job import Job
from linkedin_api import Linkedin

linkedIn = Linkedin(os.environ["LINKEDIN_EMAIL"], os.environ["LINKEDIN_PASSWORD"])

LINKEDIN_SUGGESTIONS_NUMBER = 10


def get_company_id(job: dict[str, any]) -> str:
    if "company" not in job["companyDetails"]:
        return ""
    company_extended_id: optional_str = job["companyDetails"]["company"]
    return company_extended_id.split(":")[-1]


def get_company_by_id(id: str) -> Company:
    company_extended: dict[str, any] = linkedIn.get_company(id)
    return (
        Company(
            name=company_extended["name"] if "name" in company_extended else "",
            description=company_extended["description"]
            if "description" in company_extended
            else "",
            tagLine=company_extended["tagline"]
            if "tagline" in company_extended
            else "",
            companyUrl=company_extended["companyPageUrl"]
            if "companyPageUrl" in company_extended
            else "",
            headquarter=company_extended["headquarter"]
            if "headquarter" in company_extended
            else None,
            phoneNumber=company_extended["phone"]["number"]
            if (
                ("phone" in company_extended)
                and ("number" in company_extended["phone"])
            )
            else "",
            specialities=company_extended["specialities"],
        )
        if "specialities" in company_extended
        else []
    )


def get_job_lite(job: dict[str, any]) -> Job:
    return Job(
        position=job["title"],
        company=get_company_by_id(get_company_id(job)),
        applyUrl=job["applyMethod"]["companyApplyUrl"]
        if (("applyMethod" in job) and ("companyApplyUrl" in job["applyMethod"]))
        else "",
    )


def get_jobs_suggestion(data: GenericUserFormData):
    user_info = get_user_relevant_information(data)
    jobs: typing.List[Job] = []
    for information in user_info:
        if len(jobs) > LINKEDIN_SUGGESTIONS_NUMBER:
            break
        suggested_jobs = linkedIn.search_jobs(keywords=[information], limit=3)
        for job in suggested_jobs:
            if get_company_id(job) == "":
                continue
            else:
                jobs.append(get_job_lite(job))
    return jobs
