import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Settings;
