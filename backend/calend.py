from fastapi import APIRouter, FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import calendar
import pytz
import json
import os


EVENTS_FILE = "events.json"

from datetime import datetime, timedelta
import calendar
import pytz

class EventSchema(BaseModel):
    title: str
    start: datetime 
    end: datetime  
    followup_reminders: Optional[List[datetime]] = [] 
    interval_type: Optional[str] = "months"
    interval_value: Optional[int] = 3 
    notes: Optional[str] = None
    
    def add_followup_reminder(self, reminder_date: datetime):
        reminders = []
        timezone = pytz.UTC  # Using UTC timezone to avoid issues

        # Convert start and end datetime to offset-aware if they are naive
        if self.start.tzinfo is None:
            self.start = timezone.localize(self.start)
        if self.end.tzinfo is None:
            self.end = timezone.localize(self.end)

        current_date = self.start 

        while current_date < self.end:
            if self.interval_type == "days":
                next_reminder = current_date + timedelta(days=self.interval_value)
            elif self.interval_type == "weeks":
                next_reminder = current_date + timedelta(weeks=self.interval_value)
            elif self.interval_type == "months":
                month = current_date.month + self.interval_value
                year = current_date.year + (month - 1) // 12
                month = month % 12 or 12
                day = min(current_date.day, calendar.monthrange(year, month)[1])
                next_reminder = datetime(year, month, day)
                next_reminder = timezone.localize(next_reminder)
            else:
                raise ValueError("Invalid interval_type. Must be 'days', 'weeks', or 'months'.")
                
            reminders.append(next_reminder)
            current_date = next_reminder
            
        self.followup_reminders = reminders
from datetime import datetime, timedelta
import calendar
import pytz

class EventSchema(BaseModel):
    title: str
    start: datetime 
    end: datetime  
    followup_reminders: Optional[List[datetime]] = [] 
    interval_type: Optional[str] = "months"
    interval_value: Optional[int] = 3 
    notes: Optional[str] = None
    
    def add_followup_reminder(self, reminder_date: datetime):
        reminders = []
        timezone = pytz.UTC  # Using UTC timezone to avoid issues

        # Convert start and end datetime to offset-aware if they are naive
        if self.start.tzinfo is None:
            self.start = timezone.localize(self.start)
        if self.end.tzinfo is None:
            self.end = timezone.localize(self.end)

        current_date = self.start 

        while current_date < self.end:
            if self.interval_type == "days":
                next_reminder = current_date + timedelta(days=self.interval_value)
            elif self.interval_type == "weeks":
                next_reminder = current_date + timedelta(weeks=self.interval_value)
            elif self.interval_type == "months":
                month = current_date.month + self.interval_value
                year = current_date.year + (month - 1) // 12
                month = month % 12 or 12
                day = min(current_date.day, calendar.monthrange(year, month)[1])
                next_reminder = datetime(year, month, day)
                next_reminder = timezone.localize(next_reminder)
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