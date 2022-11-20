import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase";

const AuthContext = createContext({});

export const useAuthContest = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
