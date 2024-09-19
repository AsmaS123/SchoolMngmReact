import React, { createContext, useState, useEffect } from "react";

export default AuthContexts = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false); 
  }, []);

  return (
    <AuthContexts.Provider value={{ token, setToken, loading }}>
      {children}
    </AuthContexts.Provider>
  );
};