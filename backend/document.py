from fastapi import APIRouter, FastAPI, File, UploadFile
from config import UPLOAD_DIRECTORY  #  config for everyone's files
import shutil
import os

UPLOAD_DIRECTORY = "uploads"

async def api_entry():
    return {"Welcome": "Ally API"}

async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"filename": file.filename, "message": "File uploaded successfully!", "path": file_path}
