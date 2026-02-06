import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Visitor: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitorType: "general",
  });
  const [submitted, setSubmitted] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const FIXED_DATE_ISO = "2026-01-10";
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!calendarOpen) return;
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setCalendarOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCalendarOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [calendarOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setErrorMessage("");

    // IMPORTANT: Replace this with your deployed Google Apps Script Web App URL
    const APPS_SCRIPT_WEB_APP_URL =
      "https://script.google.com/macros/s/AKfycbwNAV07Oc-yBTwD8jMGNFVw76qKZOT1LJagDX_tYiEBGpHQ7qyVugSY_ZnsmtOqIPKjuA/exec"; // Corrected line

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      visitorType: formData.visitorType,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Required for Apps Script web apps to avoid CORS issues
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Apps Script expects this content type for e.parameter
        },
        body: new URLSearchParams(payload).toString(), // Convert object to URL-encoded string
      });

      toast.success(
        "Visitor Pass registered successfully! you will receive an email shortly.",
      );
      setSubmissionStatus("success");
      setSubmitted(true);
      navigate("/");

      // Apps Script web apps typically return a 200 OK even for errors,
      // so we can't rely on response.ok directly for success/failure.
      // We'll assume success if no network error, and the Apps Script
      // can handle internal logic. For more robust error handling,
      // the Apps Script could return a JSON response.

      // If you want to get a response from Apps Script, you'd need to
      // change `mode: "no-cors"` to `mode: "cors"` and ensure your
      // Apps Script `doPost` function returns a `ContentService.createTextOutput()`
      // with appropriate headers and content. For simplicity, we'll assume success here.
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSubmissionStatus("error");
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Nandan%20Kolkata`;

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      {/* Page-level CSS for filmic treatment and interactions */}
      <style>{`
        /* film grain overlay */
        .film-grain::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(circle at 10% 10%, rgba(255,255,255,0.02) 0 1px, transparent 1px),
            radial-gradient(circle at 90% 90%, rgba(0,0,0,0.03) 0 1px, transparent 1px);
          background-size: 6px 6px, 8px 8px;
          mix-blend-mode: overlay;
          opacity: 0.5;
          z-index: 2;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%);
          pointer-events: none;
          z-index: 3;
        }

        /* sprocket edge */
        .sprocket-left {
          position: absolute;
          left: -28px;
          top: 8%;
          height: 84%;
          width: 56px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.08) 100%);
          border-radius: 12px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
          display: none;
        }
        @media (min-width: 768px) { .sprocket-left { display: block; } }
        .sprocket-left::before {
          content: "";
          position: absolute;
          inset: 14% 12% 14% 12%;
          background-image: radial-gradient(rgba(0,0,0,0.5) 2px, transparent 3px);
          background-size: 12px 28px;
          opacity: 0.36;
        }

        /* film-card */
        .film-card {
          border-left: 1px solid rgba(0,0,0,0.18);
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
          transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms;
        }
        .film-card:hover { transform: translateY(-6px) rotate(-0.2deg); box-shadow: 0 18px 60px rgba(0,0,0,0.72); }

        /* input hover/focus pop */
        .film-input {
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .film-input:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.45); }
        .film-input:focus { transform: translateY(-3px) scale(1.002); box-shadow: 0 10px 26px rgba(0,0,0,0.6); border-color: rgba(233,210,166,0.95); }

        /* button micro interactions */
        .film-cta { transition: transform 160ms ease, box-shadow 160ms ease; }
        .film-cta:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 24px rgba(0,0,0,0.5); }

        /* aged / sepia labels */
        .sepia-text { color: hsl(var(--foreground)); }

        /* small animated label */
        @keyframes labelFloat { 0%{ transform: translateY(0); } 50%{ transform: translateY(-1px); } 100%{ transform: translateY(0); } }
        .label-subtle { animation: labelFloat 3.6s ease-in-out infinite; }

      `}</style>

      <div className="film-grain absolute inset-0 pointer-events-none" />
      <div className="vignette" />

      <Navigation />

      {/* SINGLE PAGE: Title + form */}
      <section className="relative py-16 md:py-20">
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Title + copy */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-heading font-black mb-3 uppercase sepia-text tracking-wider">
                VISITOR PASS REGISTRATION
              </h1>
              <p className="max-w-xl text-foreground/85 leading-relaxed mb-4">
                Be part of Kolkata’s cinematic celebration — screenings, panels
                and intimate talks with makers and storytellers.
              </p>
              <p className="max-w-xl text-foreground/80 mb-6">
                Smart Society is a US & Canada-based non-profit that brings
                powerful short talks and multidisciplinary perspectives to the
                world.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCalendarOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-card/60 border border-border/20 hover:bg-card/80 transition label-subtle"
                  aria-expanded={calendarOpen}
                >
                  <Calendar className="w-5 h-5 text-foreground" />
                  <span className="font-heading uppercase text-xs sepia-text">
                    Jan 10, 2026
                  </span>
                </button>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-card/60 border border-border/20 hover:bg-card/80 transition label-subtle"
                >
                  <MapPin className="w-5 h-5 text-foreground" />
                  <span className="font-heading uppercase text-xs sepia-text">
                    NANDAN, KOLKATA
                  </span>
                </a>

                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-card/60 border border-border/20">
                  <Clock className="w-5 h-5 text-foreground" />
                  <span className="text-sm">9:00 AM – 8:00 PM</span>
                </div>
              </div>
            </motion.div>

            {/* Right: filmic form card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="sprocket-left" aria-hidden />

              <div className="film-card relative bg-card backdrop-blur-md border border-border rounded-2xl p-5 md:p-7">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-2xl font-heading font-black sepia-text">
                      Reserve Your Spot
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Limited passes — fill the form below.
                    </p>

                    <div>
                      <label className="block text-xs mb-2 font-heading uppercase tracking-wide sepia-text">
                        Full name
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="film-input bg-transparent border border-border text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-2 font-heading uppercase tracking-wide sepia-text">
                        Email
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="film-input bg-transparent border border-border text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-2 font-heading uppercase tracking-wide sepia-text">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="film-input bg-transparent border border-border text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring"
                        placeholder="+91 9xxxxxxxxx"
                      />
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Button
                        type="submit"
                        className="film-cta 
                        bg-primary text-primary-foreground font-heading 
                        text-sm py-2.5 px-4 rounded-md 
                        shadow-[0_8px_20px_rgba(0,0,0,0.45)] hover:brightness-105"
                      >
                        Get Visitor Pass
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground mt-2">
                      By registering you agree to the festival terms. Passes are
                      non-transferable.
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                    className="text-center py-8"
                  >
                    <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="text-2xl font-heading font-black mb-2 sepia-text">
                      PASS CONFIRMED
                    </h4>
                    <p className="text-foreground/80 mb-4">
                      Thanks — your Visitor Pass ID will be emailed shortly.
                    </p>
                    <Badge className="bg-primary text-primary-foreground font-heading px-5 py-2">
                      VP-2026-
                      {Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendar modal: shows fixed date (Jan 2026) - not editable */}
      {calendarOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div
            ref={calendarRef}
            className="w-full max-w-sm bg-card backdrop-blur-md border border-border rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-heading text-lg sepia-text">January 2026</h5>
              <button
                onClick={() => setCalendarOpen(false)}
                className="text-muted-foreground px-2 py-1 rounded hover:bg-accent/10"
              >
                Close
              </button>
            </div>

            {/* Stylised read-only calendar grid with 10 highlighted */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-muted-foreground mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {/* compute first day for Jan 2026 (Fri) -> but we'll render programmatically to be safe */}
              {(() => {
                const year = 2026;
                const monthIndex = 0;
                const firstDay = new Date(year, monthIndex, 1).getDay();
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                const cells = Array(firstDay)
                  .fill(null)
                  .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
                while (cells.length % 7 !== 0) cells.push(null);
                return cells.map((n, idx) => {
                  const isActive = n === 10;
                  return (
                    <div
                      key={idx}
                      className={[
                        "aspect-square select-none grid place-items-center rounded-md",
                        isActive
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-card text-muted-foreground",
                      ].join(" ")}
                    >
                      {n || ""}
                    </div>
                  );
                });
              })()}
            </div>

            <div className="mt-4 text-sm text-foreground/75">
              <strong>Date:</strong> Jan 10, 2026 — <em>Fixed event date</em>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setCalendarOpen(false)}
                className="px-3 py-2 rounded-md bg-accent/5 hover:bg-accent/10 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Visitor;
