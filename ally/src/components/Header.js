import React from "react";
import "./Header.css";

const Header = ({ sidebarOpen, toggleSidebar }) => {
  // Log to ensure toggleSidebar is received
  console.log("Header rendered. sidebarOpen:", sidebarOpen);
  return (
    <header className="header">
      <h1>Ally</h1>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? null : "☰"}
      </button>
    </header>
  );
};

export default Header;
