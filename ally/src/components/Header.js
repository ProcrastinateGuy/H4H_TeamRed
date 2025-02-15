import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Ally</h1>
      {/* Optional top navigation links */}
      <nav className="top-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </header>
  );
};

export default Header;
