from fastapi import APIRouter, FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import calendar
import json
import os


EVENTS_FILE = "events.json"

class EventSchema(BaseModel):
    title: str
    start: datetime 
    end: datetime  
    followup_reminders: Optional[List[datetime.datetime]] = [] 
    interval_type: Optional[str] = "months"
    interval_value: Optional[int] = 3 
    notes: Optional[str] = None
    
def add_followup_reminder(self, reminder_date: datetime.datetime):
    reminders = []
    current_date = self.start 

    while current_date < self.end:
        if self.interval_type == "days":
            next_reminder = current_date + timedelta(days=self.interval_value)
        if self.interval_type == "weeks":
            next_reminder = current_date + timedelta(weeks=self.interval_value)
        if self.interval_type == "months":
            next_reminder = current_date + timedelta(days=self.interval_value)
            month = current_date.month + self.interval_value
            year = current_date.year + (month - 1) // 12
            month = month % 12 or 12
            day = min(current_date.day, calendar.monthrange(year, month)[1])
            next_reminder = datetime(year, month, day)
        else:
            raise ValueError("Invalid interval_type. Must be 'days', 'weeks', or 'months'.")
            
        reminders.append(next_reminder)
        current_date = next_reminder  
        
    self.followup_reminders = reminders
        
# Load events from JSON file
def load_events():
    with open(EVENTS_FILE, "r") as f:
        return json.load(f)

# Save events to JSON file
def save_events(events):
    with open(EVENTS_FILE, "w") as f:
        json.dump(events, f, indent=4, default=str)
        
def get_events():
    return load_events()

def create_event(event: EventSchema):
    events = load_events()
    events.append(event.dict())
    save_events(events)
    return {"message": "Event added successfully", "event": event}