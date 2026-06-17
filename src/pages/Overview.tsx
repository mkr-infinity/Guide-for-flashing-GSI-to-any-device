import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { AlertTriangle, Cable, CheckCircle2, Clock, Cpu, Download, HardDrive, Shield, Smartphone } from "lucide-react";
import heroFlash from "@/assets/hero-flash.png";

export default function Overview() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden border border-emerald-400/30 bg-zinc-950 text-white shadow-xl">
        <img src={heroFlash} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-45 blur-[2px] scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,0.92)_0%,rgba(6,78,59,0.76)_48%,rgba(2,6,23,0.58)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(52,211,153,0.28),transparent_34%),radial-gradient(circle_at_12%_88%,rgba(20,184,166,0.22),transparent_32%)]" />
        <div className="absolute right-0 top-0 h-full w-1/3 border-l border-white/10 bg-white/[0.04] backdrop-blur-[1px]" />
        <div className="relative z-10 grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-emerald-300/40 bg-emerald-300/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-50 shadow-sm shadow-emerald-950/30">
              <Shield className="h-3.5 w-3.5" />
              Read before flashing
            </div>
            <h1 className="max-w-2xl text-4xl font-black tracking-tight md:text-6xl">
              Flash a GSI without guessing.
            </h1>
            <p className="mt-5 max-w-2xl border-l-2 border-emerald-300/60 bg-black/20 px-4 py-3 text-base font-medium leading-relaxed text-white/88 md:text-lg">
              A practical, brand-aware guide for Project Treble devices. It covers bootloader unlocks, vbmeta, fastbootd, dynamic partitions, recovery methods, and the mistakes that usually cause bootloops.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/prerequisites" className="inline-flex items-center justify-center gap-2 border border-emerald-300 bg-emerald-300 px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-emerald-950 transition-colors hover:bg-emerald-200">
                Start safely
              </Link>
              <Link href="/troubleshooting" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-white/15">
                I am stuck
              </Link>
            </div>
          </div>
          <div className="grid content-end gap-3">
            {[
              { label: "First rule", value: "Exact model first" },
              { label: "Critical step", value: "Unlock officially" },
              { label: "Main risk", value: "Wrong GSI or vbmeta" },
            ].map((item) => (
              <div key={item.label} className="border border-white/20 bg-black/30 p-4 shadow-sm shadow-black/20 backdrop-blur-[2px]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/80">{item.label}</div>
                <div className="mt-1 text-lg font-black">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Pre-Flash Reality Check</h2>
        <p className="text-muted-foreground mb-4">If any of these fail, stop and fix that first. A GSI is only safe when the basics are confirmed.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { Icon: CheckCircle2, title: "Treble OK", desc: "Use Treble Check first" },
            { Icon: Shield, title: "Unlocked", desc: "OEM unlock is confirmed" },
            { Icon: Cpu, title: "Right GSI", desc: "arm64 / A/B / VNDK match" },
            { Icon: HardDrive, title: "Stock Backup", desc: "Firmware ready before risk" },
            { Icon: Cable, title: "Data Cable", desc: "No charge-only cables" },
            { Icon: Clock, title: "30+ Minutes", desc: "No rushing, no panic" },
          ].map(({ Icon, title, desc }) => (
            <Card key={title} className="bg-card border-border">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Icon className="h-8 w-8 text-primary" />
                <div className="font-semibold">{title}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
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

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { Icon: Download, title: "Use current platform-tools", text: "Old fastboot builds cause false partition and fastbootd errors." },
            { Icon: Smartphone, title: "Exact model matters", text: "Carrier, region, chipset, and firmware can change the unlock path." },
            { Icon: AlertTriangle, title: "Daily drivers are risky", text: "Banking, camera, VoLTE, and fingerprint can break on a generic system." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="border border-border bg-card p-5">
              <Icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="m-0 text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
