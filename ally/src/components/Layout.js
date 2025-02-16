import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggle Sidebar triggered. Current state:", sidebarOpen);
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="layout">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
