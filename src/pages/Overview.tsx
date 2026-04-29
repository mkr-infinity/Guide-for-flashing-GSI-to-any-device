import { Card, CardContent } from "@/components/ui/card";
import { Hourglass, Clock, Monitor, Cable, Smile, Pizza } from "lucide-react";
import heroFlash from "@/assets/hero-flash.png";

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-8 md:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white mb-6 backdrop-blur-sm">
            Read Before Starting
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Flash Any GSI on Android
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium">
            Hey! I made this guide because flashing a GSI sounded scary the first time I did it too. So I broke it down into tiny, friendly steps — with pictures — so you can do it without bricking your daily driver. Works on most Project Treble devices: Samsung, Xiaomi, Oppo, Realme, OnePlus, Vivo, Pixel, Motorola, you name it.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero illustration */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-md">
        <img src={heroFlash} alt="Android flashing illustration" className="w-full h-auto block" />
      </div>

      {/* Survival Kit */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">My Survival Kit</h2>
        <p className="text-muted-foreground mb-4">Get these ready before you start. I promise it makes the whole thing 10x less stressful.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { Icon: Hourglass, title: "Patience", desc: "Don't rush. Seriously." },
            { Icon: Clock, title: "20–30 Mins", desc: "Of free, uninterrupted time" },
            { Icon: Monitor, title: "A Computer", desc: "Windows, Mac, or Linux" },
            { Icon: Cable, title: "USB Cable", desc: "A real data cable, not the cheap one" },
            { Icon: Smile, title: "Calm Nerves", desc: "It will look stuck. Don't touch it." },
            { Icon: Pizza, title: "A Snack", desc: "For the long flashing wait" },
          ].map(({ Icon, title, desc }) => (
            <Card key={title} className="bg-card">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Icon className="h-8 w-8 text-primary" />
                <div className="font-semibold">{title}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What You'll Do */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">What We'll Do Together</h2>
        <Card>
          <CardContent className="p-6">
            <ol className="space-y-4 m-0 text-muted-foreground list-decimal pl-4">
              <li><strong className="text-foreground">Check your phone is supported</strong> — not every device can run a GSI, so we'll verify first.</li>
              <li><strong className="text-foreground">Pick the right GSI file</strong> — the file names look like alien code; I'll help you decode them.</li>
              <li><strong className="text-foreground">Boot to the bootloader</strong> — get your phone ready to listen to your computer.</li>
              <li><strong className="text-foreground">Flash vbmeta</strong> — turn off Android's "no custom stuff" alarm.</li>
              <li><strong className="text-foreground">Flash the GSI</strong> — the actual main moment. Pretty anticlimactic honestly.</li>
              <li><strong className="text-foreground">Wipe & reboot</strong> — clear out the old data and boot into your shiny new ROM.</li>
            </ol>
            <p className="text-sm mt-6 text-muted-foreground">Got a Samsung, Xiaomi, Oppo, Vivo, Motorola or Pixel? After the main steps I have a separate page for each brand with the quirks you need to know.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
