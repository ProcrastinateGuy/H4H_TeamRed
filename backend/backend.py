# keep in alphabetical order to keep it clean
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
#routes
import document
from calend import EventSchema  # Import EventSchema explicitly
from backend import calend


import os
import shutil
import uvicorn

load_dotenv()

app = FastAPI()

origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Allow credentials (e.g., cookies, authorization headers)
    allow_methods=["*"],    # Specify allowed HTTP methods (or use wildcard "*")
    allow_headers=["*"],    # Specify allowed HTTP headers (or use wildcard "*")
)

@app.get("/")
async def api_entry():
    return {"Welcome": "Ally API"}

@app.post("/upload/")
async def upload(file: UploadFile = File(...)):  
    """Calls the upload_file function from document.py."""
    return await document.upload_file(file)

@app.post("/create_event/")
async def create_event(event: EventSchema):
    try:
        # Generate follow-up reminders based on the interval and start date
        calend.add_followup_reminder()

        # Return the event data with generated follow-ups
        return JSONResponse(content={
            "title": event.title,
            "start": event.start,
            "end": event.end,
            "followup_reminders": [reminder.isoformat() for reminder in event.followup_reminders],
            "notes": event.notes
        })
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


def main():
    try:
        HOST = os.getenv("HOST")
        PORT = int(os.getenv("PORT"))
    except Exception:
        print(
            "Error: Please make sure you have set the HOST and PORT environment variables correctly."
        )
        exit(2)
    uvicorn.run(
        app,
        host=HOST,
        port=PORT,
        log_level="info",
    )


if __name__ == "__main__":
    main()
