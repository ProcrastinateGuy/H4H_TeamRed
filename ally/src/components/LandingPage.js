import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./LandingPage.css";
import background from "../images/background.jpg";

function LandingPage() {
  const { user } = useAuth();

  // If a user is logged in, redirect to the dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="landing-container">
      <div
        className="hero-section"
        style={{
          background: `url(${background}) no-repeat center center/cover`,
        }}
      >
        <div className="hero-overlay">
          <h1>Welcome to Ally</h1>
          <p>Your Health, Your Privacy, Your Control.</p>
          <div className="cta-buttons">
            <Link to="/login">
              <button className="primary-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="secondary-btn">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Ally?</h2>
        <div className="features">
          <div className="feature">
            <h3>Confidential & Secure</h3>
            <p>Your data is encrypted and kept private at all times.</p>
          </div>
          <div className="feature">
            <h3>Easy Tracking</h3>
            <p>
              Manage testing dates, appointments, and medication reminders
              seamlessly.
            </p>
          </div>
          <div className="feature">
            <h3>Trusted Resources</h3>
            <p>
              Access verified local clinics, telehealth services, and expert
              advice.
            </p>
          </div>
        </div>
      </div>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Ally. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
