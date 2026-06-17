import { ExternalLink } from "lucide-react";

const tools = [
  ["Android SDK Platform-Tools", "Latest adb/fastboot. Use this before debugging any command issue.", "https://developer.android.com/tools/releases/platform-tools"],
  ["Google Android Flash Tool", "Fast stock restore for supported Pixel devices.", "https://flash.android.com/"],
  ["Sony Bootloader Unlock", "Official Xperia unlock code generator and current device eligibility notes.", "https://developer.sony.com/develop/open-devices/get-started/unlock-bootloader"],
  ["Motorola Bootloader Unlock", "Official Motorola IMEI/model eligibility portal.", "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a"],
  ["Mi Unlock", "Official Xiaomi unlock path; HyperOS-era waits and quotas may apply.", "https://en.miui.com/unlock/"],
  ["TrebleDroid", "Current home for Phh/Treble GSI notes after the old Phh wiki archive.", "https://github.com/TrebleDroid/treble_experimentations/wiki"],
  ["mtkclient", "MediaTek flash/repair utility; latest release line is active as of June 2026.", "https://github.com/bkerler/mtkclient"],
  ["XDA Forums", "Best place for exact model threads, firmware quirks, and recovery packages.", "https://xdaforums.com/"],
];

export default function Tools() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Reference</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Downloads & Tools</h1>
        <p className="text-lg text-muted-foreground mt-2">Use official links first. Mirrors and random APKs are where many bricks start.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map(([name, desc, href]) => (
          <a key={name} href={href} target="_blank" rel="noreferrer" className="group border border-border bg-card p-5 no-underline transition-colors hover:border-primary/50">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="m-0 text-lg font-bold text-foreground">{name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </div>
          </a>
        ))}
      </div>
      <div className="border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200">
        Last checked: June 17, 2026. Tool policies change; always re-check your exact device thread before flashing.
      </div>
    </div>
  );
}
