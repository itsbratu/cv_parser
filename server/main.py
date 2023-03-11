from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from constants import *
from api.user_data import get_user_data_response
from mock_data import parsedUserData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(USER_UPLOADS_BASE_URL + '/upload')
def upload_file():
    return {"Hello": "World"}


@app.get(USER_UPLOADS_BASE_URL + '/parsed-user-data')
def get_parsed_user_data():
    return get_user_data_response(parsedUserData)
