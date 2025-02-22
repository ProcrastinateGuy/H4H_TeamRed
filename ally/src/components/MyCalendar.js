import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from 'axios';
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css"; // Optional custom styles

const apiUrl = "http://localhost:4000";

function MyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [followupReminders, setFollowupReminders] = useState([]);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // When a day is clicked, set that as the selected date
  const onDateClick = (date) => {
    setSelectedDate(date);
  };

  // Add new event to the selected date
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const dateKey = selectedDate.toISOString().split('T')[0];
    const startDateTime = new Date(`${dateKey}T${startTime}:00Z`).toISOString();
    const endDateTime = new Date(`${dateKey}T${endTime}:00Z`).toISOString();
    
    const updatedEvents = { ...events };

    if (!updatedEvents[dateKey]) {
      updatedEvents[dateKey] = [];
    }
    //reset
    updatedEvents[dateKey].push({
      title: newEventTitle,
      start: startDateTime,
      end: endDateTime,
      followup_reminders: followupReminders
    });
    setEvents(updatedEvents);
    setNewEvent("");
    setNewEventTitle("");
    setFollowupReminders([]);
    setStartTime("12:00");
    setEndTime("13:00");

    try {
      const requestBody = {
        title: newEventTitle,
        start: startDateTime,
        end: endDateTime,
        followup_reminders: followupReminders
      };

      console.log("Request Body:", requestBody);

      const response = await fetch(apiUrl + "/create_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error:", errorText);
        throw new Error("Failed to add event");
      } else {
        alert("Event added");
      }

      const responseData = await response.json();
      console.log("Event created:", responseData);
      fetchEvents(); // Refresh the events list after adding a new event
    } catch (Error) {
      console.error("Error adding event:", Error);
      alert("There was an error adding the event. Please try again.");
    }
  };

  // Get all events and display them
  const getAllEvents = () => {
    if (!Array.isArray(events)) {
      // If events is not an array, return null or some placeholder
      return null;
    }
    return events.map((event, index) => (
      <li key={index}>
        <strong>{event.title}</strong>
        <br />
        Start: {new Date(event.start).toLocaleString()}
        <br />
        End: {new Date(event.end).toLocaleString()}
        <br />
        Follow-up Reminders: {event.followup_reminders.join(", ")}
      </li>
    ));

  };

  return (
    <div className="container">
      <div className="events-list">
        <h3>All Events</h3>
        <ul>
          {getAllEvents()}
        </ul>
      </div>
      <div className="calendar-container">
        <h2>My Calendar</h2>
        <div className="calendar-wrapper">
          <Calendar
            onChange={setCurrentDate}
            value={currentDate}
            onClickDay={onDateClick}
          />
        </div>
        <div className="event-section">
          <h3>Events on {selectedDate.toDateString()}</h3>
          <ul>
            {events[selectedDate.toISOString().split('T')[0]] ? (
              events[selectedDate.toISOString().split('T')[0]].map((event, index) => (
                <li key={index}>
                  <strong>{event.title}</strong><br />
                  Start: {new Date(event.start).toLocaleString()}<br />
                  End: {new Date(event.end).toLocaleString()}<br />
                  Follow-up Reminders: {event.followup_reminders.join(', ')}
                </li>
              ))
            ) : (
              <li>No events for this day.</li>
            )}
          </ul>
          <form onSubmit={handleAddEvent} className="event-form">
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Enter event title..."
              required
            />
            <input
              type="text"
              value={followupReminders}
              onChange={(e) => setFollowupReminders(e.target.value.split(","))}
              placeholder="Enter follow-up reminders (comma separated)"
            />
            <div>
              <label>Start Time:</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <button type="submit">Add Event</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
