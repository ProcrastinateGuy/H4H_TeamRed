import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Try to load persisted user info from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // For encryptionKey: Note that CryptoKey objects are not directly serializable.
  // In a real app, you might re-derive the key on each login. For now, we'll keep it in memory only.
  const [encryptionKey, setEncryptionKey] = useState(null);

  const login = (userData, key) => {
    setUser(userData);
    setEncryptionKey(key);
    // Persist user data (do not persist encryptionKey for security reasons)
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setEncryptionKey(null);
    localStorage.removeItem("user");
  };

  // Optional: If you want to listen for storage changes across tabs:
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
