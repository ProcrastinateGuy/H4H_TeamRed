from fastapi import APIRouter, FastAPI, File, UploadFile
from config import UPLOAD_DIRECTORY  #  config for everyone's files
import shutil
import os
import hashlib

UPLOAD_DIRECTORY = "uploads"

async def api_entry():
    return {"Welcome": "Ally API"}

async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        file.file.close() #close the clone file

    tmp = Encryption(file_path)
    f = open("Encrypted.txt", "w")
    f.write(tmp.encrypt()) # will return a encrypted string of the cloned file
    f.close()


    return {"filename": file.filename, "message": "File uploaded successfully!", "path": file_path}

class Encryption:
    def __init__(self, file_Path):
        self.file_path = file_Path

    def encrypt(self):
        sha256 = hashlib.sha256()
        sha256.update(self.file_path.encode())
        return sha256.hexdigest()

    def decrypt(self):
        try:
            file = open(self.file_path, 'r')
            return file
        except FileNotFoundError:
            print(f"Error: File '{file}' not found.")
            return None