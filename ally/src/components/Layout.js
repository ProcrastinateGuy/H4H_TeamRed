import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggle button clicked");
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="layout">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
