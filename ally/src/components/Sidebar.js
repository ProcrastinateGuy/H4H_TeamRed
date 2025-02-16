import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Sidebar.css";

const Sidebar = ({ open, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleSidebar();
    navigate("/"); // Redirect to home (or login) page after logout
  };

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
            <Link to="/vault" onClick={toggleSidebar}>
              Document Vault
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>
              Settings
            </Link>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
