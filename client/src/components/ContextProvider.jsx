import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useSession = () => useContext(AuthContext);

const ContextProvider = ({ children }) => {
  const [session, setSession] = useState({
    nonce: undefined,
    loading: false,
    error: "",
  });

  return (
    <AuthContext.Provider value={{ session, setSession}}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
