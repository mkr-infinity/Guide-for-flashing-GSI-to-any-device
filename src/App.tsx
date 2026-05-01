import { Suspense, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sidebar } from "@/components/Sidebar";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Heart, Bug } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "./sections";

function NotFoundFallback() {
  const Overview = SECTIONS[0].component;
  return <Overview />;
}

export default function App() {
  const [location, setLocation] = useLocation();
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
      <ReadingProgress />

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
        <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center pl-16 pr-4 md:px-6 gap-4 justify-between">
            <div className="flex flex-col truncate min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                {currentSection?.group}
              </span>
              <span className="text-sm font-medium truncate">
                {currentSection?.label}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device/issues/new?title=%5BMistake%5D+&body=**Page%3A**+%28paste+the+page+name+or+URL%29%0A%0A**What%27s+wrong%3F**%0A%0A%0A**Suggested+fix%3A**%0A%0A%0A_Thanks+for+helping+improve+the+guide%21_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Report a mistake or issue on GitHub"
                title="Report a mistake or issue"
                className="hidden md:inline-flex group items-center gap-2 h-9 px-3.5 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground bg-muted/40 hover:bg-muted border border-border/60 hover:border-border transition-all"
              >
                <Bug className="h-4 w-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                <span>Report a mistake</span>
              </a>
              <a
                href="https://supportmkr.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Support me"
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 h-9 px-3 sm:px-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/40 hover:scale-[1.04] active:scale-[0.97] transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Heart className="h-4 w-4 fill-white relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10 hidden sm:inline">Support Me</span>
                <span className="relative z-10 sm:hidden">Support</span>
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
            <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 pb-4">
              {prevSection ? (
                <button
                  type="button"
                  onClick={() => setLocation(prevSection.path)}
                  className="group w-full sm:w-auto sm:max-w-[calc(50%-0.5rem)] text-left rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:bg-accent hover-elevate"
                >
                  <span className="block text-xs text-muted-foreground font-normal mb-1">
                    ← Previous
                  </span>
                  <span className="block font-semibold text-sm sm:text-base truncate">
                    {prevSection.label}
                  </span>
                </button>
              ) : (
                <div className="hidden sm:block flex-1" />
              )}

              {nextSection && (
                <button
                  type="button"
                  onClick={() => setLocation(nextSection.path)}
                  className="group w-full sm:w-auto sm:ml-auto sm:max-w-[calc(50%-0.5rem)] text-right rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:bg-accent hover-elevate"
                >
                  <span className="block text-xs text-muted-foreground font-normal mb-1">
                    Next →
                  </span>
                  <span className="block font-semibold text-sm sm:text-base text-primary truncate">
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
