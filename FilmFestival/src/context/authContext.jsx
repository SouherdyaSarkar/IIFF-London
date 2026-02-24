import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // Signup with Email + Password
  // ---------------------------
  const signupWithEmailAndPassword = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(result.user, { displayName: name });

    setUser({
      name: result.user.displayName || name || "User",
      email: result.user.email,
      uid: result.user.uid,
      isLoggedIn: true,
    });
  };

  // ---------------------------
  // Google Signup / Signin
  // ---------------------------
  const googleSignup = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;

    setUser({
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      isLoggedIn: true,
    });
  };

  // ---------------------------
  // Signin with Email + Password
  // ---------------------------
  const signinWithEmailAndPasswordHandler = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser({
      name: result.user.displayName,
      email: result.user.email,
      uid: result.user.uid,
      isLoggedIn: true,
    });
  };

  // ---------------------------
  // Logout
  // ---------------------------
  const logout = async () => {
    await signOut(auth);
    setUser({ isLoggedIn: false });
  };

  // ---------------------------
  // Auth state listener
  // ---------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          isLoggedIn: true,
        });
      } else {
        setUser({ isLoggedIn: false });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signupWithEmailAndPassword,
    signinWithEmailAndPassword: signinWithEmailAndPasswordHandler,
    googleSignup,
    googleSignin: googleSignup, // alias for convenience
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
