const devices = [
  ["Lenovo TB-X306X", "arm64 A/B", "Maintainer test device", "Main guide baseline; verify vbmeta from matching stock firmware."],
  ["Google Pixel 6-9", "arm64 A/B", "Good", "Use current platform-tools and a modern GSI close to stock vendor Android."],
  ["Motorola G/Edge unlocked retail", "arm64 A/B", "Good", "Official unlock portal decides by IMEI/model; carrier variants may be blocked."],
  ["Nothing Phone (1/2/2a)", "arm64 A/B", "Good", "Keep stock vendor firmware current; Glyph UI controls are lost on GSI."],
  ["Samsung US/Canada Galaxy", "varies", "Blocked", "U/U1/W/carrier variants commonly lack OEM Unlocking."],
  ["Xiaomi HyperOS devices", "arm64 A/B", "Mixed", "Mi Unlock waits, account quotas, ARB, and EDL auth vary by region/model."],
  ["Sony Xperia IV US variants", "arm64 A/B", "Mixed", "Sony lists some US Xperia IV variants as not bootloader-unlockable."],
  ["Vivo / iQOO retail", "varies", "Mostly blocked", "No official unlock for most retail models."],
];

export default function KnownDevices() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Reference</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Known Device Notes</h1>
        <p className="text-lg text-muted-foreground mt-2">Not a compatibility guarantee. This is a living table for quick triage as of June 17, 2026.</p>
      </div>
      <div className="overflow-x-auto border border-border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-sidebar text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="border-b border-border p-3">Device / family</th>
              <th className="border-b border-border p-3">Likely GSI</th>
              <th className="border-b border-border p-3">Status</th>
              <th className="border-b border-border p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(([device, gsi, status, notes]) => (
              <tr key={device} className="border-b border-border/60 last:border-0">
                <td className="p-3 font-semibold">{device}</td>
                <td className="p-3 font-mono text-xs text-primary">{gsi}</td>
                <td className="p-3 font-bold">{status}</td>
                <td className="p-3 text-muted-foreground">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground">Send device reports with model, codename, stock firmware, GSI filename, and exact commands so this table can grow safely.</p>
    </div>
  );
}
