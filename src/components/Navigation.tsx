import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/cfcc_logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LinkItem = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group relative inline-flex flex-col items-start justify-center",
          "font-sans text-base md:text-lg uppercase tracking-wide transition-transform duration-200",
          isActive ? "text-primary" : "text-foreground/90 hover:text-primary",
          "hover:-translate-y-0.5",
        ].join(" ")
      }
    >
      <span>{children}</span>
      <span
        className={[
          "pointer-events-none",
          "absolute -bottom-1 left-0 h-0.5 bg-current rounded",
          "w-0 group-hover:w-full transition-[width] duration-300 ease-out",
        ].join(" ")}
      />
    </NavLink>
  );

  // ✅ FIXED PROP TYPES (no TS errors)
  type ScanButtonProps = React.ComponentProps<typeof Button> & {
    className?: string;
    children: React.ReactNode;
  };

  const ScanButton: React.FC<ScanButtonProps> = ({
    children,
    className = "",
    ...props
  }) => {
    const [scanKey, setScanKey] = useState<number | null>(null);

    return (
      <Button
        variant="secondary"
        className={[
          "rounded-xl !py-2 !px-6",
          "transition-transform duration-300 hover:-translate-y-0.5",
          "focus-visible:ring-2 focus-visible:ring-primary/50",
          "relative overflow-hidden",
          "electric-hover electric-active",
          className,
        ].join(" ")}
        onMouseEnter={() => setScanKey((k) => (k === null ? 0 : k + 1))}
        onTouchStart={() => setScanKey((k) => (k === null ? 0 : k + 1))}
        {...props}
      >
        {scanKey !== null && (
          <span
            key={scanKey}
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 h-px electric-scan rounded-full"
            style={{
              top: 0,
              animation: "scanDownOnce 900ms ease-out forwards",
            }}
            onAnimationEnd={() => setScanKey(null)}
          />
        )}
        <span className="relative z-10 font-sans text-lg uppercase tracking-wider">
          {children}
        </span>
      </Button>
    );
  };

  return (
    <nav
      className={[
        "sticky top-0 z-50 bg-[#be1111] backdrop-blur border-b-4 border-primary",
        "transition-all duration-300",
        scrolled ? "shadow-lg" : "shadow-none",
      ].join(" ")}
    >
      <style>{`
        @keyframes scanDownOnce {
          0% { top: -110%; opacity: 0; box-shadow: 0 0 0px #8b4513; }
          10% { opacity: 1; box-shadow: 0 0 10px #8b4513, 0 0 20px #d18a45; }
          50% { box-shadow: 0 0 18px #8b4513, 0 0 30px #d18a45, 0 0 50px #8b4513; }
          90% { opacity: 1; box-shadow: 0 0 14px #8b4513, 0 0 25px #d18a45; }
          100% { top: 110%; opacity: 0; box-shadow: 0 0 0px #8b4513; }
        }

        @keyframes electricPulse {
          0% { box-shadow: 0 0 0 0 rgba(139, 69, 19, 0.8); }
          70% { box-shadow: 0 0 0 12px rgba(139, 69, 19, 0); }
          100% { box-shadow: 0 0 0 0 rgba(139, 69, 19, 0); }
        }

        @keyframes electricGlow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 8px #8b4513); }
          50% { filter: brightness(1.2) drop-shadow(0 0 20px #8b4513) drop-shadow(0 0 30px #d18a45); }
        }

        .electric-scan {
          background: linear-gradient(90deg, transparent, #8b4513, transparent);
          box-shadow: 0 0 15px #8b4513, 0 0 25px #d18a45;
        }

        .electric-hover:hover {
          animation: electricPulse 0.6s ease-out;
        }

        .electric-active:active {
          animation: electricGlow 0.3s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div
          className={[
            "flex items-center justify-between",
            "transition-all duration-300",
            scrolled ? "py-3" : "py-4",
          ].join(" ")}
        >
          <Link
            to="/"
            className="flex items-center gap-4 focus:outline-none focus:ring-2 
            focus:ring-primary/50 rounded-md"
          >
            <img
              src={logo}
              alt="IEM Film Fest Logo"
              className="h-10 w-10 md:h-16 md:w-16 transition-transform duration-200 hover:scale-105"
            />
            <div className="flex flex-col">
              <h2 className="text-lg md:text-xl font-sans uppercase leading-tight text-[#F2F6F9]">
                Consortium of Film and Content
              </h2>
              <h2 className="text-lg md:text-xl font-sans uppercase leading-tight text-[#F2F6F9]">
                Creators Festival 2026
              </h2>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden text-[#F2F6F9] lg:flex items-center gap-6">
            <LinkItem to="/">
              <p className="text-[#F2F6F9]">Home</p>
            </LinkItem>
            <LinkItem to="/about">
              <p className="text-[#F2F6F9]">About</p>
            </LinkItem>
            <LinkItem to="/rules">
              <p className="text-[#F2F6F9]">Rules</p>
            </LinkItem>
            <LinkItem to="/jury">
              <p className="text-[#F2F6F9]">Jury</p>
            </LinkItem>

            {/* Contact Us now scrolls properly */}
            <a
              href="#footer"
              className="group relative inline-flex flex-col items-start justify-center 
              font-sans text-base md:text-lg uppercase tracking-wide transition-transform 
              duration-200 text-[#F2F6F9]/90 hover:text-[#F2F6F9] hover:-translate-y-0.5"
            >
              <span>Contact Us</span>
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-current rounded w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
            </a>

            <Link to="/register">
              <ScanButton
                className="ml-2 bg-[#5b0101] text-[#F2F6F9] 
                hover:text-[#5b0101] hover:bg-[#F2F6F9]"
              >
                Join Festival
              </ScanButton>
            </Link>

            {user ? (
              <ScanButton
                className="bg-[#5b0101] text-[#F2F6F9] 
                hover:text-[#5b0101] hover:bg-[#F2F6F9]"
                onClick={handleLogout}
              >
                Logout
              </ScanButton>
            ) : (
              <Link to="/auth">
                <ScanButton className="bg-[#5b0101] text-[#F2F6F9]">
                  Sign In
                </ScanButton>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Menu className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={[
          "lg:hidden overflow-hidden border-t border-border transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0",
        ].join(" ")}
      >
        <div className="px-4 py-3 space-y-1">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/rules", label: "Rules" },
            { to: "/jury", label: "Jury" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  "block rounded-md px-3 py-2 text-base md:text-lg font-sans uppercase tracking-wide transition-colors",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-foreground/90 hover:bg-accent hover:text-primary",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <Link to="/register" onClick={() => setOpen(false)}>
              <ScanButton className="w-full">Join Festival</ScanButton>
            </Link>

            <a
              href="#footer"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-base md:text-lg font-sans uppercase tracking-wide text-foreground/90 hover:bg-accent hover:text-primary"
            >
              Contact Us
            </a>

            {user ? (
              <ScanButton onClick={handleLogout} className="w-full">
                Logout
              </ScanButton>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)}>
                <ScanButton className="w-full">Sign In</ScanButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
