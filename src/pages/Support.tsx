import { Heart, Coffee, Star, Github, ExternalLink } from "lucide-react";

export default function Support() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Help &amp; About</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Support My Work</h1>
        <p className="text-lg text-muted-foreground mt-2">
          If this guide saved your phone — or your sanity — consider showing some love.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col items-center text-center space-y-6">
        <div className="h-16 w-16 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
          <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
        </div>

        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-2">Thanks for being here</h2>
          <p className="text-muted-foreground">
            Every coffee, star, and kind message keeps me writing more of these guides. Pick whichever way feels right — they all make my day.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Buy Me a Coffee — primary, beautiful */}
        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-xl bg-white/30 backdrop-blur flex items-center justify-center shadow-inner">
              <Coffee className="h-6 w-6 text-amber-900" strokeWidth={2.5} />
            </div>
            <ExternalLink className="h-4 w-4 text-amber-900/60 group-hover:text-amber-900 transition-colors" />
          </div>
          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-900/70 mb-1">
              Recommended
            </div>
            <h3 className="text-xl font-extrabold text-amber-950 mb-1">Buy Me a Coffee</h3>
            <p className="text-sm text-amber-950/80 font-medium leading-snug">
              One-tap tip via card, PayPal, or Apple/Google Pay. Even ₹100 / $1 means a lot.
            </p>
          </div>
        </a>

        {/* Support page (donations hub) */}
        <a
          href="https://supportmkr.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-xl bg-white/25 backdrop-blur flex items-center justify-center shadow-inner">
              <Heart className="h-6 w-6 text-white fill-white" strokeWidth={2} />
            </div>
            <ExternalLink className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
          </div>
          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">
              All methods
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1">Support Hub</h3>
            <p className="text-sm text-white/90 font-medium leading-snug">
              UPI, crypto, GitHub Sponsors and more — all the ways to support in one place.
            </p>
          </div>
        </a>

        {/* GitHub star */}
        <a
          href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-700/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" strokeWidth={1.5} />
            </div>
            <Github className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
              Costs nothing
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1">Star on GitHub</h3>
            <p className="text-sm text-zinc-300 font-medium leading-snug">
              A free star helps the guide reach more people who need it. Takes one click.
            </p>
          </div>
        </a>

        {/* Telegram / community */}
        <a
          href="https://t.me/mkr_infinity"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-xl bg-white/25 backdrop-blur flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
            </div>
            <ExternalLink className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
          </div>
          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">
              Free &amp; quick
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1">Say Hi on Telegram</h3>
            <p className="text-sm text-white/90 font-medium leading-snug">
              Send a screenshot of your bricked-then-fixed phone. Honestly the best reward.
            </p>
          </div>
        </a>
      </div>

      <div className="text-center text-sm text-muted-foreground pt-2">
        — Kaif (@mkr-infinity)
      </div>
    </div>
  );
}
