import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Xiaomi() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Xiaomi · Redmi · POCO</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The MIUI escape route. Welcome, friend.
        </p>
      </div>

      <BrandSpec
        difficulty="Medium"
        difficultyNote="Wait 7-30 days for unlock"
        lastUpdated="June 17, 2026"
        rows={[
          { label: "Unlock method", value: <>Official <strong>Mi Unlock tool</strong> (Windows-only) after Mi Account binding</> },
          { label: "Wait time", value: <>168 hours is common, but HyperOS-era accounts and regions can see longer waits or stricter quotas</> },
          { label: "Fastboot trigger", value: <><strong>Volume Down + Power</strong> from off — Mi Bunny screen</> },
          { label: "vbmeta partitions", value: <><code>vbmeta</code> + <code>vbmeta_system</code> + <code>vbmeta_vendor</code> (multi-partition)</> },
          { label: "Free space trick", value: <><code>fastboot delete-logical-partition product_a</code> often required</> },
          { label: "Brick recovery", value: <><strong>Mi Flash Tool</strong>; newer EDL restores may require an authorized Xiaomi account</> },
          { label: "Watch out for", value: <span className="text-amber-600 dark:text-amber-400 font-medium">Anti-Rollback (ARB) — never flash an older firmware</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none">
        <Callout type="warning" title="The 7-day waiting game">
          Xiaomi makes you wait after requesting bootloader unlock, and HyperOS-era policies can be stricter by account age, region, quota, and model. If Mi Unlock says to wait or rejects your account, do not trust random bypass APKs.
        </Callout>

        <h3>Step 1 — Get an unlock token from Xiaomi</h3>
        <ol>
          <li>Sign in to <a href="https://en.miui.com/unlock/" target="_blank" rel="noreferrer">en.miui.com/unlock</a> with the Mi Account that's <strong>already signed in on your phone</strong>.</li>
          <li>Download the official <strong>Mi Unlock</strong> tool (Windows only). Sad, I know.</li>
          <li>Bind the device — Settings → Developer options → Mi Unlock status → Add account and device.</li>
          <li>Wait. Mi Unlock will tell you "168 hours left" or similar. Once that countdown ends you can unlock.</li>
        </ol>

        <h3>Step 2 — Boot into Mi fastboot</h3>
        <p>
          Power off, then hold <strong>Volume Down + Power</strong>. You'll see the "Mi Bunny holding a phone with FASTBOOT" screen. Run Mi Unlock with the phone connected to actually unlock.
        </p>

        <Callout type="note" title="Phone wipes itself">
          Unlocking erases everything, then reboots. Set it back up (skip Mi Account during setup, it's faster).
        </Callout>

        <h3>Step 3 — Flash vbmeta &amp; GSI (standard process)</h3>
        <p>
          From here, you're in normal fastboot land. Boot to bootloader and run:
        </p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot --disable-verity --disable-verification flash vbmeta_system vbmeta_system.img
fastboot --disable-verity --disable-verification flash vbmeta_vendor vbmeta_vendor.img
fastboot reboot fastboot
fastboot delete-logical-partition product_a
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="tip" title="Multiple vbmeta partitions">
          Many Xiaomi/Redmi devices (especially POCO F-series and Redmi Note 10+) have <code>vbmeta_system</code> and <code>vbmeta_vendor</code> in addition to plain <code>vbmeta</code>. If you get a "partition not found" error, just skip whichever one doesn't exist — it's not a problem.
        </Callout>

        <Callout type="warning" title="Anti-rollback (ARB) protection">
          Some Xiaomi models bump an "anti-rollback" version number with each firmware update. If your stock firmware's ARB is higher than the GSI you're flashing, you'll be permanently stuck on a higher firmware. Check the ARB level for your model on XDA before downgrading anything.
        </Callout>

        <h3>If something goes wrong</h3>
        <p>
          Xiaomi devices are recoverable with stock fastboot firmware when the bootloader still responds. EDL mode can restore deeper bricks, but many newer models require an authorized Xiaomi account, so do not rely on EDL as a guaranteed safety net.
        </p>
      </div>
    </div>
  );
}
