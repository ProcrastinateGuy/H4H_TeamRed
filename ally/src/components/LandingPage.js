import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to Ally</h1>
      <p>Your discreet partner in managing sexual health.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      &nbsp;
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

export default LandingPage;
