import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function TopProgressBar() {
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(0, { stiffness: 180, damping: 28, mass: 0.5 });
  const scaleX = useTransform(springProgress, (v) => v / 100);
  const dotLeft = useTransform(springProgress, (v) => `${v}%`);
  const dotOpacity = useTransform(springProgress, (v) =>
    v > 1 && v < 99.5 ? 1 : 0
  );

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(pct);
      springProgress.set(pct);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [springProgress]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-border/15" />
      <motion.div
        className="absolute inset-y-0 left-0 right-0 origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, #34D399 0%, #10B981 35%, #0D9488 65%, #818CF8 100%)",
          boxShadow: "0 0 8px 1px rgba(16,185,129,0.4)",
        }}
      />
      <motion.div
        className="absolute top-1/2 w-[9px] h-[9px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: dotLeft,
          opacity: dotOpacity,
          background: "#34D399",
          boxShadow: "0 0 10px 4px rgba(52,211,153,0.65)",
        }}
      />
    </div>
  );
}
