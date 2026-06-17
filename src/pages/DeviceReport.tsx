import { CodeBlock } from "@/components/CodeBlock";

const template = `Device model:
Codename:
Region / carrier:
Chipset:
Stock firmware Android version:
Security patch:
GSI name / Android version:
GSI file name:
Treble Check result:
Bootloader unlock method:
Commands used:
What works:
What is broken:
Recovery method tested:
Notes / source link:`;

export default function DeviceReport() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Reference</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Device Report Template</h1>
        <p className="text-lg text-muted-foreground mt-2">Copy this when reporting a working device, broken step, or missing brand warning.</p>
      </div>
      <CodeBlock code={template} language="text" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Be exact", "SM-S918B and SM-S918U are not the same device for bootloader purposes."],
          ["Include failures", "A failed command is useful data when the exact output is included."],
          ["Add sources", "XDA thread, official unlock page, firmware page, or maintainer note."],
        ].map(([title, text]) => (
          <div key={title} className="border border-border bg-card p-4">
            <h2 className="text-base font-bold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
      <a href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device/issues/new" target="_blank" rel="noreferrer" className="inline-flex border border-primary bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground no-underline">
        Open GitHub Issue
      </a>
    </div>
  );
}
