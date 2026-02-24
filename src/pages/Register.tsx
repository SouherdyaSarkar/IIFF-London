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
import { sub } from "date-fns";

function RegisterPage() {
  const [submission, setsubmission] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const response = await fetch("http://localhost:5000/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.uid }),
          });
          if (response.ok) {
            const data = await response.json();
            // console.log("Fetched submission data:", data);
            setsubmission(data);
          }
        } catch (err) {
          console.error("Error fetching submissions:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  function Submitted({ submission }) {
    const navigate = useNavigate();

    return (
      <div className="flex items-center justify-center w-full">
        <div
          className="w-[80%] md:w-[70%] 
        bg-card rounded-xl 
          px-8 py-4 md:px-16 md:py-8"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-black mb-2 text-left text-primary">
            You have already submitted a film!
          </h2>

          <p className="text-lg md:text-xl font-light font-heading mb-4 text-left text-primary">
            Submission details
          </p>

          <div className="flex-col md:flex-row w-full">
            <span className="flex text-lg md:text-xl mb-2 font-heading text-primary gap-2">
              Name of the film:
              <h2 className="font-heading text-lg md:text-xl font-semibold text-primary">
                {submission.projectTitle}
              </h2>
            </span>

            <span className="flex text-lg md:text-xl mb-2 font-heading text-primary gap-2">
              Name of the filmmaker:
              <h2 className="font-heading text-lg md:text-xl font-semibold text-primary">
                {submission.name}
              </h2>
            </span>

            <span className="flex text-lg md:text-xl mb-2 font-heading text-primary gap-2">
              Duration:
              <h2 className="font-heading text-lg md:text-xl font-semibold text-primary">
                {submission?.duration.hours || "00"}h{" "}
                {submission?.duration.minutes || "00"}m{" "}
                {submission?.duration.seconds}s
              </h2>
            </span>

            <p className="font-heading mt-6 text-xs md:text-sm text-primary font-light">
              If you believe this is an error or wish to update your submission,
              please contact us at cfccosmartsciety.org
            </p>
          </div>
        </div>
      </div>
    );
  }

  function Register() {
    const navigate = useNavigate();

    // Form state (keep all fields intact)
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
    const [dateModalOpen, setDateModalOpen] = useState(false);

    const FIXED_EVENT_DATE = "2026-01-10";

    function isDriveLink(url?: string) {
      if (!url) return false;
      try {
        const u = new URL(url);
        // Accept drive.google.com (file or folder links) and docs.google.com(shareable) & drive with file id patterns
        return (
          u.hostname.includes("drive.google.com") ||
          u.hostname.includes("docs.google.com") ||
          u.hostname.includes("drive.googleusercontent.com")
        );
      } catch {
        return false;
      }
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!auth.currentUser) {
        toast.error(
          "You must be logged in to submit a film.\nRedirecting to auth...",
        );
        navigate("/auth");
        return;
      }

      if (trailerLink && !isDriveLink(trailerLink)) {
        alert("Trailer link must be a Google Drive / Google Docs link.");
        return;
      }

      if (fullFilmLink && !isDriveLink(fullFilmLink)) {
        alert("Full film link must be a Google Drive / Google Docs link.");
        return;
      }

      setSubmitting(true);
      const payload = {
        uid: auth.currentUser?.uid,
        name: name,
        email: auth.currentUser?.email,
        projectTitle,
        duration: {
          hours: durationHours,
          minutes: durationMinutes,
          seconds: durationSeconds,
        },
        productionDate: productionDate || FIXED_EVENT_DATE,
        trailerLink,
        fullFilmLink,
        castDetails,
        producerDetails,
        directorByte,
      };

      try {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("Registration response data:", data);

        if (res.ok) {
          toast.success(
            "Registration successful! Thank you for your submission.",
          );
          navigate("/");
        } else {
          const j = await res.json().catch(() => ({}));
          alert(`Registration failed: ${j?.message || res.statusText}`);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while submitting. Check console.");
      } finally {
        setSubmitting(false);
      }
    }

    return (
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl md:text-5xl 
            font-heading font-black uppercase tracking-wide 
            text-ring drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] mb-10"
        >
          Film Submission Form
        </motion.h1>

        <div className="flex md:flex-col items-center justify-center mx-auto gap-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="h-full"
          >
            <div
              className="md:p-10 p-6 rounded-3xl border 
              border-ring/12 bg-card/50 
              backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* name */}
                <div>
                  <label
                    className="block text-sm font-heading 
                    uppercase tracking-wider text-ring mb-2"
                  >
                    Name of Filmmaker
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="filmic-input"
                    placeholder="Your Name"
                    required
                  />
                </div>
                {/* Title */}
                <div>
                  <label
                    className="block text-sm font-heading 
                    uppercase tracking-wider text-ring mb-2"
                  >
                    Title of Project
                  </label>
                  <Input
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="filmic-input"
                    placeholder="Your film title"
                    required
                  />
                </div>

                {/* Duration + Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-heading uppercase 
                      tracking-wider text-ring mb-2"
                    >
                      Duration (HH:MM:SS)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="HH"
                        value={durationHours}
                        onChange={(e) => setDurationHours(e.target.value)}
                        className="filmic-input w-20"
                      />
                      <Input
                        placeholder="MM"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
                        className="filmic-input w-20"
                      />
                      <Input
                        placeholder="SS"
                        value={durationSeconds}
                        onChange={(e) => setDurationSeconds(e.target.value)}
                        className="filmic-input w-20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-heading uppercase 
                      tracking-wider text-ring mb-2"
                    >
                      Production Date
                    </label>
                    <Input
                      type="date"
                      value={productionDate}
                      onChange={(e) => setProductionDate(e.target.value)}
                      className="filmic-input"
                      placeholder="YYYY-MM-DD"
                    />
                    <p className="mt-2 text-sm text-ring/60">
                      If left blank, the fixed festival date will be used.{" "}
                      <button
                        type="button"
                        onClick={() => setDateModalOpen(true)}
                        className="underline hover:text-primary"
                      >
                        View date
                      </button>
                    </p>
                  </div>
                </div>

                {/* Trailer (Drive-only helper text) */}
                <div>
                  <label
                    className="block text-sm font-heading uppercase 
                    tracking-wider text-ring mb-2"
                  >
                    Trailer Link (Google Drive only)
                  </label>
                  <Input
                    value={trailerLink}
                    onChange={(e) => setTrailerLink(e.target.value)}
                    className="filmic-input"
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="mt-2 text-sm text-ring/60">
                    Only Google Drive / Docs links accepted (no other hosts).
                  </p>
                </div>

                {/* Full film (Drive-only) */}
                <div>
                  <label className="block text-sm font-heading uppercase tracking-wider text-ring mb-2">
                    Full Film Link (Google Drive only)
                  </label>
                  <Input
                    value={fullFilmLink}
                    onChange={(e) => setFullFilmLink(e.target.value)}
                    className="filmic-input"
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="mt-2 text-sm text-ring/60">
                    Please upload to Google Drive and paste the shareable link.
                  </p>
                </div>

                {/* Cast */}
                <div>
                  <label
                    className="block text-sm font-heading uppercase 
                    tracking-wider text-ring mb-2"
                  >
                    Cast Details
                  </label>
                  <Input
                    value={castDetails}
                    onChange={(e) => setCastDetails(e.target.value)}
                    className="filmic-input"
                    placeholder="Lead actors, supporting cast..."
                  />
                </div>

                {/* Producer */}
                <div>
                  <label
                    className="block text-sm font-heading uppercase 
                    tracking-wider text-ring mb-2"
                  >
                    Producer Details
                  </label>
                  <Input
                    value={producerDetails}
                    onChange={(e) => setProducerDetails(e.target.value)}
                    className="filmic-input"
                    placeholder="Producer name & contact"
                  />
                </div>

                {/* Director's Byte */}
                <div>
                  <label
                    className="block text-sm font-heading uppercase 
                    tracking-wider text-ring mb-2"
                  >
                    Director's Byte (max 500 words)
                  </label>
                  <Textarea
                    value={directorByte}
                    onChange={(e) => setDirectorByte(e.target.value)}
                    className="filmic-input min-h-[130px]"
                    placeholder="Short note about the film / concept..."
                  />
                </div>
                <div className="flex gap-4 items-center justify-center">
                  <input type="checkbox" />
                  <p className="text-sm text-ring/60">
                    By submitting you agree to the festival rules. Only Google
                    Drive uploads will be accepted for videos.
                  </p>
                </div>

                {/* CTA row */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 rounded-md bg-card text-primary font-heading font-semibold shadow-[0_8px_30px_rgba(230,213,179,0.12)] hover:shadow-[0_12px_40px_rgba(230,213,179,0.18)] transition"
                    >
                      {submitting ? "Submitting..." : "Register"}
                    </Button>
                  </motion.div>

                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/rules")}
                    type="button"
                    className="px-4 py-2 rounded-md bg-transparent border border-ring/20 text-ring text-sm hover:bg-card/50 transition"
                  >
                    View Rules
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Fixed Date Modal */}
        {dateModalOpen && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
            onClick={(e) =>
              e.target === e.currentTarget && setDateModalOpen(false)
            }
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-sm p-6 rounded-2xl border border-ring/30 bg-card/80 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
            >
              <h3 className="text-lg font-heading font-black text-ring mb-2">
                Festival Date
              </h3>
              <p className="text-primary-foreground/80 mb-4">
                This is the fixed festival date — submissions will be scheduled
                around this day:
              </p>
              <div className="text-center">
                <div className="inline-block bg-ring/10 px-6 py-3 rounded-md text-ring font-bold">
                  {FIXED_EVENT_DATE}
                </div>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setDateModalOpen(false)}
                  className="px-5 py-2 rounded-md bg-ring/20 text-ring border border-ring/30 hover:bg-ring/30 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* page-local filmic input styles */}
        <style>{`
        .filmic-input {
          background: rgba(255,255,255,0.02);
          border: 1px solidhsl(var(--ring), 0.06);
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
          box-shadow: inset 0 -6px 16px rgba(0,0,0,0.6), 0 0 0 hsl(var(--ring), 0);
        }
        .filmic-input:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 12px hsl(var(--ring), 0.06);
          border-color: hsl(var(--ring), 0.18);
        }
        .filmic-input:focus {
          outline: none;
          border-color: hsl(var(--ring), 0.45);
          box-shadow: 0 18px 50px rgba(0,0,0,0.6), 0 0 30px hsl(var(--ring), 0.14);
        }

        /* small responsive tweak so the left strip never overlaps on narrow screens */
        @media (max-width: 768px) {
          .md\\:grid-cols-\\[240px_1fr\\] { grid-template-columns: 1fr; }
        }
      `}</style>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-primary text-primary-foreground font-body">
      {/* cinematic vignette & grain */}
      <div
        className="absolute inset-0 
      bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)] 
      pointer-events-none"
      />
      <div
        className="absolute inset-0 opacity-5 
      mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"
      />

      <Navigation />

      <main className="py-16 relative z-10">
        {submission ? <Submitted submission={submission[0]} /> : <Register />}
      </main>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPage;
