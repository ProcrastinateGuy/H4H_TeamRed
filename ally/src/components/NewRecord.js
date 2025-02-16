import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { encryptData } from "../cryptoUtils";
import { useNavigate } from "react-router-dom";
import "./NewRecord.css";

function NewRecord() {
  const [date, setDate] = useState("");
  const [testType, setTestType] = useState("");
  const [result, setResult] = useState("");
  const [notes, setNotes] = useState("");
  const { encryptionKey } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = { date, testType, result, notes };
    const encryptedRecord = await encryptData(encryptionKey, record);
    // For demo: save encrypted record in localStorage
    const records = JSON.parse(localStorage.getItem("records") || "[]");
    records.push(encryptedRecord);
    localStorage.setItem("records", JSON.stringify(records));
    window.dispatchEvent(new Event("recordsUpdated"));
    navigate("/timeline");
  };

  return (
    <div className="new-record-container">
      <h2>New Test Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date of Test:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Test Type:</label>
          <input
            type="text"
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Result:</label>
          <select
            value={result}
            onChange={(e) => setResult(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="negative">Negative</option>
            <option value="positive">Positive</option>
          </select>
        </div>
        <div>
          <label>Notes:</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button type="submit">Save Record</button>
      </form>
    </div>
  );
}

export default NewRecord;
