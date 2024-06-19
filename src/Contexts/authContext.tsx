import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  auth: any;
  user: any;
  error: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const initialValue: IAuthContext = {
  auth: null,
  user: null,
  error: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(initialValue);

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const _auth = getAuth();
    setAuth(_auth);

    onAuthStateChanged(_auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((_error) => {
        if (_error) {const errorCode = _error.code;
        const errorMessage = _error.message;
        console.log("errorCode", errorCode, "errorMessage", errorMessage);
        setError(errorMessage);} 
      });
  };

  const logout = async () => {
    await signOut(auth);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ auth, user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };
