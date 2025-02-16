import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import "./DocumentVault.css";

function DocumentVault() {
  const { encryptionKey } = useAuth(); // encryption key provided upon login
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  // Load stored documents on mount
  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem("documents") || "[]");
    setDocuments(storedDocs);
  }, []);

  // When user selects a file
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Upload and encrypt the selected file
  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus("Please select a file.");
      return;
    }
    if (!encryptionKey) {
      setStatus("Encryption key not available. Please log in again.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileBuffer = event.target.result;
      try {
        // Generate a random IV for AES-GCM
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encryptedBuffer = await window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv },
          encryptionKey,
          fileBuffer
        );
        // Convert encrypted data to an array for storage
        const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
        // Create a document object with metadata
        const doc = {
          id: Date.now(),
          name: selectedFile.name,
          type: selectedFile.type,
          iv: Array.from(iv),
          data: encryptedArray,
        };
        const updatedDocs = [...documents, doc];
        localStorage.setItem("documents", JSON.stringify(updatedDocs));
        setDocuments(updatedDocs);
        setStatus("File uploaded and encrypted successfully.");
      } catch (error) {
        console.error(error);
        setStatus("Error encrypting file.");
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // Download and decrypt a document
  const handleDownload = async (doc) => {
    if (!encryptionKey) {
      setStatus("Encryption key not available. Please log in again.");
      return;
    }
    try {
      const iv = new Uint8Array(doc.iv);
      const encryptedData = new Uint8Array(doc.data).buffer;
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        encryptionKey,
        encryptedData
      );
      // Create a Blob from the decrypted data and trigger a download
      const blob = new Blob([decryptedBuffer], { type: doc.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.name;
      a.click();
      URL.revokeObjectURL(url);
      setStatus("File decrypted and downloaded.");
    } catch (error) {
      console.error(error);
      setStatus("Error decrypting file.");
    }
  };

  return (
    <div className="document-vault-container">
      <h2>Secure Document Storage</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload & Encrypt</button>
      </div>
      {status && <p>{status}</p>}
      <h3>Your Documents</h3>
      {documents.length === 0 ? (
        <p>No documents stored.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <span>{doc.name}</span>
              <button onClick={() => handleDownload(doc)}>
                Download Decrypted
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentVault;
