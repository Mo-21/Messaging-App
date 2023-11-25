import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState();

  const login = (id) => {
    console.log("Setting userId:", id);
    setUserId(id);
    console.log("userId:", userId);
  };

  return (
    <AuthContext.Provider value={{ userId, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
