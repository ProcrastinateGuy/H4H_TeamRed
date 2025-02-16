import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import MyCalendar from "./MyCalendar";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [latestTest, setLatestTest] = useState(null);

  const loadLatestTest = () => {
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    console.log("Stored Records:", storedRecords); // Log the stored records
    if (storedRecords.length > 0) {
      setLatestTest(storedRecords[storedRecords.length - 1]);
    } else {
      setLatestTest(null);
    }
  };
  useEffect(() => {
    loadLatestTest();

    // Add event listener for changes to localStorage
    const handleStorageChange = (event) => {
      if (event.key === "records") {
        console.log("Storage change detected for 'records' key"); // Log storage change event
        loadLatestTest();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    console.log("Latest Test:", latestTest); // Log the latest test state
  }, [latestTest]);

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
