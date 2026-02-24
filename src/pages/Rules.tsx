import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Rules: React.FC = () => {
  const [tab, setTab] = useState<"general" | "competitive">("general");

  // Hide stray "Page X" links if any injected by other components
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("a")).filter((a) =>
      /^\s*Page\s*\d+/i.test(a.textContent || ""),
    );
    els.forEach((el) => ((el as HTMLElement).style.display = "none"));
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F6F9] text-[#2E3A44] font-body">
      {/* Inline styles for filmic effects */}
      <style>{`
        /* subtle paper / grain overlay (if you have a grain image, place at /assets/grain.png) */
        .grain-overlay {
          background-image: radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 6px 6px;
        }

        /* tab button */
        .tab-btn {
          transition: transform .22s ease, box-shadow .22s ease, color .18s ease;
          transform-origin: center;
        }
        .tab-btn:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(46,58,68,0.25); color: #c30101; }

        /* rule card hover filmic */
        .rule-row { transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease; }
        .rule-row:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 32px rgba(46,58,68,0.2);
          background: linear-gradient(180deg, rgba(101,9,1,0.05), rgba(46,58,68,0.04));
        }

        /* thin divider lines */
        .sep-line { height:1px; background: rgba(46,58,68,0.15); margin: 14px 0; }

        /* compact list styling for multi-column */
        .compact-ol { columns: 2; column-gap: 28px; }
        @media (max-width: 900px) { .compact-ol { columns: 1; } }

        /* deadline accent */
        .deadline { color: #c30101; font-weight:700; }

        /* custom scrollbar lightly visible on small devices only */
        .scrollbar::-webkit-scrollbar { width: 8px; }
        .scrollbar::-webkit-scrollbar-thumb { background: rgba(101,9,1,0.2); border-radius: 6px; }

        /* header Bebas look (if Bebas loaded in tailwind config) */
        .heading-bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: .02em; }
      `}</style>

      <Navigation />

      <main className="relative z-10 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Heading */}
          <header className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl heading-bebas text-[#2E3A44] font-black uppercase tracking-tight">
              Rules &amp; Regulations
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#2E3A44]/85 max-w-2xl mx-auto">
              CFCCF 2026 · Kolkata, India — organised by IEM – UEM Group, SMART
              Society (USA) &amp; Forum for Film Studies and Allied Arts
            </p>
          </header>

          {/* Tabs centered under heading */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-[#650901] p-1 rounded-full border border-[#650901]/30 shadow-lg">
              <button
                onClick={() => setTab("general")}
                className={[
                  "tab-btn px-6 py-2 rounded-full font-heading uppercase text-sm md:text-base",
                  tab === "general"
                    ? "bg-[#F2F6F9] text-[#650901] shadow-md"
                    : "text-[#F2F6F9]/90 hover:text-white bg-transparent",
                ].join(" ")}
              >
                General Rules
              </button>

              <button
                onClick={() => setTab("competitive")}
                className={[
                  "tab-btn px-6 py-2 rounded-full font-heading uppercase text-sm md:text-base",
                  tab === "competitive"
                    ? "bg-[#F2F6F9] text-[#650901] shadow-md"
                    : "text-[#F2F6F9]/90 hover:text-white bg-transparent",
                ].join(" ")}
              >
                Competitive Section
              </button>
            </div>
          </div>

          {/* Card that contains the tab content — compact, filmic */}
          <section className="bg-white/80 rounded-2xl p-6 md:p-8 border border-[#650901]/20 shadow-2xl grain-overlay">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: rules content (wide) */}
              <div className="flex-1">
                <div className="text-sm text-[#2E3A44]/90 leading-relaxed mb-4">
                  <strong className="text-[#650901]">CFCCF 2026</strong> — This
                  Film Festival aims at creating a platform for better
                  understanding of the films of the past and present in an
                  atmosphere of appreciation and to move towards excellence of
                  the motion picture art and industry.
                </div>

                <div className="sep-line" />

                {/* Tab contents compact and split into columns so user doesn't need to scroll */}
                {tab === "general" ? (
                  <>
                    <h3 className="text-xl md:text-2xl heading-bebas text-[#650901] font-black uppercase mb-3">
                      A. General Rules
                    </h3>

                    <ol className="compact-ol list-decimal pl-6 text-sm md:text-base text-[#2E3A44]/90">
                      <li className="rule-row p-2 rounded-md mb-2">
                        Only selected films will be intimated by email. All
                        lists will be available on the website from{" "}
                        <span className="deadline">30th November 2025</span>.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        A director is not allowed to enter more than one film
                        for selection.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        The last date of submitting films along with the
                        Completed Entry form and preview link (Video / Google
                        Drive) is{" "}
                        <span className="deadline">15th November 2025</span>.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        Entry Forms should be filled in clearly. Press materials
                        i.e. synopsis (60 words), cast, credits, director’s
                        filmography, etc. must be sent in a separate Word file
                        format by email.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        If selected for the festival the entrants must undertake
                        to provide publicity clippings / trailer for the use of
                        the festival.
                      </li>
                    </ol>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl md:text-2xl heading-bebas text-[#650901] font-black uppercase mb-3">
                      B. Competitive Section
                    </h3>

                    <ol className="compact-ol list-decimal pl-6 text-sm md:text-base text-[#2E3A44]/90">
                      <li className="rule-row p-2 rounded-md mb-2">
                        Short Films must be fiction films. Duration will not be
                        more than 30 minutes.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        Films must be completed between{" "}
                        <strong>1st January 2024</strong> and{" "}
                        <strong>31st December 2025</strong> and duly
                        authenticated by the entrant in the entry form.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        The films must have a Worldwide Premiere (should not
                        have been presented theatrically or released on
                        video/DVD/telecast/internet/VOD).
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        Please submit the preview link (Video / All Access
                        Google Drive) of your film preferably in .mp4 format for
                        selection. English subtitles are strictly required. Send
                        password, if any.
                        <div className="mt-2 ml-2 text-xs text-[#2E3A44]/70">
                          Secondary option: Pen Drive / DVD with English
                          subtitles; label with name, contact number &amp;
                          address and courier to the festival office.
                        </div>
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        All non-English films in competition will be screened in
                        original versions with English subtitles.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        Films must be available for festival screening in
                        minimum Full HD up to 4K.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        In case of co-productions, producers must nominate the
                        person to receive certificates at the finale.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        Entries will be subject to preview by a committee
                        constituted by the IEM – UEM Group &amp; Forum for Film
                        Studies and Allied Arts.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        Entrants are invited to agree that the Director &amp;
                        Producer will receive awards in person or nominate an
                        immediate family/unit member to attend.
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        Eminent juries will be appointed by the Kolkata
                        International Film Festival Authority. They will decide
                        awards:
                        <ul className="list-disc ml-5 mt-2 text-sm">
                          <li>Best Short Film</li>
                          <li>Best Director</li>
                          <li>Best Cinematography</li>
                        </ul>
                      </li>

                      <li className="rule-row p-2 rounded-md mb-2">
                        The Director of the Festival is authorised to waive any
                        of the above-mentioned rules.
                      </li>
                    </ol>
                  </>
                )}
              </div>

              {/* Right: deadlines + CTA */}
              <aside className="w-full md:w-80 flex-shrink-0 bg-[#650901]/5 rounded-xl p-4 border border-[#650901]/25 shadow-inner">
                <div className="mb-4">
                  <h4 className="text-sm text-[#650901] uppercase font-heading tracking-wider">
                    Key Dates
                  </h4>
                  <div className="mt-3 space-y-3">
                    <div className="bg-[#650901] p-3 rounded-md">
                      <div className="text-xs text-[#F2F6F9]/80">
                        Submission Deadline
                      </div>
                      <div className="text-lg font-black deadline">
                        15th November 2025
                      </div>
                    </div>

                    <div className="bg-[#650901] p-3 rounded-md">
                      <div className="text-xs text-[#F2F6F9]/80">
                        Selection Lists Live
                      </div>
                      <div className="text-lg font-black text-[#F2F6F9]">
                        30th November 2025
                      </div>
                    </div>

                    <div className="bg-[#650901] p-3 rounded-md">
                      <div className="text-xs text-[#F2F6F9]/80">
                        Festival Date
                      </div>
                      <div className="text-lg font-black text-[#F2F6F9]">
                        10th January 2026
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sep-line" />

                {/* Register CTA matching registration page */}
                <Link to="/register" className="block">
                  <button className="w-full bg-[#650901] text-[#F2F6F9] px-4 py-3 rounded-full font-heading uppercase tracking-wide text-sm hover:scale-[1.02] hover:bg-[#c30101] transition shadow-md">
                    Register Now
                  </button>
                </Link>

                <div className="mt-4 text-xs text-[#2E3A44]/70">
                  Provide preview link (Video / Google Drive). Offline
                  submissions (DVD / Pen Drive) accepted as secondary method.
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Rules;
