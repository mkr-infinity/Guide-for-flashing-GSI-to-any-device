import { Heart, Coffee, Star, Github, ExternalLink, Gem, Send, Sparkles } from "lucide-react";

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

      <div className="relative overflow-hidden bg-card border border-border rounded-none p-8 sm:p-10 shadow-sm flex flex-col items-center text-center space-y-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-sky-500" />
        <div className="h-16 w-16 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-none flex items-center justify-center border border-rose-500/20">
          <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
        </div>

        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">Thanks for being here</h2>
          <p className="text-muted-foreground">
            Every coffee, GitHub star, NFT, crypto tip, and Telegram message helps keep this guide alive. If it saved you from a bootloop, your support tells me to keep testing, fixing, and writing better device notes.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 w-full max-w-2xl text-left">
          <div className="border border-border bg-background/50 p-4">
            <Coffee className="h-5 w-5 text-amber-500 mb-2" />
            <div className="font-bold text-sm">Tip if it helped</div>
            <p className="text-xs text-muted-foreground mt-1">Small donations cover hosting, test devices, and time.</p>
          </div>
          <div className="border border-border bg-background/50 p-4">
            <Gem className="h-5 w-5 text-fuchsia-500 mb-2" />
            <div className="font-bold text-sm">NFTs welcome</div>
            <p className="text-xs text-muted-foreground mt-1">Prefer collectibles or crypto? Use the support hub.</p>
          </div>
          <div className="border border-border bg-background/50 p-4">
            <Send className="h-5 w-5 text-sky-500 mb-2" />
            <div className="font-bold text-sm">Message me</div>
            <p className="text-xs text-muted-foreground mt-1">A Telegram thank-you or success photo also means a lot.</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Buy Me a Coffee — primary, beautiful */}
        <a
          href="https://buymeacoffee.com/mkr_infinity"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-none p-6 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 bg-white/20 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-none bg-white/30 backdrop-blur flex items-center justify-center shadow-inner border border-white/30">
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
              One-tap tip via card, PayPal, or Apple/Google Pay. Even a tiny coffee helps me keep improving the guide.
            </p>
          </div>
        </a>

        {/* Support page (donations hub) */}
        <a
          href="https://supportmkr.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-none p-6 bg-gradient-to-br from-fuchsia-600 via-rose-500 to-orange-500 shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 bg-white/20 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-none bg-white/25 backdrop-blur flex items-center justify-center shadow-inner border border-white/30">
              <Gem className="h-6 w-6 text-white" strokeWidth={2.3} />
            </div>
            <ExternalLink className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
          </div>
          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">
              NFTs + crypto
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1">Send NFT or Crypto</h3>
            <p className="text-sm text-white/90 font-medium leading-snug">
              Want to send an NFT, crypto, UPI, or another method? The support hub keeps all current options in one place.
            </p>
          </div>
        </a>

        {/* GitHub star */}
        <a
          href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-none p-6 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-700/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 bg-white/5 blur-2xl" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-none bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
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
              A free star helps the guide reach more Android users before they brick something. Takes one click.
            </p>
          </div>
        </a>

        {/* Telegram / community */}
        <a
          href="https://t.me/mkr_infinity"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-none p-6 bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="absolute -right-8 -top-8 h-32 w-32 bg-white/20 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-none bg-white/25 backdrop-blur flex items-center justify-center shadow-inner border border-white/30">
              <Send className="h-6 w-6 text-white" strokeWidth={2.4} />
            </div>
            <ExternalLink className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
          </div>
          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">
              Free support
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1">Start on Telegram</h3>
            <p className="text-sm text-white/90 font-medium leading-snug">
              Send a thank-you, success screenshot, or device feedback. Real reports make the guide better for everyone.
            </p>
          </div>
        </a>
      </div>

      <div className="border border-primary/25 bg-primary/5 p-5 flex gap-3 text-sm text-foreground/90">
        <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p>
          If you cannot donate, starring the repo and sharing useful device feedback is still real support. It helps more users find safer GSI instructions.
        </p>
      </div>

      <div className="text-center text-sm text-muted-foreground pt-2">
        — Kaif (@mkr-infinity)
      </div>
    </div>
  );
}
