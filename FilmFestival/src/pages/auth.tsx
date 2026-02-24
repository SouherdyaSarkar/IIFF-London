import React, { useState } from "react";
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
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] text-black font-body">
      <Navigation />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="vintage-auth-card rounded-xl p-8">

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black uppercase text-[#990000] tracking-widest mb-2">
                  {isLogin ? "Sign In" : "Create Account"}
                </h1>
                <p className="text-[#64748B] text-sm">
                  {isLogin
                    ? "Welcome back to CFCC Festival"
                    : "Join the CFCC Festival community"}
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleAuth} className="space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="vintage-label">Email Address</label>
                  <div className="relative">
                    <Mail className="icon-left" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="vintage-input"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="vintage-label">Password</label>
                  <div className="relative">
                    <Lock className="icon-left"/>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="vintage-input"
                    />
                    <button
                      type="button"
                      onClick={()=>setShowPassword(!showPassword)}
                      className="icon-right"
                    >
                      {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </div>

                {/* SUBMIT */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#990000] text-white font-bold"
                >
                  {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                </Button>

              </form>

              {/* DIVIDER */}
              <div className="divider">
                <span>Or continue with</span>
              </div>

              {/* GOOGLE */}
              <Button
                onClick={handleGoogle}
                variant="outline"
                className="w-full border-[#990000] text-[#990000] hover:bg-[#990000]/5"
              >
                Continue with Google
              </Button>

              {/* SWITCH MODE */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#475569]">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={()=>setIsLogin(!isLogin)}
                    className="text-[#990000] font-semibold"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              {error && (
                <p className="text-red-600 text-center mt-4 text-sm">{error}</p>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* 🎬 VINTAGE STYLE */}
      <style>{`
        .vintage-auth-card {
          background:#fff;
          border:2px solid #990000;
          box-shadow:
            inset 0 0 20px rgba(0,0,0,0.05),
            0 20px 50px rgba(0,0,0,0.15);
          position:relative;
        }

        .vintage-auth-card::after{
          content:'';
          position:absolute;
          inset:0;
          background:repeating-linear-gradient(
            45deg,
            rgba(0,0,0,0.015),
            rgba(0,0,0,0.015) 2px,
            transparent 2px,
            transparent 6px
          );
          pointer-events:none;
        }

        .vintage-label{
          color:#990000;
          font-weight:700;
          text-transform:uppercase;
          font-size:12px;
          margin-bottom:6px;
          display:block;
        }

        .vintage-input{
          background:#F3F6F9;
          border:1px solid rgba(0,0,0,0.15);
          border-radius:6px;
          padding:0.65rem 2.4rem;   /* FIXED spacing for icons */
          color:#1E293B;
        }

        .icon-left{
          position:absolute;
          left:12px;
          top:50%;
          transform:translateY(-50%);
          width:16px;
          height:16px;
          color:#64748B;
          pointer-events:none;
        }

        .icon-right{
          position:absolute;
          right:12px;
          top:50%;
          transform:translateY(-50%);
          color:#64748B;
        }

        .divider{
          margin:20px 0;
          text-align:center;
          color:#64748B;
          font-size:12px;
          position:relative;
        }

        .divider::before{
          content:'';
          position:absolute;
          left:0;
          right:0;
          top:50%;
          height:1px;
          background:#e2e8f0;
          z-index:-1;
        }

        .divider span{
          background:#fff;
          padding:0 10px;
        }
      `}</style>
    </div>
  );
};

export default Auth;