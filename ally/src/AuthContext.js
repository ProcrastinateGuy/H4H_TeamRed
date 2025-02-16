import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [encryptionKey, setEncryptionKey] = useState(null);

  const generateKey = async () => {
    return await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
    );
  };

  const importKey = async (rawKey) => {
    return await window.crypto.subtle.importKey(
      "raw",
      rawKey,
      {
        name: "AES-GCM"
      },
      true,
      ["encrypt", "decrypt"]
    );
  };

  useEffect(() => {
    const fetchKey = async () => {
      const storedKey = localStorage.getItem("encryptionKey");
      if (storedKey) {
        const rawKey = new Uint8Array(JSON.parse(storedKey));
        const importedKey = await importKey(rawKey);
        setEncryptionKey(importedKey);
      } else {
        const newKey = await generateKey();
        const exportedKey = await window.crypto.subtle.exportKey("raw", newKey);
        localStorage.setItem("encryptionKey", JSON.stringify(Array.from(new Uint8Array(exportedKey))));
        setEncryptionKey(newKey);
      }
    };

    fetchKey();
  }, []);

  const login = (userData, key) => {
    setUser(userData);
    setEncryptionKey(key);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setEncryptionKey(null);
    localStorage.removeItem("user");
    localStorage.removeItem("encryptionKey");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, encryptionKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
