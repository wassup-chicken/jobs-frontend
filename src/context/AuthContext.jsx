import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Clear session storage when user logs out
      if (!currentUser) {
        sessionStorage.removeItem("data");
      }
    });

    return () => unsubscribe();
  }, []); // Empty array = run once on mount

  return (
    <AuthContext.Provider value={{ user, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
