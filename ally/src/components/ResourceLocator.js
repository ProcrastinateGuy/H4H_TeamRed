import React from "react";
import "./ResourceLocator.css";

function ResourceLocator() {
  return (
    <div className="resource-locator-container">
      <h2>Resource Locator</h2>
      <p>This feature helps you find local clinics and testing centers.</p>
      <p>(Demo: static information is provided.)</p>
      <ul>
        <li>Clinic A: 123 Main Street, Santa Clara</li>
        <li>Clinic B: 456 Elm Street, Santa Clara</li>
        <li>
          Telehealth:{" "}
          <a
            href="https://telehealth.example.com"
            target="_blank"
            rel="noreferrer"
          >
            Visit Site
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ResourceLocator;
