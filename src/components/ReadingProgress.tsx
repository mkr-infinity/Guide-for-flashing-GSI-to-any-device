import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
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
  const [offset, setOffset] = useState(() => {
    const v = CIRCUMFERENCE * (1 - pct);
    return Number.isFinite(v) ? v : CIRCUMFERENCE;
  });
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const current = SECTIONS[currentIndex];
  const groupName = current?.group ?? "";
  const label = current?.label ?? "";
  const currentGroup = current?.group ?? "";
  const topics = SECTIONS.filter((section) => section.group === currentGroup);

  useEffect(() => {
    springPct.set(pct);
    const unsub = springPct.on("change", (v) => {
      if (!Number.isFinite(v)) return;
      setOffset(CIRCUMFERENCE * (1 - Math.max(0, Math.min(1, v))));
    });
    return unsub;
  }, [pct, springPct]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-5 z-50 hidden lg:flex flex-col items-end gap-2 select-none"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
      ref={menuRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {(open || hovered) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-[260px] rounded-2xl border border-border/70 bg-background/92 shadow-2xl backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border/60 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary/70">Jump to topic</p>
              <p className="text-sm font-semibold text-foreground truncate">{currentGroup}</p>
            </div>
            <div className="max-h-[280px] overflow-y-auto p-2 space-y-1">
              {topics.map((section) => {
                const active = section.path === current?.path;
                return (
                  <Link
                    key={section.id}
                    href={section.path}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-foreground/80 hover:text-foreground",
                    ].join(" ")}
                  >
                    <span className="truncate">{section.label}</span>
                    {section.numberLabel ? (
                      <span className="shrink-0 text-[10px] rounded-full px-2 py-0.5 bg-foreground/5 text-foreground/60">
                        {section.numberLabel}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Open topic jump menu"
        className="relative cursor-pointer outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setOpen((v) => !v)}
      >
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-md"
          style={{
            background:
              "radial-gradient(circle, #34D399 0%, #0D9488 60%, transparent 100%)",
          }}
        />

        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="relative z-10 drop-shadow-md">
          <defs>
            <linearGradient id={GRAD_ID} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-border/40"
          />
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
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS - STROKE / 2 - 2}
            className="fill-background/90"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-foreground"
            style={{ fontSize: 10, fontWeight: 700, fontFamily: "inherit" }}
          >
            {currentIndex + 1}
            <tspan style={{ fontSize: 7.5, fontWeight: 400, opacity: 0.5 }}>
              /{total}
            </tspan>
          </text>
        </svg>
        <div className="absolute -bottom-1 -right-1 rounded-full bg-background border border-border shadow-md p-0.5 text-primary">
          {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </motion.button>
    </motion.div>
  );
}
