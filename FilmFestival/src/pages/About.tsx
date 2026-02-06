import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import fLogo from "@/assets/f.jpeg";
import smartLogo from "@/assets/smart.jpeg";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground font-body relative overflow-hidden">
      <style>{`
        .heading-bebas {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: .02em;
        }

        /* ✅ Card design */
        .card-vintage {
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.09));
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.4);
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          transition: all .4s ease;
          position: relative;
          z-index: 2;
        }

        .card-vintage:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.12));
        }

        .logo-panel {
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.45));
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          transition: all .45s ease;
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
          position: relative;
          z-index: 2;
        }

        .logo-panel:hover {
          transform: scale(1.05);
          filter: brightness(1.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
        }

        .logo-panel img {
          width: 80%;
          height: auto;
          border-radius: 8px;
        }

        .film-strip {
          background-image:
            linear-gradient(90deg, rgba(0,0,0,0.1) 0 6px, transparent 7px 18px),
            radial-gradient(circle at 20% 50%, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 36px 16px, 8px 8px;
          border-radius: 12px;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp .8s ease-out forwards;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ✅ Responsive stacking */
        @media (max-width: 768px) {
          .zigzag {
            flex-direction: column !important;
            text-align: center;
          }
          .logo-panel {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>

      {/* Navigation */}
      <Navigation />

      {/* ✅ Clean About section (no background image) */}
      <main className="relative z-10 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center fade-in relative z-10">
            <h1 className="heading-bebas text-4xl md:text-6xl font-black uppercase tracking-tight">
              About Us
            </h1>
            <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto mt-3">
              A collaboration between The Forum for Film Studies & Allied Arts
              and SMART Society.
            </p>
          </div>

          {/* Forum Section */}
          <section className="zigzag flex items-center justify-center gap-12 mb-24 fade-in relative z-10">
            <div className="logo-panel film-strip">
              <img src={fLogo} alt="Forum for Film Studies Logo" />
            </div>
            <article className="card-vintage film-strip p-8 max-w-2xl">
              <h2 className="text-xl font-heading font-black uppercase mb-3 text-ring">
                Forum for Film Studies & Allied Arts — Kolkata
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                The Forum for Film Studies and Allied Arts, Kolkata, promotes
                cinema through festivals, screenings, and tributes.
                Collaborating with embassies and institutions like Instituto
                Cervantes and SRFTI, it showcases international and Indian films
                and honors filmmakers such as Buddhadeb Dasgupta.
              </p>
            </article>
          </section>

          {/* SMART Section */}
          <section className="zigzag flex items-center justify-center gap-12 flex-row-reverse fade-in relative z-10">
            <div className="logo-panel film-strip">
              <img src={smartLogo} alt="SMART Society Logo" />
            </div>
            <article className="card-vintage film-strip p-8 max-w-2xl">
              <h2 className="text-xl font-heading font-black uppercase mb-3 text-ring">
                SMART Society — USA & Canada
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                SMART Society is a US and Canada-based non-profit society aiming
                to create a pool of unique ideas and thoughts through
                power-packed talks. It serves as a platform for Makers, Artists,
                Researchers, and Technologists to bring forth their views to the
                world.
              </p>
            </article>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
