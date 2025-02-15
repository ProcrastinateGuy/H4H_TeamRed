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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-record" element={<NewRecord />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/resources" element={<ResourceLocator />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
