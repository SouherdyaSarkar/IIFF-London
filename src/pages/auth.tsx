import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, googleProvider } from "../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [uid, setUid] = useState("");

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);
  //       if (currentUser) {
  //         // navigate("/");
  //       }
  //     });
  //     return () => unsubscribe();
  //   }, [navigate]);

  const saveUsertoDatabaseEmailLogin = async (userUid: any) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/createAccountEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: userUid,
            email: email,
            password: password,
          }),
        },
      );
      const data = await response.json();
      console.log("User saved to database:", data);
    } catch (error) {
      console.error("Error saving user to database:", error);
    }
  };

  const saveUsertoDatabaseGoogleLogin = async (userUid: any) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/createAccountGoogle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: userUid,
            email: email,
          }),
        },
      );
      const data = await response.json();
      console.log("User saved to database:", data);
    } catch (error) {
      console.error("Error saving user to database:", error);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (email === "Admin1234@gmail.com" && password === "135790" && isLogin) {
        console.log("Admin login detected");
        const usercredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (usercredentials.user) {
          setUid(usercredentials.user.uid);
          localStorage.setItem("adminUid", usercredentials.user.uid);
          localStorage.setItem("isAdmin", "true");
          navigate("/AdminPanel");
        }
        return; // stop further execution
      }
      let userCredential: any;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const userUid = userCredential.user.uid;
        console.log("New user UID:", userUid);
        setUid(userUid);
        await saveUsertoDatabaseEmailLogin(userUid);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUid(result.user.uid);
      setEmail(result.user.email || "");
      await saveUsertoDatabaseGoogleLogin(result.user.uid);
      //   navigate("/");
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/operation-not-allowed":
        return "Email/password authentication is not enabled. Please contact support.";
      case "auth/user-not-found":
        return "No account found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground font-body relative overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0 
      bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)] 
      pointer-events-none"
      />
      <div
        className="absolute inset-0 opacity-5 
      mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"
      />

      <style>{`
        .heading-bebas {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: .02em;
        }

        .film-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 90px rgba(0,0,0,0.65);
          transition: all 0.3s ease;
        }
        .film-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 40px 130px rgba(0,0,0,0.7);
        }

        .film-input {
          background: rgba(255,255,255,0.02);
          border: 1px solidhsl(var(--primary-foreground), 0.06);
          border-radius: 10px;
          transition: all 0.18s ease;
          box-shadow: inset 0 -6px 16px rgba(0,0,0,0.6), 0 0 0 hsl(var(--primary-foreground), 0);
        }
        .film-input:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 12px hsl(var(--primary-foreground), 0.06);
          border-color: hsl(var(--primary-foreground), 0.18);
        }
        .film-input:focus {
          outline: none;
          border-color: hsl(var(--primary-foreground), 0.45);
          box-shadow: 0 18px 50px rgba(0,0,0,0.6), 0 0 30px hsl(var(--primary-foreground), 0.14);
        }

        .electric-hover:hover {
          animation: electricPulse 0.6s ease-out;
        }
        @keyframes electricPulse {
          0% { box-shadow: 0 0 0 0 hsl(var(--primary), 0.7); }
          70% { box-shadow: 0 0 0 10px hsl(var(--primary), 0); }
          100% { box-shadow: 0 0 0 0 hsl(var(--primary), 0); }
        }
      `}</style>

      <Navigation />

      <main className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="film-card rounded-2xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl heading-bebas font-black uppercase tracking-tight text-primary-foreground mb-4">
                  {isLogin ? "Sign In" : "Create Account"}
                </h1>
                <p className="text-primary-foreground/85 text-sm">
                  {isLogin
                    ? "Welcome back to CFCC Festival"
                    : "Join the CFCC Festival community"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div>
                  <label className="block text-xs font-heading uppercase tracking-wider text-primary-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-foreground/60" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="film-input pl-10 bg-transparent 
                      border-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/40 
                      focus:border-primary-foreground focus:ring-primary-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading uppercase tracking-wider text-primary-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 
                    transform -translate-y-1/2 w-4 h-4 text-primary-foreground/60"
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="film-input pl-10 pr-10 bg-transparent border-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/40 focus:border-primary-foreground focus:ring-primary-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-card 
                  text-primary font-heading font-bold py-3  
                  rounded-lg shadow-[0_8px_30px_rgba(243,227,213,0.12)] 
                  hover:shadow-[0_12px_40px_rgba(243,227,213,0.18)] transition electric-hover"
                >
                  {loading
                    ? "Processing..."
                    : isLogin
                      ? "Sign In"
                      : "Create Account"}
                </Button>
              </form>

              <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-primary-foreground/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-primary text-primary-foreground/60">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  isLogin ? handleGoogleSignin() : handleGoogleSignup();
                }}
                disabled={loading}
                variant="outline"
                className="w-full bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5 electric-hover"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-primary-foreground/70">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary-foreground hover:text-white font-semibold transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-destructive/20 border border-destructive/30 rounded-lg"
                >
                  <p className="text-destructive-foreground text-sm text-center">
                    {error}
                  </p>
                </motion.div>
              )}

              {user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-secondary/20 border border-secondary/30 rounded-lg text-center"
                >
                  <p className="text-secondary-foreground text-sm">
                    Welcome, {user.email}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
