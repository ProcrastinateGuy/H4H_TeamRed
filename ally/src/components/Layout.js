import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggle Sidebar triggered. Current state:", sidebarOpen);
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="layout">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
