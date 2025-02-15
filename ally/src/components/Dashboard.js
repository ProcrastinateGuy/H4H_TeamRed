// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import MyCalendar from "./MyCalendar";

function Dashboard() {
  const { user } = useAuth();
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user ? user.email : "Guest"}!</p>
      <nav style={{ marginBottom: "2rem" }}>
        <Link to="/new-record">
          <button style={{ marginRight: "1rem" }}>New Test Record</button>
        </Link>
        <Link to="/timeline">
          <button style={{ marginRight: "1rem" }}>View Timeline</button>
        </Link>
        <Link to="/resources">
          <button style={{ marginRight: "1rem" }}>Resource Locator</button>
        </Link>
        <Link to="/settings">
          <button style={{ marginRight: "1rem" }}>Settings</button>
        </Link>
        {/* Optional: Calendar link if you also want a dedicated calendar route */}
        <Link to="/calendar">
          <button>Calendar</button>
        </Link>
      </nav>
      <div>
        <MyCalendar />
      </div>
    </div>
  );
}

export default Dashboard;
