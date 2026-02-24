import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TypewriterOptions {
  text: string | string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfter?: number;
  pauseBefore?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  onDone?: () => void;
  /**
   * When false (default: true) the animation is gated — it won't start until
   * this flips to true. Use this to delay typing until e.g. an intro video ends.
   */
  started?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Core hook  –  useTypewriter
// ─────────────────────────────────────────────────────────────────────────────

export function useTypewriter({
  text,
  typeSpeed = 60,
  deleteSpeed = 40,
  pauseAfter = 1800,
  pauseBefore = 500,
  loop = false,
  started = true,
  onDone,
}: TypewriterOptions): { displayed: string; done: boolean } {
  const strings = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  // Refs so the effect closure always sees the latest values without re-running
  const indexRef = useRef(0); // which string in the array
  const charRef = useRef(0); // character position within current string
  const deletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Gate: do nothing until `started` is true
    if (!started) return;

    let cancelled = false;

    function tick() {
      if (cancelled) return;

      const current = strings[indexRef.current];
      const isDeleting = deletingRef.current;

      if (!isDeleting) {
        // ── Typing forward ────────────────────────────────────────────────
        if (charRef.current < current.length) {
          charRef.current += 1;
          setDisplayed(current.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, typeSpeed);
        } else {
          // Finished typing this string
          if (!loop && indexRef.current === strings.length - 1) {
            // Single-pass last string → we're done
            setDone(true);
            onDone?.();
            return;
          }
          // Pause, then decide what to do next
          timerRef.current = setTimeout(() => {
            if (strings.length > 1) {
              // Multiple strings: delete before moving on
              deletingRef.current = true;
            } else {
              // Single string loop: restart from zero
              charRef.current = 0;
            }
            tick();
          }, pauseAfter);
        }
      } else {
        // ── Deleting ──────────────────────────────────────────────────────
        if (charRef.current > 0) {
          charRef.current -= 1;
          setDisplayed(current.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, deleteSpeed);
        } else {
          // Finished deleting → advance to next string
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % strings.length;
          timerRef.current = setTimeout(tick, pauseBefore);
        }
      }
    }

    timerRef.current = setTimeout(tick, pauseBefore);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return { displayed, done };
}

// ─────────────────────────────────────────────────────────────────────────────
//  Typewriter component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A drop-in React component that renders a typewriter animation.
 *
 * @example
 * // Single string
 * <Typewriter text="Welcome to the festival." />
 *
 * @example
 * // Cycling through multiple strings
 * <Typewriter
 *   text={["Lights.", "Camera.", "Action!"]}
 *   loop
 *   typeSpeed={80}
 *   className="text-4xl font-black text-primary"
 * />
 */
export function Typewriter({
  text,
  typeSpeed = 60,
  deleteSpeed = 40,
  pauseAfter = 1800,
  pauseBefore = 500,
  loop = false,
  cursor = true,
  cursorChar = "|",
  started = true,
  onDone,
  className = "",
  style,
}: TypewriterOptions & {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { displayed, done } = useTypewriter({
    text,
    typeSpeed,
    deleteSpeed,
    pauseAfter,
    pauseBefore,
    loop,
    started,
    onDone,
  });

  return (
    <span
      className={className}
      style={style}
      aria-label={Array.isArray(text) ? text.join(" / ") : text}
    >
      <span aria-hidden="true">{displayed}</span>
      {cursor && (
        <span
          aria-hidden="true"
          className="typewriter-cursor"
          style={{
            display: "inline-block",
            marginLeft: "1px",
            animation:
              done && !loop
                ? "none"
                : "typewriter-blink 1s step-start infinite",
            opacity: done && !loop ? 0 : 1,
          }}
        >
          {cursorChar}
        </span>
      )}

      {/* Scoped keyframe — injected once, won't clash with global styles */}
      <style>{`
        @keyframes typewriter-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

export default Typewriter;
