import pydantic
from random import randrange
from bson import ObjectId
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from constants import *
from models.user_data import UserData, convert_user_data_to_dict
from db.db import *
from pymongo import MongoClient
from models.job import UserJob
from models.study import UserStudy
from models.section import UserSection

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

@app.post(USER_UPLOADS_BASE_URL + '/upload')
async def upload_file(resume: UploadFile = File(...)):
    print(resume.filename)
    return resume.filename

@app.post(USER_UPLOADS_BASE_URL + '/submit-data')
def submit_data(data: UserData):
    uploaded_resume_data = db[MONGODB_RESUMES_TABLE].insert_one(convert_user_data_to_dict(data))
    return db[MONGODB_RESUMES_TABLE].find_one({"_id": uploaded_resume_data.inserted_id})

@app.get(USER_UPLOADS_BASE_URL + '/parsed-user-data')
async def get_parsed_user_data():
    currentResumes = [currentEntry for currentEntry in db[MONGODB_RESUMES_TABLE].find()]
    return currentResumes[0]
