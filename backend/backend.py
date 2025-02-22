# keep in alphabetical order to keep it clean
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from cryptography.fernet import Fernet


#routes
import document
import calend  # Import EventSchema explicitly


import os
import shutil
import uvicorn

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",  
    "http://localhost:4000",
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
def create_event(event: calend.EventSchema):
    try:
        # Log the received event
        print("Received event:", event.dict())

        # Generate follow-up reminders based on the interval and start date
        event.add_followup_reminder(event.start)

        # Convert datetime objects to ISO format
        event_data = {
            "title": event.title,
            "start": event.start.isoformat(),
            "end": event.end.isoformat(),
            "followup_reminders": [reminder.isoformat() for reminder in event.followup_reminders],
            "notes": event.notes
        }

        # Save event to the file
        events = calend.load_events()  # Load existing events from the JSON file
        events.append(event_data)  # Append the new event to the list of events
        calend.save_events(events)  # Save the updated events list back to the JSON file

        # Return the event data with generated follow-ups
        return JSONResponse(content=event_data)
    except ValueError as e:
        print("ValueError:", str(e))
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print("Internal Server Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get_events/")
def get_events():
    events = calend.load_events()
    events_by_date = {}
    for event in events:
        date_key = event['start'].split('T')[0]
        if date_key not in events_by_date:
            events_by_date[date_key] = []
        events_by_date[date_key].append(event)
    return events_by_date

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
