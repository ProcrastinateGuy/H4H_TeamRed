import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Basic user info
  const [encryptionKey, setEncryptionKey] = useState(null); // Crypto key from user password

  const login = (userData, key) => {
    setUser(userData);
    setEncryptionKey(key);
  };

  const logout = () => {
    setUser(null);
    setEncryptionKey(null);
  };

  return (
    <AuthContext.Provider value={{ user, encryptionKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
