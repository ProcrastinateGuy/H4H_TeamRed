from fastapi import APIRouter, FastAPI, File, UploadFile
from config import UPLOAD_DIRECTORY  #  config for everyone's files
import shutil
import os

app = FastAPI()

UPLOAD_DIRECTORY = "uploads"

router = APIRouter()
@router.post("/upload/")
#Handles file uploads and saves the file.
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"filename": file.filename, "message": "File uploaded successfully!", "path": file_path}
