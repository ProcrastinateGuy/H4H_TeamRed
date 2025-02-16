import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <button className="sidebar-close" onClick={toggleSidebar}>
        ←
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/new-record" onClick={toggleSidebar}>
              New Test Record
            </Link>
          </li>
          <li>
            <Link to="/timeline" onClick={toggleSidebar}>
              Timeline
            </Link>
          </li>
          <li>
            <Link to="/resources" onClick={toggleSidebar}>
              Resource Locator
            </Link>
          </li>
          <li>
            <Link to="/calendar" onClick={toggleSidebar}>
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
