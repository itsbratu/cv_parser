import os
import pydantic

from bson import ObjectId
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from constants import *
from models.user_data import GenericUserFormData
from pymongo import MongoClient
from helpers.linkedIn import get_jobs_suggestion

MONGODB_URL = os.environ['DB_URL']
MONGODB_DATABASE_NAME = os.environ['MONGODB_DATABASE_NAME']
MONGODB_RESUMES_DATA_TABLE = os.environ['MONGODB_RESUMES_DATA_TABLE']
USER_UPLOADS_BASE_URL = '/api-useruploads'

pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str
dbClient = MongoClient(MONGODB_URL)
db = dbClient[MONGODB_DATABASE_NAME]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(USER_UPLOADS_BASE_URL + '/parse')
async def upload_file(resume: UploadFile = File(...)):
    mock_resume_data: GenericUserFormData = {
        "studies": [
            {
                "institution": "Mihai Viteazu College",
                "degree": "Highschool"
            },
            {
                "institution": "UBB CS",
                "degree": "Bachelor"
            }
        ],
        "projects": [
            {
                "title": "Polihack pill dispenser",
                "description": "Built a dispenser"
            }
        ],
        "skills": [
            {
                "name": "C++"
            },
            {
                "name": "JAVA"
            },
            {
                "name": "Data mining"
            }
        ]
    }
    uploaded_resume_data = db[MONGODB_RESUMES_DATA_TABLE].insert_one(mock_resume_data)
    return uploaded_resume_data.inserted_id

@app.get(USER_UPLOADS_BASE_URL + '/parsed-user-data/{parse_id}')
async def get_parsed_user_data(request: Request):
    parse_id =  request.path_params['parse_id']
    parsedUserData: GenericUserFormData = db[MONGODB_RESUMES_DATA_TABLE].find_one({"_id": ObjectId(parse_id)})
    del parsedUserData["_id"]
    return parsedUserData

@app.post(USER_UPLOADS_BASE_URL + '/submit-data/{parse_id}')
def submit_data(data: GenericUserFormData, request: Request):
    parse_id =  request.path_params['parse_id']
    db[MONGODB_RESUMES_DATA_TABLE].replace_one({ "_id": ObjectId(parse_id) }, data)
    return parse_id

@app.get(USER_UPLOADS_BASE_URL + '/jobs-suggestions/{upload_id}')
async def job_suggestions(request: Request):
    uploadId =  request.path_params['upload_id']
    uploadedResume: GenericUserFormData = db[MONGODB_RESUMES_DATA_TABLE].find_one({"_id": ObjectId(uploadId)})
    del uploadedResume["_id"]
    return get_jobs_suggestion(uploadedResume)
