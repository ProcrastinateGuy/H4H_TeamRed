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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Wrap the following routes with Layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/new-record"
        element={
          <Layout>
            <NewRecord />
          </Layout>
        }
      />
      <Route
        path="/timeline"
        element={
          <Layout>
            <Timeline />
          </Layout>
        }
      />
      <Route
        path="/resources"
        element={
          <Layout>
            <ResourceLocator />
          </Layout>
        }
      />
      <Route
        path="/calendar"
        element={
          <Layout>
            <MyCalendar />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
