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
        rows={[
          { label: "Unlock method", value: <>Official <strong>Mi Unlock tool</strong> (Windows-only) after Mi Account binding</> },
          { label: "Wait time", value: <>168 hours (7 days) minimum, sometimes 30 days for newer models</> },
          { label: "Fastboot trigger", value: <><strong>Volume Down + Power</strong> from off — Mi Bunny screen</> },
          { label: "vbmeta partitions", value: <><code>vbmeta</code> + <code>vbmeta_system</code> + <code>vbmeta_vendor</code> (multi-partition)</> },
          { label: "Free space trick", value: <><code>fastboot delete-logical-partition product_a</code> often required</> },
          { label: "Brick recovery", value: <><strong>EDL Mode</strong> + Mi Flash Tool (cable trick or test point)</> },
          { label: "Watch out for", value: <span className="text-amber-600 dark:text-amber-400 font-medium">Anti-Rollback (ARB) — never flash an older firmware</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="warning" title="The 7-day waiting game">
          Xiaomi makes you wait 7–30 days after requesting bootloader unlock before they actually let you do it. There's no way around it. Plan ahead.
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
          Xiaomi devices are very recoverable thanks to <strong>EDL mode</strong> (Emergency Download Mode). If your phone won't boot at all, you can usually re-flash stock firmware via Mi Flash Tool while in EDL mode. Search "[your model] EDL flash" for the cable trick.
        </p>
      </div>
    </div>
  );
}
