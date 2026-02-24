import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "../App.css";

type JuryMember = {
  name: string;
  title?: string;
  bio?: string;
  image?: string;
};

const JURY_INITIAL: JuryMember[] = [
  {
    name: "Ananya Roy",
    title: "Head Jury • Filmmaker & Curator",
    bio: "Champion of experimental storytelling and festival curation.",
    image: "/coming.jpeg",
  },
  {
    name: "Prabhat Roy",
    title: "Director",
    bio: "Multiple national award recipient",
    image: "/prabhat.jpeg",
  },
  {
    name: "Dr. Meera Chakraborty",
    title: "Film Scholar",
    bio: "Researcher of regional cinema and digital storytelling.",
    image: "/coming.jpeg",
  },
  {
    name: "Amrita Bose",
    title: "Editor",
    bio: "Award-winning editor focused on rhythm and emotional storytelling.",
    image:"/coming.jpeg",
  },
];

export default function Jury() {
  // First item is Head Jury; rest are three jury members.
  const [HEAD, ...OTHERS] = JURY_INITIAL;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".card-reveal, .featured-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-primary text-primary-foreground relative overflow-x-hidden">
      <style>{`
        /* --- General Page Layout --- */
        .page-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 24px 120px;
          position: relative;
          z-index: 20;
        }

        /* --- Background Filmic Reel & Grain --- */
        .film-reel {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 160%;
          height: 260px;
          pointer-events: none;
          opacity: 0.07;
          z-index: 1;
        }
        .film-reel .strip {
          width: 300%;
          height: 100%;
          background-image: linear-gradient(90deg,
            rgba(255,255,255,0.02) 0 4%,
            rgba(0,0,0,0.12) 4% 6%,
            rgba(255,255,255,0.02) 6% 10%,
            rgba(0,0,0,0.06) 10% 12%,
            rgba(255,255,255,0.02) 12% 100%);
          background-size: 1200px 100%;
          animation: reelSlide 14s linear infinite;
        }
        @keyframes reelSlide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }

        .grain {
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="1" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.06"/></svg>');
          opacity: 0.05;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        /* --- Heading --- */
        .hero {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          z-index: 3;
        }
        .hero h1 {
          font-family: var(--font-heading, system-ui);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          font-size: clamp(40px, 6vw, 90px);
          line-height: 0.95;
          color: var(--primary-foreground, #fff);
          margin: 0 0 10px;
        }
        .hero p {
          color: rgba(255,255,255,0.75);
          margin-top: 6px;
          font-size: 1rem;
          max-width: 60ch;
          margin-left: auto;
          margin-right: auto;
        }

        /* --- Featured Head Jury (same film-frame look, bigger) --- */
        .featured-wrap {
          display: grid;
          place-items: center;
          margin: 40px 0 60px;
          position: relative;
          z-index: 3;
        }
        .featured-card {
          position: relative;
          width: min(980px, 96%);
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 40px 130px rgba(0,0,0,0.65);
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
        }
        .featured-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 60px 160px rgba(0,0,0,0.75);
        }
        .featured-left {
          padding: 20px;
          display: grid;
          align-content: start;
        }
        .featured-film-frame {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 12px;
          overflow: hidden;
          background: #0c0707;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: inset 0 -12px 36px rgba(0,0,0,0.6);
          position: relative;
        }
        .featured-film-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.6s ease;
        }
        .featured-card:hover .featured-film-frame img {
          transform: scale(1.05);
        }
        .featured-right {
          display: grid;
          align-content: center;
          padding: clamp(16px, 3vw, 28px);
          text-align: left;
          gap: 10px;
          background: radial-gradient(1200px 300px at 0% 100%, rgba(0,0,0,0.45), transparent 70%);
        }
        .featured-name {
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: clamp(20px, 3vw, 30px);
        }
        .featured-title {
          color: rgba(255,255,255,0.8);
          font-size: clamp(14px, 2vw, 18px);
        }
        .featured-bio {
          color: rgba(255,255,255,0.9);
          font-size: clamp(14px, 2vw, 16px);
          margin-top: 6px;
          line-height: 1.5;
        }

        .featured-perf-top, .featured-perf-bottom {
          position: absolute;
          left: 6%;
          right: 6%;
          height: 16px;
          background-image: radial-gradient(circle at 6px 6px, rgba(255,255,255,0.06) 0 32%, transparent 34%);
          background-size: 28px 16px;
          background-repeat: repeat-x;
          opacity: 0.22;
          pointer-events: none;
        }
        .featured-perf-top { top: 6%; transform: translateY(-12px); }
        .featured-perf-bottom { bottom: 6%; transform: translateY(12px); }

        .featured-reveal {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .featured-reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- Grid & Card Layout (3 Jury below) --- */
        .jury-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 50px;
          justify-items: center;
          position: relative;
          z-index: 3;
        }

        .card-reveal {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .card-reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- Reusable Filmic Card --- */
        .card {
          position: relative;
          height: 480px;
          width: 320px;
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 90px rgba(0,0,0,0.65);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-10px);
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 40px 130px rgba(0,0,0,0.7);
        }

        .film-frame {
          width: 92%;
          height: 70%;
          margin: 20px auto 0;
          border-radius: 12px;
          overflow: hidden;
          background: #0c0707;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: inset 0 -12px 36px rgba(0,0,0,0.6);
          position: relative;
        }

        .film-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .card:hover .film-frame img {
          transform: scale(1.04);
        }

        .perf-top, .perf-bottom {
          position: absolute;
          left: 8%;
          right: 8%;
          height: 16px;
          background-image: radial-gradient(circle at 6px 6px, rgba(255,255,255,0.05) 0 30%, transparent 32%);
          background-size: 28px 16px;
          background-repeat: repeat-x;
          opacity: 0.18;
        }
        .perf-top { top: 6%; transform: translateY(-12px); }
        .perf-bottom { bottom: 6%; transform: translateY(12px); }

        .perf-left, .perf-right {
          position: absolute;
          top: 8%;
          bottom: 8%;
          width: 26px;
          background-image: radial-gradient(circle at 50% 6px, rgba(255,255,255,0.04) 0 28%, transparent 30%);
          background-size: 16px 28px;
          background-repeat: repeat-y;
          opacity: 0.15;
        }
        .perf-left { left: -30px; }
        .perf-right { right: -30px; transform: scaleX(-1); }

        /* --- Text --- */
        .meta {
          text-align: center;
          padding: 16px;
        }
        .meta .name {
          font-weight: 900;
          text-transform: uppercase;
          font-size: 1rem;
          letter-spacing: 0.05em;
        }
        .meta .title {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          margin-top: 4px;
        }

        .bio {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 18px;
          background: linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.7));
          transform: translateY(100%);
          transition: transform 0.4s ease;
        }
        .card:hover .bio {
          transform: translateY(0%);
        }
        .bio p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.9);
          text-align: center;
          margin: 0;
        }

        /* --- Footer Color --- */
        footer {
          background-color: #d8744b !important;
          color: #fff !important;
          padding-top: 40px !important;
          padding-bottom: 40px !important;
        }

        @media (max-width: 1020px) {
          .featured-card { grid-template-columns: 1fr; }
          .featured-left { padding: 16px; }
        }

        @media (max-width: 640px) {
          .card { height: 400px; width: 280px; }
        }
      `}</style>

      {/* Cinematic Layers */}
      <div className="film-reel"><div className="strip" /></div>
      <div className="grain" />

      <Navigation />

      <main className="page-inner">
        <header className="hero">
          <h1>Meet the Jury</h1>
          <p>Hover or tap a card to reveal their cinematic journey.</p>
        </header>

        {/* Featured Head Jury (same film-frame look, larger) */}
        <section className="featured-wrap featured-reveal">
          <div className="featured-card">
            <div className="featured-perf-top" />
            <div className="featured-perf-bottom" />

            <div className="featured-left">
              <div className="featured-film-frame">
                {HEAD?.image ? (
                  <img src={HEAD.image} alt={HEAD?.name || "Head Jury"} />
                ) : (
                  <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#fff" }}>
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 21a9 9 0 0118 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="featured-right">
              <div className="featured-name">{HEAD?.name}</div>
              <div className="featured-title">{HEAD?.title}</div>
              <div className="featured-bio">{HEAD?.bio}</div>
            </div>
          </div>
        </section>

        {/* 3 Jury Below */}
        <section className="jury-grid">
          {OTHERS.map((m) => (
            <div key={m.name} className="card-reveal">
              <div className="card">
                <div className="perf-top" />
                <div className="perf-bottom" />
                <div className="perf-left" />
                <div className="perf-right" />

                <div className="film-frame">
                  {m.image ? (
                    <img src={m.image} alt={m.name} />
                  ) : (
                    <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#fff" }}>
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 21a9 9 0 0118 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="meta">
                  <div className="name">{m.name}</div>
                  <div className="title">{m.title}</div>
                </div>

                <div className="bio">
                  <p>{m.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer anchor for Contact Us link */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}