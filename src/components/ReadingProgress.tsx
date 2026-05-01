import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { SECTIONS } from "@/sections";

interface ReadingProgressProps {
  currentIndex: number;
}

const RADIUS = 22;
const STROKE = 3.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = (RADIUS + STROKE) * 2 + 2;

const GRAD_ID = "rp-grad";

export function ReadingProgress({ currentIndex }: ReadingProgressProps) {
  const total = SECTIONS.length;
  const pct = total > 1 ? currentIndex / (total - 1) : 1;

  const springPct = useSpring(pct, { stiffness: 120, damping: 20 });
  const [offset, setOffset] = useState(CIRCUMFERENCE * (1 - pct));
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    springPct.set(pct);
    const unsub = springPct.on("change", (v) => {
      setOffset(CIRCUMFERENCE * (1 - Math.max(0, Math.min(1, v))));
    });
    return unsub;
  }, [pct, springPct]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const current = SECTIONS[currentIndex];
  const groupName = current?.group ?? "";
  const label = current?.label ?? "";

  return (
    <motion.div
      className="fixed bottom-6 right-5 z-50 hidden lg:flex flex-col items-center gap-0 select-none"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="mb-2 px-3 py-1.5 rounded-xl bg-background/90 border border-border/60 shadow-lg backdrop-blur-sm max-w-[180px] text-center"
          >
            <p className="text-[9px] uppercase tracking-widest font-bold text-primary/70 leading-tight mb-0.5">
              {groupName}
            </p>
            <p className="text-xs font-semibold text-foreground leading-snug truncate">
              {label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ring badge */}
      <motion.div
        className="relative cursor-default"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-md"
          style={{
            background:
              "radial-gradient(circle, #34D399 0%, #0D9488 60%, transparent 100%)",
          }}
        />

        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="relative z-10 drop-shadow-md"
        >
          <defs>
            <linearGradient id={GRAD_ID} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>

          {/* Track ring */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-border/40"
          />

          {/* Progress ring */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={`url(#${GRAD_ID})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />

          {/* Background circle */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS - STROKE / 2 - 2}
            className="fill-background/90"
          />

          {/* Text: current / total */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-foreground"
            style={{ fontSize: 10, fontWeight: 700, fontFamily: "inherit" }}
          >
            {currentIndex + 1}
            <tspan
              style={{ fontSize: 7.5, fontWeight: 400, opacity: 0.5 }}
            >
              /{total}
            </tspan>
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
