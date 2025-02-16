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
    eFile_path = os.path.join(UPLOAD_DIRECTORY, "Encrypted.txt")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        file.file.close() #close the clone file

    tmp = Encryption(file_path)
    f = open("Encrypted.txt", "w")
    f.write(tmp.encrypt()) # will return an encrypted string of the cloned file
    f.close()


    return {"filename": file.filename, "message": "File uploaded successfully!", "path": file_path}

class Encryption:
    file_path = "Path attribute"

    def __init__(self, file_path):
        self.file_path = file_path

    def encrypt(self):
        sha256 = hashlib.sha256()
        with open(self.file_path, "r") as file:
            content = file.read()

        sha256.update(content.encode())
        return sha256.hexdigest()

    def decrypt(self):
        try:
            with open(self.file_path, "r") as file:
                content = file.read()
                return content
        except FileNotFoundError:
            print(f"Error: File '{file}' not found.")
            return None