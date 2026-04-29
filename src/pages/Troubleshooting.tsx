import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Callout } from "@/components/Callout";
import { Input } from "@/components/ui/input";
import {
  AlertOctagon,
  Battery,
  Bug,
  Camera,
  Cable,
  HardDrive,
  HelpCircle,
  Lock,
  RefreshCcw,
  Search,
  Wifi,
  Smartphone,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Severity = "critical" | "common" | "cosmetic";

interface Issue {
  id: string;
  title: string;
  severity: Severity;
  icon: React.ElementType;
  category: string;
  body: React.ReactNode;
  fix?: React.ReactNode;
}

const ISSUES: Issue[] = [
  {
    id: "bootloop",
    title: "Stuck on the boot logo / bootloop forever",
    severity: "critical",
    icon: RefreshCcw,
    category: "Boot Issues",
    body: (
      <>
        First boot can legitimately take 5–10 minutes — wait at least that long. The phone may even feel warm. That's normal.
      </>
    ),
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Wait the full 15 minutes before you do anything.</li>
        <li>Boot to recovery and do another <strong>factory wipe</strong>.</li>
        <li>Try the <code>vndklite</code> variant — it's the safest for read-only system devices.</li>
        <li>Try a different ROM as GSI (e.g. switch from PixelOS to AOSP, or vice versa).</li>
      </ul>
    ),
  },
  {
    id: "fastbootd",
    title: "fastbootd command not recognized",
    severity: "common",
    icon: Terminal,
    category: "Commands",
    body: (
      <>
        Your device probably runs Android 9 or older and doesn't have dynamic partitions.
      </>
    ),
    fix: (
      <p>
        Stay in regular fastboot mode and run the <code>fastboot flash system</code> command from there — it works the same way for non-dynamic devices.
      </p>
    ),
  },
  {
    id: "no-device",
    title: "fastboot devices shows nothing",
    severity: "common",
    icon: Cable,
    category: "Connection",
    body: <>Almost always a USB driver or cable issue, especially on Windows.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Install Google's <strong>Universal ADB Driver</strong> (or your phone brand's official driver).</li>
        <li>Switch to a different cable — confirm it's a <em>data</em> cable, not charge-only.</li>
        <li>Use a USB port directly on the back of your PC, not a hub or front panel.</li>
        <li>On Linux: add a udev rule, or run with <code>sudo</code>.</li>
        <li>On macOS: try <code>brew install android-platform-tools</code> and use that build.</li>
      </ul>
    ),
  },
  {
    id: "vbmeta",
    title: "Partition not found / Couldn't flash vbmeta",
    severity: "common",
    icon: HardDrive,
    category: "Flashing",
    body: <>Some devices split vbmeta into multiple partitions. Others don't have it at all.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Try <code>vbmeta_a</code>, <code>vbmeta_b</code>, <code>vbmeta_system</code>, <code>vbmeta_vendor</code>.</li>
        <li>If none exist, skip the vbmeta step entirely — go straight to flashing the GSI.</li>
        <li>Check the partition list with <code>fastboot getvar all</code> and look for anything containing "vbmeta".</li>
      </ul>
    ),
  },
  {
    id: "no-space",
    title: "Flash failed — 'no space left' / partition too small",
    severity: "common",
    icon: HardDrive,
    category: "Flashing",
    body: <>Your dynamic partition doesn't have enough free space for the GSI image.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Free up the unused product partition: <code>fastboot delete-logical-partition product_a</code> (or <code>product_b</code>).</li>
        <li>Try a smaller GSI variant — the <code>vndklite</code> builds are typically 30% smaller.</li>
        <li>Some devices also have an <code>odm</code> partition you can delete: <code>fastboot delete-logical-partition odm_a</code>.</li>
      </ul>
    ),
  },
  {
    id: "wifi-bt",
    title: "Wi-Fi / Bluetooth / mobile data not working",
    severity: "common",
    icon: Wifi,
    category: "After Boot",
    body: <>Very common on first boot of a fresh GSI. Usually a quick fix.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Do another factory wipe and reboot — fixes it about 60% of the time.</li>
        <li>Try a different GSI build for your architecture (often a different vendor patch helps).</li>
        <li>Search "<em>[your phone codename] GSI</em>" on XDA — your model may need a specific vendor patch.</li>
        <li>For mobile data: re-enter your APN settings manually after flashing.</li>
      </ul>
    ),
  },
  {
    id: "camera",
    title: "Camera, fingerprint, or face unlock broken",
    severity: "cosmetic",
    icon: Camera,
    category: "After Boot",
    body: <>GSIs are generic — they don't know about your phone's specific camera/sensor hardware.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Try installing an alternative camera app from the Play Store (e.g. Open Camera, GCam port).</li>
        <li>Search for a <strong>"vendor patch"</strong> for your specific phone on XDA — these often fix camera + fingerprint together.</li>
        <li>Sometimes you just have to live with reduced camera quality. This is the price of a clean GSI.</li>
      </ul>
    ),
  },
  {
    id: "banking",
    title: "Banking apps / Google Pay / BGMI refuse to open",
    severity: "common",
    icon: Lock,
    category: "After Boot",
    body: <>Those apps check for an unmodified system (SafetyNet / Play Integrity). After flashing a GSI you'll fail those checks.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Install <strong>Magisk</strong> + the <strong>Play Integrity Fix</strong> module via LSPosed.</li>
        <li>Try <strong>Universal SafetyNet Fix</strong> (older but still works for some apps).</li>
        <li>Some banks (Indian, Chinese, EU) are now strict enough that nothing reliably bypasses them. Worth knowing before flashing.</li>
        <li>BGMI / Free Fire have their own anti-cheat — you may get banned even with passing integrity checks.</li>
      </ul>
    ),
  },
  {
    id: "battery-drain",
    title: "Battery dies super fast after flashing",
    severity: "common",
    icon: Battery,
    category: "After Boot",
    body: <>First few days are always rough — the system is rebuilding caches and indexing storage.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Give it 2–3 full charge cycles before judging battery life.</li>
        <li>Check Settings → Battery → Battery usage to see if any specific app is hammering CPU.</li>
        <li>Disable any sensors that don't work (e.g. broken fingerprint draining battery trying to wake).</li>
        <li>If battery is still bad after a week, the GSI's kernel doesn't get along with your hardware — try another build.</li>
      </ul>
    ),
  },
  {
    id: "encrypted",
    title: "Won't boot past encryption / 'Decrypt now' loop",
    severity: "critical",
    icon: AlertOctagon,
    category: "Boot Issues",
    body: <>Your old userdata is encrypted with the old system's keys. The new GSI can't read it.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Boot to fastboot and run <code>fastboot -w</code> to wipe userdata.</li>
        <li>Or boot to recovery → Wipe → Format Data (not just factory reset).</li>
        <li>This will fix it. The cost: any data you didn't back up is gone.</li>
      </ul>
    ),
  },
  {
    id: "scared",
    title: "I'm scared, something is broken, please help",
    severity: "common",
    icon: HelpCircle,
    category: "General",
    body: <>Take a breath. Most "bricks" are recoverable. You're going to be okay.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Find your phone's <strong>stock firmware</strong> — search "[your model] stock firmware flash guide" on XDA.</li>
        <li>Most brands have a recovery tool: Samsung → Odin, Xiaomi → Mi Flash, Motorola → Rescue Tool, Sony → Newflasher.</li>
        <li>Hit me up on Telegram (link in the top bar). I'll help you figure it out.</li>
        <li>Don't keep flashing things in panic — that's how recoverable problems become real bricks.</li>
      </ul>
    ),
  },
];

