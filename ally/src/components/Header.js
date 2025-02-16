import React from "react";
import "./Header.css";

const Header = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <header className="header">
      <h1>Ally</h1>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? "→" : "☰"}
      </button>
    </header>
  );
};

export default Header;
