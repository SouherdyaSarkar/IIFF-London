"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "../utils/firebaseConfig";

function RegisterPage() {
  function Register() {
    const navigate = useNavigate();

    const [projectTitle, setProjectTitle] = useState("");
    const [name, setName] = useState("");
    const [durationHours, setDurationHours] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [durationSeconds, setDurationSeconds] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [trailerLink, setTrailerLink] = useState("");
    const [fullFilmLink, setFullFilmLink] = useState("");
    const [castDetails, setCastDetails] = useState("");
    const [producerDetails, setProducerDetails] = useState("");
    const [directorByte, setDirectorByte] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (!auth.currentUser) {
        toast.error("Login required");
        navigate("/auth");
        return;
      }

      setSubmitting(true);

      await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: auth.currentUser?.uid,
          name,
          projectTitle,
          duration: {
            hours: durationHours,
            minutes: durationMinutes,
            seconds: durationSeconds,
          },
          productionDate,
          trailerLink,
          fullFilmLink,
          castDetails,
          producerDetails,
          directorByte,
        }),
      });

      toast.success("Registration successful!");
      navigate("/");
      setSubmitting(false);
    }

    return (
      <div className="container mx-auto px-4">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-4xl md:text-5xl font-heading font-black uppercase text-[#990000] tracking-widest mb-4"
        >
          Official Film Submission
        </motion.h1>

        <p className="text-center text-[#475569] mb-10">
          Submit your work to the CFCC Festival Kolkata Chapter 2026
        </p>

        <div className="flex justify-center">
          <div className="vintage-white-card max-w-3xl w-full p-10 rounded-xl">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="vintage-label">Name of Filmmaker</label>
                <Input value={name} onChange={(e)=>setName(e.target.value)} className="filmic-input"/>
                <p className="helper-text">Enter the primary filmmaker name.</p>
              </div>

              <div>
                <label className="vintage-label">Title of Project</label>
                <Input value={projectTitle} onChange={(e)=>setProjectTitle(e.target.value)} className="filmic-input"/>
                <p className="helper-text">Official title of your film.</p>
              </div>

              <div>
                <label className="vintage-label">Duration</label>
                <div className="flex gap-2">
                  <Input placeholder="HH" value={durationHours} onChange={(e)=>setDurationHours(e.target.value)} className="filmic-input"/>
                  <Input placeholder="MM" value={durationMinutes} onChange={(e)=>setDurationMinutes(e.target.value)} className="filmic-input"/>
                  <Input placeholder="SS" value={durationSeconds} onChange={(e)=>setDurationSeconds(e.target.value)} className="filmic-input"/>
                </div>
                <p className="helper-text">Format HH : MM : SS</p>
              </div>

              <div>
                <label className="vintage-label">Production Date</label>
                <Input type="date" value={productionDate} onChange={(e)=>setProductionDate(e.target.value)} className="filmic-input"/>
              </div>

              <div>
                <label className="vintage-label">Trailer Drive Link</label>
                <Input value={trailerLink} onChange={(e)=>setTrailerLink(e.target.value)} className="filmic-input"/>
                <p className="helper-text">Google Drive links only.</p>
              </div>

              <div>
                <label className="vintage-label">Full Film Drive Link</label>
                <Input value={fullFilmLink} onChange={(e)=>setFullFilmLink(e.target.value)} className="filmic-input"/>
                <p className="helper-text">Upload film privately and share link.</p>
              </div>

              <div>
                <label className="vintage-label">Cast Details</label>
                <Input value={castDetails} onChange={(e)=>setCastDetails(e.target.value)} className="filmic-input"/>
              </div>

              <div>
                <label className="vintage-label">Producer Details</label>
                <Input value={producerDetails} onChange={(e)=>setProducerDetails(e.target.value)} className="filmic-input"/>
              </div>

              <div>
                <label className="vintage-label">Director's Note</label>
                <Textarea value={directorByte} onChange={(e)=>setDirectorByte(e.target.value)} className="filmic-input min-h-[120px]"/>
              </div>

              <Button type="submit" disabled={submitting} className="bg-[#990000] text-white font-bold">
                {submitting ? "Submitting..." : "Register"}
              </Button>

            </form>
          </div>
        </div>

        <style>{`

        .vintage-white-card {
          background:#ffffff;
          border:2px solid #990000;
          box-shadow:
            inset 0 0 20px rgba(0,0,0,0.06),
            0 20px 50px rgba(0,0,0,0.15);
          position:relative;
        }

        .vintage-white-card::after{
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

        .vintage-label {
          color:#990000;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:.08em;
          margin-bottom:6px;
          display:block;
        }

        .helper-text {
          font-size:12px;
          color:#64748B;
          margin-top:4px;
        }

        .filmic-input {
          background:#F3F6F9;
          border-radius:6px;
          padding:.65rem .9rem;
          color:#1E293B;
          border:1px solid rgba(0,0,0,.15);
        }

        `}</style>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F6F9]">
      <Navigation />
      <main className="py-16">
        <Register />
      </main>
      <Footer />
    </div>
  );
}

export default RegisterPage;