import { useEffect, useMemo, useRef, useState } from "react";

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const src = useMemo(
    () => (isMobile ? "/load_mobile.mp4" : "/load.mp4"),
    [isMobile],
  );

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const skipTimer = setTimeout(() => setShowSkip(true), 4000);
    const safety = setTimeout(() => hideLoader(), 12000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(safety);
    };
  }, []);

  const hideLoader = () => {
    const el = document.getElementById("loader-root");
    if (!el) return setVisible(false);

    el.style.transition = "opacity .6s ease";
    el.style.opacity = "0";
    setTimeout(() => setVisible(false), 650);
  };

  if (!visible) return null;

  return (
    <div
      id="loader-root"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{ opacity: 1 }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={hideLoader}
        onError={hideLoader}
        className="w-full h-full object-cover"
      />

      {showSkip && (
        <button
          onClick={hideLoader}
          className="
            group
            absolute bottom-8 left-1/2 -translate-x-1/2
            text-[10px] md:text-xs uppercase tracking-widest
            text-foreground/90 font-medium
            px-5 py-[6px] md:px-6 md:py-2
            rounded-full border border-border
            bg-accent backdrop-blur-md
            shadow-[0_4px_20px_rgba(0,0,0,0.4)]
            hover:bg-accent/80 hover:border-primary
            transition-all duration-300
            animate-[fadeInUp_400ms_ease-out]
            flex items-center gap-1.5
          "
        >
          Skip Intro
          {/* ✅ Minimal arrow */}
          <span
            className="
              inline-block text-foreground/90
              transition-transform duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </button>
      )}

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translate(-50%,10px); }
          100% { opacity: 1; transform: translate(-50%,0); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
