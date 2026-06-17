import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Callout } from "@/components/Callout";
import { Input } from "@/components/ui/input";
import {
  AlertOctagon,
  Battery,
  Bluetooth,
  Bug,
  Camera,
  Cable,
  Fingerprint,
  HardDrive,
  Headphones,
  HelpCircle,
  MonitorUp,
  Layers,
  Lock,
  RefreshCcw,
  Search,
  ShieldOff,
  Wifi,
  Smartphone,
  Sun,
  Terminal,
  Volume2,
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
    id: "oem-unlock-missing",
    title: "OEM Unlocking is missing or greyed out",
    severity: "critical",
    icon: ShieldOff,
    category: "Bootloader",
    body: <>The device may be carrier-locked, region-locked, enterprise-managed, recently reset, or blocked by the OEM firmware.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Connect to the internet, set date/time automatically, and wait through any OEM anti-theft delay.</li>
        <li>Check exact model and region. Samsung US/Canada/carrier variants, Verizon Pixels, many Vivo/Oppo models, and some carrier Motorola devices often cannot unlock.</li>
        <li>If your OEM never exposes the toggle, stop. There is no safe generic GSI flashing path without an unlockable bootloader.</li>
      </ul>
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
    id: "super-partition",
    title: "super partition / dynamic partition errors",
    severity: "common",
    icon: Layers,
    category: "Flashing",
    body: <>Dynamic partition devices flash the GSI inside userspace fastbootd, not always in the bootloader screen.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Run <code>fastboot reboot fastboot</code> and confirm <code>fastboot getvar is-userspace</code> returns <code>yes</code>.</li>
        <li>Use the latest Android SDK Platform-Tools. Old fastboot builds misreport dynamic partitions.</li>
        <li>If the image is too large, delete only safe logical partitions such as <code>product</code>, <code>product_a</code>, or <code>product_b</code> when your device guide says it is safe.</li>
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
    id: "call-audio",
    title: "No sound during phone calls",
    severity: "common",
    icon: Volume2,
    category: "After Boot",
    body: <>TrebleDroid reports this as a common GSI audio-route issue, usually fixable from Phh settings.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Open Settings → Phh Treble Settings → Misc and try disabling <strong>A2DP offload</strong>, then reboot.</li>
        <li>If calls still have no audio, enable <strong>Disable "Voice Call In" route</strong> in Phh settings → Misc, then reboot.</li>
        <li>If your GSI does not include Phh settings, try a TrebleDroid/Phh-based build for testing.</li>
      </ul>
    ),
  },
  {
    id: "low-brightness",
    title: "Maximum brightness is too low",
    severity: "cosmetic",
    icon: Sun,
    category: "Display",
    body: <>Some vendors expose a different backlight scale than the generic system expects.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Enable <strong>alternate backlight scale</strong> in Phh settings.</li>
        <li>Enable <strong>linear brightness slider</strong> in Phh settings and reboot.</li>
        <li>On Qualcomm devices, TrebleDroid lists this command as another option: <code>adb shell setprop persist.sys.qcom-brightness $(cat /sys/class/leds/lcd-backlight/max_brightness)</code></li>
      </ul>
    ),
  },
  {
    id: "wired-headphones",
    title: "Wired headphones are not detected",
    severity: "common",
    icon: Headphones,
    category: "Audio",
    body: <>Jack detection can be vendor-specific and may not map cleanly to a generic system.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Enable <strong>alternative headphones detection</strong> in Phh settings and reboot.</li>
        <li>TrebleDroid also lists: <code>adb shell setprop persist.sys.overlay.devinputjack true</code></li>
        <li>If USB-C audio works but 3.5 mm does not, it is likely a vendor detection quirk.</li>
      </ul>
    ),
  },
  {
    id: "fingerprint-settings-crash",
    title: "Fingerprint settings crash when opened",
    severity: "common",
    icon: Fingerprint,
    category: "After Boot",
    body: <>TrebleDroid documents a Setup Wizard conflict that can crash the fingerprint enrollment screen.</>,
    fix: (
      <p>
        Go to Settings → Apps → Show system apps, then disable <code>com.google.android.setupwizard</code> / Android Setup. Reboot and open fingerprint settings again.
      </p>
    ),
  },
  {
    id: "fingerprint-missing",
    title: "Fingerprint sensor is not detected",
    severity: "common",
    icon: Fingerprint,
    category: "After Boot",
    body: <>Some sensors need Phh cleanup behavior disabled to stay visible on GSIs.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Try: <code>adb shell setprop persist.sys.phh.fingerprint.nocleanup true</code></li>
        <li>Reboot after setting it.</li>
        <li>If enrollment works but unlock fails, search your codename for a vendor fingerprint patch.</li>
      </ul>
    ),
  },
  {
    id: "refresh-rate",
    title: "90 Hz / 120 Hz refresh rate not working",
    severity: "cosmetic",
    icon: MonitorUp,
    category: "Display",
    body: <>High refresh modes often need an OEM display service or a Phh override.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Try <strong>force FPS / force refresh rate</strong> in Phh settings.</li>
        <li>On some Oppo/Realme/OnePlus devices, TrebleDroid lists <code>adb shell -c service call SurfaceFlinger 1035 i32 0</code>, but use it cautiously and only if your device thread confirms it.</li>
        <li>If the panel stays at 60 Hz, it may require an OEM framework feature the GSI does not include.</li>
      </ul>
    ),
  },
  {
    id: "bluetooth-drop",
    title: "Bluetooth connects then disconnects",
    severity: "common",
    icon: Bluetooth,
    category: "After Boot",
    body: <>Bluetooth audio offload can break on generic systems.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Disable <strong>A2DP offload</strong> in Phh settings, then reboot.</li>
        <li>Forget and re-pair the Bluetooth device after reboot.</li>
        <li>If SystemUI crashes when Bluetooth media starts, disable Settings → Sound & vibration → Media → <strong>Show media recommendations</strong>.</li>
      </ul>
    ),
  },
  {
    id: "aod",
    title: "Always-on display is missing",
    severity: "cosmetic",
    icon: Smartphone,
    category: "Display",
    body: <>AOD support depends on display/vendor features and is often hidden by default on GSIs.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Enable <strong>Force always on display</strong> in Phh settings → Misc.</li>
        <li>Reboot, then check lock screen display settings again.</li>
        <li>If your panel is not OLED, leave AOD off to avoid battery drain.</li>
      </ul>
    ),
  },
  {
    id: "restricted-networking",
    title: "Wi-Fi and mobile data connect but no internet",
    severity: "common",
    icon: Wifi,
    category: "After Boot",
    body: <>TrebleDroid documents Android restricted networking mode as one possible cause.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Run: <code>adb shell settings put global restricted_networking_mode 0</code></li>
        <li>Toggle airplane mode or reboot.</li>
        <li>If only mobile data is broken, re-enter APN settings manually.</li>
      </ul>
    ),
  },
  {
    id: "uncertified-device",
    title: "Play Store says device is not certified",
    severity: "common",
    icon: Lock,
    category: "After Boot",
    body: <>TrebleDroid FAQ lists Google Services Framework registration as a workaround for uncertified-device warnings.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Install an app that shows the Google Services Framework ID, such as Get ID from F-Droid.</li>
        <li>Register the GSF ID at <a href="https://www.google.com/android/uncertified/" target="_blank" rel="noreferrer">google.com/android/uncertified</a>.</li>
        <li>Reboot and wait. This does not guarantee Play Integrity or banking apps will pass.</li>
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
    title: "Banking apps / Wallet / games refuse to open",
    severity: "common",
    icon: Lock,
    category: "After Boot",
    body: <>Those apps check device integrity using Play Integrity and their own anti-tamper rules. After flashing a GSI, many devices fail at least one check.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Do not flash a GSI on a daily banking phone unless you accept losing wallet and banking access.</li>
        <li>Magisk modules change often and may stop working without warning. I do not recommend relying on bypasses for important payments.</li>
        <li>Some banks and games use hardware-backed or server-side checks that no generic fix can reliably bypass.</li>
        <li>Games with anti-cheat can ban modified devices even when Play Integrity appears to pass.</li>
      </ul>
    ),
  },
  {
    id: "volte-ims",
    title: "VoLTE / VoWiFi / carrier calling broken",
    severity: "common",
    icon: Smartphone,
    category: "After Boot",
    body: <>IMS, VoLTE, and VoWiFi depend on vendor blobs, carrier configs, and OEM framework pieces that a generic system may not include.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Check whether your GSI has IMS compatibility notes for your chipset or vendor.</li>
        <li>Try a GSI from the same Android generation as your stock vendor firmware.</li>
        <li>If your country requires VoLTE for calls, test with a spare SIM before daily use.</li>
      </ul>
    ),
  },
  {
    id: "invalid-sparse",
    title: "Invalid sparse file format warning",
    severity: "cosmetic",
    icon: Terminal,
    category: "Commands",
    body: <>Fastboot may print an "Invalid sparse file format at header magic" message before continuing to flash chunks.</>,
    fix: (
      <p>
        If the command continues and ends with <code>OKAY</code> / <code>Finished</code>, it is usually harmless. If it stops with <code>FAILED</code>, update platform-tools and re-download the GSI to rule out corruption.
      </p>
    ),
  },
  {
    id: "nvram-imei",
    title: "IMEI missing / baseband unknown after MTK flashing",
    severity: "critical",
    icon: AlertOctagon,
    category: "Flashing",
    body: <>MediaTek tools can erase NVRAM/NVDATA/calibration partitions if you use broad format options.</>,
    fix: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Never use SP Flash Tool <strong>Format All + Download</strong> unless you already backed up NVRAM/NVDATA and know how to restore IMEI legally.</li>
        <li>Prefer Download Only or firmware-specific restore instructions from your device thread.</li>
        <li>If it already happened, stop flashing and look for your exact model's NVRAM restore guide.</li>
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
                "px-4 h-11 rounded-none text-sm font-medium border transition-colors capitalize",
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
                <div className={cn("inline-flex text-xs font-bold px-2 py-0.5 rounded-none border mb-2", conf.chipClass)}>
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
                  "rounded-none border-2 bg-card shadow-sm overflow-hidden transition-colors",
                  conf.cardClass,
                )}
              >
                <AccordionTrigger className="hover:no-underline px-5 py-4 [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-center gap-4 flex-1 min-w-0 text-left">
                    <div className={cn("h-10 w-10 shrink-0 rounded-none flex items-center justify-center", conf.iconClass)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-base text-foreground truncate">{issue.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-none border", conf.chipClass)}>
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
