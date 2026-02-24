import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useEffect } from "react";
// import images from src assets (use forward-slash imports, not backslash strings)
import kolkata1 from "@/assets/pic1.jpg";
import kolkata2 from "@/assets/pic2.jpg";
import kolkata3 from "@/assets/pic3.jpg";
import kolkata4 from "@/assets/pic4.jpg";
import kolkata5 from "@/assets/pic5.jpg";
import kolkata6 from "@/assets/pic6.jpg";
import kolkataBg from "@/assets/kolkata.png";

const STRIP_IMAGES: string[] = [
  kolkata1,
  kolkata2,
  kolkata3,
  kolkata4,
  kolkata5,
  kolkata6,
];

function ScanButton({
  children,
  to,
  className = "",
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
}) {
  const [scanKey, setScanKey] = useState<number | null>(null);

  const Btn = (
    <Button
      variant="secondary"
      className={[
        "relative overflow-hidden rounded-xl !py-3 !px-10 text-lg",
        "transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary/50",
        "electric-hover electric-active",
        className,
      ].join(" ")}
      onMouseEnter={() => setScanKey((k) => (k === null ? 0 : k + 1))}
      onTouchStart={() => setScanKey((k) => (k === null ? 0 : k + 1))}
    >
      {scanKey !== null && (
        <span
          key={scanKey}
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 h-px electric-scan rounded-full"
          style={{ top: 0, animation: "scanDownOnce 900ms ease-out forwards" }}
          onAnimationEnd={() => setScanKey(null)}
        />
      )}
      <span className="relative z-10 font-heading font-semibold">
        {children}
      </span>
    </Button>
  );
  return <Link to={to}>{Btn}</Link>;
}

