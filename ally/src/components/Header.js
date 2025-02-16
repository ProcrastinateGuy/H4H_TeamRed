import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo.svg";

const Header = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-logo-title">
        <Link to="/dashboard" className="header-home-link">
          <img src={logo} alt="Ally Logo" className="header-logo" />
          <h1>Ally</h1>
        </Link>
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? "→" : "☰"}
      </button>
    </header>
  );
};

export default Header;