const severityConfig: Record<Severity, { label: string; chipClass: string; iconClass: string; cardClass: string }> = {
  critical: {
    label: "Critical",
    chipClass: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    iconClass: "bg-red-500/15 text-red-600 dark:text-red-400",
    cardClass: "border-red-500/20 hover:border-red-500/40",
  },
  common: {
    label: "Common",
    chipClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    iconClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    cardClass: "border-amber-500/20 hover:border-amber-500/40",
  },
  cosmetic: {
    label: "Cosmetic",
    chipClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    iconClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    cardClass: "border-blue-500/20 hover:border-blue-500/40",
  },
};

export default function Troubleshooting() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Severity>("all");

  const filtered = ISSUES.filter((issue) => {
    const matchesSeverity = filter === "all" || issue.severity === filter;
    if (!matchesSeverity) return false;
    if (!query.trim()) return true;
    const haystack = (issue.title + " " + issue.category).toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Troubleshooting</h1>
        <p className="text-lg text-muted-foreground mt-2">
          When something goes sideways. (It happens. To everyone.)
        </p>
      </div>

      <Callout type="tip" title="Most problems aren't bricks">
        90% of "my phone is dead" panics turn out to be a stuck boot, a wrong slot, or a missing wipe. Read through the fixes below before you assume the worst — and definitely before you keep flashing things.
      </Callout>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by error message or symptom…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "critical", "common", "cosmetic"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 h-11 rounded-md text-sm font-medium border transition-colors capitalize",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-muted border-border text-foreground/70"
              )}
            >
              {f === "all" ? "All" : severityConfig[f].label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(severityConfig) as Severity[]).map((s) => {
          const count = ISSUES.filter((i) => i.severity === s).length;
          const conf = severityConfig[s];
          return (
            <Card key={s} className={cn("border-2", conf.cardClass)}>
              <CardContent className="p-4 text-center">
                <div className={cn("inline-flex text-xs font-bold px-2 py-0.5 rounded-full border mb-2", conf.chipClass)}>
                  {conf.label}
                </div>
                <div className="text-2xl font-extrabold">{count}</div>
                <div className="text-xs text-muted-foreground">issue{count !== 1 ? "s" : ""}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Issues list */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            <Bug className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <div className="font-medium">No issues match your search.</div>
            <div className="text-sm mt-1">Try a different keyword, or hit me up on Telegram for direct help.</div>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-3">
          {filtered.map((issue) => {
            const Icon = issue.icon;
            const conf = severityConfig[issue.severity];
            return (
              <AccordionItem
                key={issue.id}
                value={issue.id}
                className={cn(
                  "rounded-xl border-2 bg-card shadow-sm overflow-hidden transition-colors",
                  conf.cardClass,
                )}
              >
                <AccordionTrigger className="hover:no-underline px-5 py-4 [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-center gap-4 flex-1 min-w-0 text-left">
                    <div className={cn("h-10 w-10 shrink-0 rounded-lg flex items-center justify-center", conf.iconClass)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-base text-foreground truncate">{issue.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border", conf.chipClass)}>
                          {conf.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{issue.category}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="pl-14 space-y-4 text-sm text-foreground/80 leading-relaxed">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">What's happening</div>
                      <div>{issue.body}</div>
                    </div>
                    {issue.fix && (
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-primary mb-2">How to fix it</div>
                        <div className="text-foreground/90">{issue.fix}</div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}

      <Callout type="note" title="Still stuck?">
        If your specific issue isn't here, ping me on <a href="https://t.me/mkr_infinity" target="_blank" rel="noreferrer">Telegram (@mkr_infinity)</a> with: your phone model, the GSI name, and the exact error message. I usually reply within a day. <span className="inline-flex items-center gap-1"><Smartphone className="h-3 w-3" /> include a photo of the screen if you can</span>.
      </Callout>
    </div>
  );
}
