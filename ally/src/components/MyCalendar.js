// src/components/MyCalendar.js
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css"; // Optional custom styles

function MyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");

  // Load events from localStorage (if any) on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // When a day is clicked, set that as the selected date
  const onDateClick = (date) => {
    setSelectedDate(date);
  };

  // Add new event to the selected date
  const handleAddEvent = (e) => {
    e.preventDefault();
    const dateKey = selectedDate.toDateString();
    const updatedEvents = { ...events };
    if (!updatedEvents[dateKey]) {
      updatedEvents[dateKey] = [];
    }
    updatedEvents[dateKey].push(newEvent);
    setEvents(updatedEvents);
    setNewEvent("");
  };

  return (
    <div className="calendar-container">
      <h2>My Calendar</h2>
      <Calendar
        onChange={setCurrentDate}
        value={currentDate}
        onClickDay={onDateClick}
      />
      <div className="event-section">
        <h3>Events on {selectedDate.toDateString()}</h3>
        <ul>
          {events[selectedDate.toDateString()] ? (
            events[selectedDate.toDateString()].map((event, index) => (
              <li key={index}>{event}</li>
            ))
          ) : (
            <li>No events for this day.</li>
          )}
        </ul>
        <form onSubmit={handleAddEvent} className="event-form">
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Enter event details..."
            required
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default MyCalendar;
