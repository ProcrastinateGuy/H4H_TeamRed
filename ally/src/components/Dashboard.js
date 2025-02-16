import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import MyCalendar from "./MyCalendar";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [latestTest, setLatestTest] = useState(null);

  // Retrieve stored test records from localStorage when the component mounts.
  useEffect(() => {
    // Assumes records are stored in localStorage as a JSON array of objects,
    // e.g., [{ date: "2025-01-15", result: "Negative" }, ...]
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    if (storedRecords.length > 0) {
      // Get the latest test record (assuming they're stored in order)
      setLatestTest(storedRecords[storedRecords.length - 1]);
    }
  }, []);

  // Placeholder values for the appointment and medication sections.
  // You can later update these to load dynamic data similarly.
  const nextAppointment = {
    date: "No upcoming appointment",
    type: "",
  };

  const currentMedication = "No current medication";

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome, {user ? user.email : "Guest"}!</p>
      </header>

      <section className="summary-section">
        <div className="summary-card">
          <h2>Latest Test</h2>
          {latestTest ? (
            <>
              <p>{latestTest.date}</p>
              <p>{latestTest.result}</p>
            </>
          ) : (
            <p>No test records available.</p>
          )}
        </div>
        <div className="summary-card">
          <h2>Next Appointment</h2>
          <p>{nextAppointment.date}</p>
          {nextAppointment.type && <p>{nextAppointment.type}</p>}
        </div>
        <div className="summary-card">
          <h2>Medication</h2>
          <p>{currentMedication}</p>
        </div>
      </section>

      <section className="calendar-section">
        <div className="calendar-wrapper">
          <MyCalendar />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
