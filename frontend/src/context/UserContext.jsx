import { createContext, useContext, useState } from "react";

// Create Context
const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Store ID here

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for easy access
export const useUser = () => useContext(UserContext);