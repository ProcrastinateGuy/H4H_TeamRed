import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { decryptData } from "../cryptoUtils";
import "./Timeline.css";

function Timeline() {
  const { encryptionKey } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    async function loadRecords() {
      const decryptedRecords = await Promise.all(
        storedRecords.map(async (rec) => {
          try {
            const data = await decryptData(encryptionKey, rec);
            return data;
          } catch (error) {
            console.error("Error decrypting record:", error);
            return null;
          }
        })
      );
      setRecords(decryptedRecords.filter((r) => r !== null));
    }
    loadRecords();
  }, [encryptionKey]);

  return (
    <div className="timeline-container">
      <h2>Testing Timeline</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul className="timeline-list">
          {records.map((record, index) => (
            <li key={index}>
              <strong>Date:</strong> {record.date} | <strong>Test Type:</strong>{" "}
              {record.testType} | <strong>Result:</strong> {record.result}
              {record.notes && (
                <div className="timeline-notes">
                  <strong>Notes:</strong> {record.notes}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Timeline;
