import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import NewRecord from "./components/NewRecord";
import Timeline from "./components/Timeline";
import ResourceLocator from "./components/ResourceLocator";
import Settings from "./components/Settings";
import MyCalendar from "./components/MyCalendar";
import Layout from "./components/Layout";
import DocumentVault from "./components/DocumentVault";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* All routes that require the Layout wrapper */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-record" element={<NewRecord />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/resources" element={<ResourceLocator />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/vault" element={<DocumentVault />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