function VenueBox() {
  const [open, setOpen] = useState(false);
  const year = 2026;
  const monthIndex = 0;
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  while (cells.length % 7 !== 0) cells.push(null);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative rounded-xl bg-card px-6 py-4 text-primary 
        shadow-lg border border-border transition-all duration-300 hover:-translate-y-0.5 
        hover:shadow-2xl"
      >
        <div className="text-left">
          <div className="text-xs font-extrabold tracking-[0.18em] uppercase">
            Event
          </div>
          <div className="mt-1 text-lg md:text-xl font-black tracking-tight">
            18ᵗʰ April, 2026 · London
          </div>
          <div className="mt-1 text-[13px] font-semibold opacity-90">
            Venue: House of Lords, London
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-primary-foreground/20 bg-primary text-primary-foreground shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary-foreground/10">
              <h3 className="text-sm font-semibold tracking-wide uppercase">
                April 2026
              </h3>
              <button
                className="rounded-md px-2 py-1 text-primary-foreground/80 hover:bg-primary-foreground/10"
                onClick={() => setOpen(false)}
              >
                X
              </button>
            </div>
            <div className="px-4 pt-3 pb-4">
              <div className="grid grid-cols-7 text-center text-[11px] uppercase tracking-wider text-primary-foreground/80">
                {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
                {cells.map((n, idx) => (
                  <div
                    key={idx}
                    className={[
                      "aspect-square select-none grid place-items-center rounded-md",
                      n === null
                        ? "opacity-0"
                        : n === 18
                          ? "relative font-semibold bg-primary-foreground text-primary"
                          : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15",
                    ].join(" ")}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BrochureButton() {
  return (
    <a
      href="/brochure.pdf"
      download
      className="group inline-flex items-center gap-2 
      rounded-xl bg-card px-6 py-4 text-primary 
      font-heading font-bold uppercase 
      tracking-wide border border-border  
      transition-all duration-300 hover:-translate-y-0.5 
      hover:shadow-2xl electric-hover electric-active"
    >
      <span className="text-base">Rules</span>
    </a>
  );
}

function HeroFilmReel({ frames }: { frames: string[] }) {
  return (
    <section className="relative overflow-hidden bg-primary mt-8 rounded-md py-6">
      {/* sprocket tape */}
      <div
        className="absolute left-0 right-0 top-0 h-6 
        bg-[radial-gradient(circle,_transparent_6px,_hsl(var(--background))_7px)]
        [background-size:32px_16px] [background-position:center]"
      />

      <div
        className="absolute left-0 right-0 bottom-0 h-6 
        bg-[radial-gradient(circle,_transparent_6px,_hsl(var(--background))_7px)]
        [background-size:32px_16px] [background-position:center]"
      />

      <div className="overflow-hidden w-full relative">
        {/* ✅ Track wrapper */}
        <div className="track">
          {frames.map((src, i) => (
            <div key={i} className="frame">
              <img src={src} className="img" />
              <div className="overlay" />
            </div>
          ))}

          {/* ✅ Second copy (continuation) */}
          {frames.map((src, i) => (
            <div key={`dup-${i}`} className="frame">
              <img src={src} className="img" />
              <div className="overlay" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: scroll 18s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .frame {
          position: relative;
          width: 200px;
          aspect-ratio: 4/3;
          background:hsl(var(--card));
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,.4);
          ring: 4px solid hsl(var(--border));
          flex-shrink: 0;
        }

        .img {
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
          opacity:.95;
        }

        .overlay {
          position:absolute;
          inset:8px;
          border:2px solid rgba(0,0,0,.2);
          border-radius:4px;
          pointer-events:none;
        }
      `}</style>
    </section>
  );
}

function toYouTubeEmbed(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) {
      // pathname may include parameters, so split by '/'
      id = u.pathname.slice(1).split("?")[0];
    } else if (u.searchParams.get("v")) {
      id = u.searchParams.get("v") || "";
    } else {
      const parts = u.pathname.split("/");
      id = parts.pop() || "";
    }
    if (!id) return null;
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;
  } catch {
    return null;
  }
}

function TrailerHolder({
  youtubeUrl = "",
  poster = "",
  title = "Festival Trailer",
  overlayTop = "OFFICIAL TRAILER",
  overlayBottom = "2026",
}: {
  youtubeUrl?: string;
  poster?: string;
  title?: string;
  overlayTop?: string;
  overlayBottom?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embed = toYouTubeEmbed(youtubeUrl);

  return (
    <figure className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border bg-background">
      {!playing && (
        <>
          {poster ? (
            <img
              src={poster}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}

          {/* Softer vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/60" />

          {/* Center overlay text & play */}
          <div className="absolute inset-0 grid place-items-center px-4">
            <div className="flex flex-col items-center gap-6 select-none">
              <div className="text-center leading-tight">
                <div className="text-white font-heading font-black uppercase tracking-[0.12em] text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                  {overlayTop}
                </div>
                <div className="mt-2 text-white font-heading font-black uppercase tracking-[0.18em] text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                  {overlayBottom}
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={() => setPlaying(true)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && setPlaying(true)
                }
                className="group relative inline-grid place-items-center h-16 w-16 sm:h-20 sm:w-20
                 rounded-full bg-white text-black shadow-xl focus:outline-none
                 transition-transform duration-200 hover:scale-105 active:scale-95"
                aria-label="Play trailer"
              >
                <span className="absolute inset-0 rounded-full shadow-[0_0_28px_rgba(255,255,255,0.35)] opacity-70" />
                <span className="pointer-events-none absolute h-full w-full rounded-full ring-2 ring-white/50 animate-ringPulse" />
                <span className="pointer-events-none absolute h-[130%] w-[130%] rounded-full ring-2 ring-white/20 animate-ringPulse delay-150" />
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="relative"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* corner sheen */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rotate-45 bg-accent/20 blur-2xl" />
        </>
      )}

      {playing && embed && (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embed}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
    </figure>
  );
}

/* ---------------------------------- */
/* Flip Timeline (vertical)           */
/* ---------------------------------- */
type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  venue: string;
  type?: string;
  date?: string;
  lang?: string;
  desc?: string;
};

const TIMELINE: TimelineEvent[] = [
  {
    id: "e1",
    time: "10:00 AM – 12:00 PM",
    title: "Debut Shorts: Kolkata",
    venue: "Nandan I",
    type: "Screening",
    date: "2026-01-10",
    lang: "Bengali / English",
    desc: "Emerging voices from Kolkata’s indie scene.",
  },
  {
    id: "e2",
    time: "12:30 PM – 02:00 PM",
    title: "Writing for Cinema",
    venue: "Gorky Sadan",
    type: "Workshop",
    date: "2026-01-10",
    lang: "English",
    desc: "Story structure, character arcs, and script polish.",
  },
  {
    id: "e3",
    time: "03:00 PM – 04:30 PM",
    title: "Ray’s Music in Film",
    venue: "Tapan Theatre",
    type: "Panel",
    date: "2026-01-10",
    lang: "Bengali",
    desc: "A deep dive into musical motifs and soundscapes in Ray’s cinema.",
  },
  {
    id: "e4",
    time: "06:30 PM – 08:30 PM",
    title: "Premiere: The Last Tram",
    venue: "Nandan II",
    type: "Screening",
    date: "2026-01-10",
    lang: "Bengali / English",
    desc: "A poignant story set against Kolkata’s twilight tramlines.",
  },
];

function EventFlipTimeline({ items }: { items: TimelineEvent[] }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".flip-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggle = (id: string) => setFlipped((m) => ({ ...m, [id]: !m[id] }));

  return (
    <section className="relative bg-[#F2F6F9] text-[#5b0101]">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight">
          Event Lineup
        </h2>

        <ul className="mt-6 space-y-4">
          {items.map((ev, idx) => {
            const isFlipped = !!flipped[ev.id];
            const dir = idx % 2 === 0 ? "from-right" : "from-left";
            return (
              <li key={ev.id}>
                <button
                  type="button"
                  onClick={() => toggle(ev.id)}
                  aria-expanded={isFlipped}
                  className={[
                    "flip-reveal",
                    dir === "from-right" ? "reveal-right" : "reveal-left",
                    "block w-full",
                  ].join(" ")}
                >
                  <div className="relative" style={{ perspective: "1200px" }}>
                    <div
                      className="relative w-full rounded-xl border 
                      border-primary-foreground/15 shadow-xl"
                      style={{
                        transformStyle: "preserve-3d",
                        transition:
                          "transform 600ms cubic-bezier(.21,.68,.18,1)",
                        transform: isFlipped
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      }}
                    >
                      {/* FRONT */}
                      <div
                        className="bg-[#720101] p-4 md:p-5 rounded-xl"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(0deg)",
                        }}
                      >
                        <div
                          className="text-sm font-extrabold tracking-[0.18em] 
                        uppercase text-primary-foreground/80"
                        >
                          {ev.type || "Event"}
                        </div>
                        <h3
                          className="mt-1 text-lg md:text-xl font-heading 
                        font-bold text-white leading-snug"
                        >
                          {ev.title}
                        </h3>
                        <div className="mt-1 text-sm text-primary-foreground/85">
                          {ev.time} •{" "}
                          <span className="font-semibold">{ev.venue}</span>
                          {ev.lang && (
                            <span className="text-primary-foreground/70">
                              {" "}
                              • {ev.lang}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 text-sm text-primary-foreground/70">
                          Click to flip for details
                        </div>
                      </div>

                      {/* BACK */}
                      <div
                        className="absolute inset-0 bg-primary p-4 md:p-5 rounded-xl"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        {ev.date && (
                          <div className="mt-3 text-sm uppercase tracking-wider text-primary-foreground/70">
                            {new Date(ev.date + "T00:00:00").toLocaleDateString(
                              undefined,
                              {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </div>
                        )}
                        <h3
                          className="mt-1 text-lg md:text-lg font-heading 
                        font-bold leading-snug"
                        >
                          {ev.title}
                        </h3>
                        <p className="mt-2 text-base text-primary-foreground/90 font-body">
                          {ev.desc ||
                            "More information will be announced soon."}
                        </p>

                        <div className="mt-4">
                          <span
                            className="inline-block rounded-md border 
                          border-primary-foreground/60 px-3 py-2 text-sm font-semibold text-primary-foreground/90"
                          >
                            Tap to flip back
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const Index = () => {
  // keep trailer props consistent across mobile/desktop instances
  const TRAILER = {
    youtubeUrl: "https://youtu.be/Tm_26UBOIXI?si=w4emguyPnqyFOJPe", // <— replace with your real link
    poster: "/trailer.png", // optional
    title: "Festival Trailer",
  };

  const [openMenu, setopenMenu] = useState(false);
  const navs = [
    { name: "About", to: "/about" },
    { name: "Rules", to: "/rules" },
    { name: "Jury", to: "/jury" },
    { name: "Register", to: "/register" },
    { name: "Contact Us", to: "#contact" },
  ];

  return (
    <div className="min-h-screen">
      <style>{`
  @keyframes filmMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes scanDownOnce { 0% { top:-110%; opacity:0; box-shadow:0 0 0px hsl(var(--primary)); } 10% { opacity:1; box-shadow:0 0 10px hsl(var(--primary)),0 0 20px hsl(var(--primary)); } 50% { box-shadow:0 0 15px hsl(var(--primary)),0 0 30px hsl(var(--primary)),0 0 45px hsl(var(--primary)); } 90% { opacity:1; box-shadow:0 0 10px hsl(var(--primary)),0 0 20px hsl(var(--primary)); } 100% { top:110%; opacity:0; box-shadow:0 0 0px hsl(var(--primary)); } }
  @keyframes electricPulse { 0% { box-shadow:0 0 0 0 hsl(var(--primary), .7); } 70% { box-shadow:0 0 0 10px rgba(95,21,21,0); } 100% { box-shadow:0 0 0 0 rgba(95,21,21,0); } }
  @keyframes electricGlow { 0%,100% { filter:brightness(1) drop-shadow(0 0 5px hsl(var(--primary))); } 50% { filter:brightness(1.2) drop-shadow(0 0 15px hsl(var(--primary))) drop-shadow(0 0 25px hsl(var(--primary))); } }
  .electric-scan{background:linear-gradient(90deg,transparent,hsl(var(--primary)),transparent);box-shadow:0 0 10px hsl(var(--primary)),0 0 20px hsl(var(--primary));}
  .electric-hover:hover{animation:electricPulse .6s ease-out;}
  .electric-active:active{animation:electricGlow .3s ease-out;}
  @keyframes ringPulse{0%{transform:scale(.6);opacity:.9;}70%{transform:scale(1);opacity:0;}100%{transform:scale(1);opacity:0;}}
  .animate-ringPulse{animation:ringPulse 1.7s ease-out infinite;}
  .delay-150{animation-delay:.15s;}
  .delay-300{animation-delay:.30s;}
  .animate-ping-slow{animation:ping 1.6s cubic-bezier(0,0,.2,1) infinite;}
  @keyframes slideInRight{0%{opacity:0;transform:translateX(40px) scale(.98);filter:blur(2px);}100%{opacity:1;transform:translateX(0) scale(1);filter:blur(0);}}
  @keyframes slideInLeft{0%{opacity:0;transform:translateX(-40px) scale(.98);filter:blur(2px);}100%{opacity:1;transform:translateX(0) scale(1);filter:blur(0);}}
  .flip-reveal{opacity:0;}
  .flip-reveal.in.reveal-right{animation:slideInRight 650ms cubic-bezier(.21,.68,.18,1) forwards;}
  .flip-reveal.in.reveal-left{animation:slideInLeft 650ms cubic-bezier(.21,.68,.18,1) forwards;}

  /* === Kolkata background (desktop) === */
  header.bg-primary, header[class*="bg-primary"] { position: relative; }
  header.bg-primary::before,
  header[class*="bg-primary"]::before{
    content:"";
    position:absolute;
    inset:0;
    background-image:url(${kolkataBg});
    background-repeat:no-repeat;
    background-position:left center;
    background-size:52%;
    opacity:.28;
    pointer-events:none;
    z-index:0;
  }
  header.bg-primary > *,
  header[class*="bg-primary"] > * { position:relative; z-index:1; }

  /* === Mobile: pulled FURTHER up, right under navbar === */
  @media (max-width: 768px){
    header.bg-primary::before,
    header[class*="bg-primary"]::before{
      top: 60px;
      height: calc(100% - 60px);
      background-position:left top;
      background-size:95%;
      opacity:.22;
    }
  }

  /* === Smaller CTA Button Override === */
  .hero-btn {
    padding: 5px 12px !important;
    font-size: 0.72rem !important;
    border-radius: 4px !important;
  }

  .hero-btn svg {
    width: 14px;
    height: 14px;
  }

  @media (max-width: 768px){
    .hero-btn {
      padding: 4px 10px !important;
      font-size: 0.68rem !important;
    }

    .hero-btn svg {
      width: 13px;
      height: 13px;
    }
  }

`}</style>

      <Navigation />
      {openMenu && (
        <div
          className="md:hidden bg-[#F2F6F9] flex flex-col items-center 
          justify-center gap-4 text-[#f3e3d5] text-base font-bold p-2 uppercase"
        >
          {navs.map((nav) => (
            <Link
              key={nav.name}
              to={nav.to}
              onClick={() => setopenMenu(false)}
              className="p-1"
            >
              {nav.name}
            </Link>
          ))}
          <div className="flex gap-6 p-2">
            <Link
              to="/"
              className="p-2 bg-accent text-accent-foreground rounded-xl"
            >
              Sign in
            </Link>
            <Link
              to="/"
              className="p-2 bg-accent text-accent-foreground rounded-xl"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
      <header className="bg-[#F2F6F9]">
        <div className="container mx-auto px-4 py-10 md:py-14">
          {/* 2-column hero: left CTAs, right trailer */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* LEFT COLUMN */}
            <div>
              <h1
                className="text-3xl md:text-6xl font-heading font-black 
              leading-tight tracking-tight text-[#2E3A44]"
              >
                CONSORTIUM OF FILM & CONTENT CREATORS FESTIVAL
                <span className="block text-2xl md:text-5xl text-[#c30101]">
                  LONDON CHAPTER
                </span>
              </h1>

              <p className="mt-4 text-[#2E3A44]/85 max-w-2xl text-sm md:text-base font-body">
                In today's interconnected world, storytelling is a bridge that
                unites diverse cultures and ideas. The London Film, Content
                Creators Festival & Award Ceremony 2026 celebrates the power of
                visual narratives, fostering creativity and collaboration across
                global borders. Our mission is to honor the art of filmmaking
                and digital content creation, showcasing exceptional talent and
                inspiring innovation in the creative industry.
              </p>

              {/* MOBILE-ONLY trailer above CTAs */}
              <div className="md:hidden mt-6">
                <TrailerHolder
                  youtubeUrl="https://youtu.be/Tm_26UBOIXI?si=w4emguyPnqyFOJPe"
                  poster="/trailer.png"
                  title="Festival Trailer"
                  overlayTop="OFFICIAL TRAILER"
                  overlayBottom="2026"
                />
              </div>

              {/* Venue + CTAs */}
              <div className="mt-8 flex flex-col items-start gap-4">
                <VenueBox />

                {/* CTA row */}
                <div className="flex flex-wrap items-start justify-start gap-3 mt-2">
                  {/* Register Now */}
                  <ScanButton
                    to="/register"
                    className="electric-hover bg-[#650901] text-[#F2F6F9]
              font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-150
              hover:-translate-y-0.5 border border-primary hover:bg-[#c30101]
              !h-11 !px-5 !py-0 !text-[0.95rem] !rounded-xl"
                  >
                    REGISTER NOW
                  </ScanButton>

                  {/* Adda Pass */}
                  <ScanButton
                    to="/visitor"
                    className="electric-hover bg-[#650901] text-[#F2F6F9]
              font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-150
              hover:-translate-y-0.5 border border-primary hover:bg-[#c30101]
              !h-11 !px-5 !py-0 !text-[0.95rem] !rounded-xl"
                  >
                    VISITORS' PASS
                  </ScanButton>

                  {/* force new line */}
                  <div className="w-full" />

                  {/* Previous editions */}
                  <a
                    href="https://cfccf.smartsociety.org/cannes/"
                    className="inline-flex items-center justify-center
              h-11 px-5 rounded-xl bg-accent
              text-accent-foreground font-semibold tracking-wide shadow-md hover:shadow-lg
              transition-all duration-150 hover:-translate-y-0.5 self-start border border-primary"
                  >
                    PREVIOUS EDITIONS
                  </a>
                </div>
              </div>
              {/* closes .mt-8 wrapper */}
            </div>
            {/* closes LEFT COLUMN */}

            {/* RIGHT COLUMN (desktop trailer) */}
            {/* RIGHT COLUMN (desktop trailer) */}
            <div className="hidden md:block md:mt-8">
              <TrailerHolder
                youtubeUrl="https://youtu.be/Tm_26UBOIXI?si=w4emguyPnqyFOJPe"
                poster="/trailer.png"
                title="Festival Trailer"
                overlayTop="TEASER"
                overlayBottom="2026"
              />
            </div>
          </div>
          {/* closes grid */}

          <HeroFilmReel frames={STRIP_IMAGES} />
        </div>
        {/* closes container */}
      </header>

      {/* Vertical flip timeline */}
      <EventFlipTimeline items={TIMELINE} />
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
