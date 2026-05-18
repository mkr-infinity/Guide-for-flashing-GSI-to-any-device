import { Suspense, useEffect, useState } from "react";
import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sidebar } from "@/components/Sidebar";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TopProgressBar } from "@/components/TopProgressBar";
import { Coffee, Bug } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "./sections";

function NotFoundFallback() {
  const Overview = SECTIONS[0].component;
  return <Overview />;
}

export default function App() {
  return (
    <Router hook={useHashLocation}>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [location, setLocation] = useHashLocation();
  const [isCollapsed, setIsCollapsedState] = useState<boolean>(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") === "true";
    } catch {
      return false;
    }
  });

  const setIsCollapsed = (v: boolean) => {
    setIsCollapsedState(v);
    try {
      localStorage.setItem("sidebar-collapsed", String(v));
    } catch {
      // ignore
    }
  };

  const idx = SECTIONS.findIndex((s) => s.path === location);
  const currentIndex = idx === -1 ? 0 : idx;
  const currentSection = SECTIONS[currentIndex];
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection =
    currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-[100dvh] flex w-full bg-background text-foreground">
      <TopProgressBar />
      <ReadingProgress currentIndex={currentIndex} />

      <Sidebar
        activePath={location}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div
        className={[
          "flex-1 flex flex-col min-w-0 transition-[margin] duration-300",
          isCollapsed ? "lg:ml-14" : "lg:ml-72",
        ].join(" ")}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm shadow-black/5">
          <div className="flex h-14 items-center pl-16 pr-4 md:px-6 gap-4 justify-between">
            <div className="flex flex-col truncate min-w-0">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80">
                {currentSection?.group}
              </span>
              <span className="text-sm font-semibold truncate mt-0.5">
                {currentSection?.label}
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              <a
                href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device/issues/new?title=%5BMistake%5D+&body=**Page%3A**+%28paste+the+page+name+or+URL%29%0A%0A**What%27s+wrong%3F**%0A%0A%0A**Suggested+fix%3A**%0A%0A%0A_Thanks+for+helping+improve+the+guide%21_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Report a mistake or issue on GitHub"
                title="Report a mistake or issue"
                className="hidden md:inline-flex group items-center gap-2 h-9 px-3.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300
                  text-red-700 dark:text-red-400 
                  bg-red-500/10 hover:bg-red-500/20 
                  border border-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]"
              >
                <Bug className="h-4 w-4 text-red-600 dark:text-red-500 group-hover:rotate-12 transition-transform duration-300" />
                <span className="opacity-90 group-hover:opacity-100">Report Bug</span>
              </a>
              <a
                href="https://buymeacoffee.com/mkr_infinity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Support me"
                className="group relative inline-flex items-center justify-center gap-2 h-9 px-5 rounded-lg text-[11px] font-extrabold uppercase tracking-widest transition-all duration-500
                  text-yellow-950 dark:text-yellow-950
                  bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300
                  shadow-md shadow-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden ring-1 ring-yellow-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Coffee className="h-4 w-4 text-yellow-950 relative z-10 animate-pulse group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 hidden sm:inline">Buy me a coffee</span>
                <span className="relative z-10 sm:hidden">Donate</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 w-full">
          <div className="w-full max-w-4xl mx-auto px-5 sm:px-6 lg:px-12 py-8 md:py-12 flex flex-col min-h-[calc(100dvh-3.5rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <Suspense
                  fallback={
                    <div className="h-full flex items-center justify-center text-muted-foreground py-24">
                      Loading...
                    </div>
                  }
                >
                  <Switch>
                    {SECTIONS.map((section) => (
                      <Route
                        key={section.id}
                        path={section.path}
                        component={section.component}
                      />
                    ))}
                    <Route path="*" component={NotFoundFallback} />
                  </Switch>
                </Suspense>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Navigation */}
            <div className="mt-20 flex flex-col sm:flex-row justify-between gap-4 pb-12">
              {prevSection ? (
                <button
                  type="button"
                  onClick={() => setLocation(prevSection.path)}
                  className="group relative w-full sm:w-auto sm:flex-1 max-w-[280px] text-left rounded-xl border border-border/60 bg-sidebar/30 px-6 py-5 transition-all hover:bg-sidebar hover:border-border hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 transition-colors group-hover:text-foreground/70">
                    ← Previous
                  </span>
                  <span className="block font-semibold text-base truncate text-foreground/90 group-hover:text-foreground transition-colors">
                    {prevSection.label}
                  </span>
                </button>
              ) : (
                <div className="hidden sm:block flex-1 max-w-[280px]" />
              )}

              {nextSection && (
                <button
                  type="button"
                  onClick={() => setLocation(nextSection.path)}
                  className="group relative w-full sm:w-auto sm:flex-1 max-w-[280px] sm:ml-auto text-right rounded-xl border border-border/60 bg-sidebar/30 px-6 py-5 transition-all hover:bg-sidebar hover:border-border hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
                >
                   <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 transition-colors group-hover:text-primary/70">
                    Next →
                  </span>
                  <span className="block font-semibold text-base truncate text-primary group-hover:text-primary transition-colors">
                    {nextSection.label}
                  </span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
