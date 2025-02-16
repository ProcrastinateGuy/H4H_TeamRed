import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import MyCalendar from "./MyCalendar";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [latestTest, setLatestTest] = useState(null);

  // Load test records from localStorage when the component mounts
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    if (storedRecords.length > 0) {
      setLatestTest(storedRecords[storedRecords.length - 1]);
    }
  }, []);

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
        <h2>Calendar</h2>
        <div className="calendar-wrapper">
          <MyCalendar />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
