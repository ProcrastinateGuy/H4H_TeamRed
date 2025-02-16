import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ open }) => {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/new-record">New Test Record</Link>
          </li>
          <li>
            <Link to="/timeline">Timeline</Link>
          </li>
          <li>
            <Link to="/resources">Resource Locator</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
