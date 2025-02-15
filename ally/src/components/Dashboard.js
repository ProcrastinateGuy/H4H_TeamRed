import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Dashboard() {
  const { user } = useAuth();
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user ? user.email : "Guest"}!</p>
      <nav>
        <Link to="/new-record">
          <button>New Test Record</button>
        </Link>
        &nbsp;
        <Link to="/timeline">
          <button>View Timeline</button>
        </Link>
        &nbsp;
        <Link to="/resources">
          <button>Resource Locator</button>
        </Link>
        &nbsp;
        <Link to="/settings">
          <button>Settings</button>
        </Link>
      </nav>
    </div>
  );
}

export default Dashboard;
