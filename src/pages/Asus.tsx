import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Asus() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Asus · ROG Phone · Zenfone</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Beefy hardware, near-stock Android, and (mostly) friendly to modders.
        </p>
      </div>

      <BrandSpec
        difficulty="Medium"
        difficultyNote="Older models easy, newer models stuck"
        lastUpdated="June 17, 2026"
        rows={[
          { label: "Unlock method", value: <>Older models used the <strong>Asus Unlock Device App</strong>; verify your exact support page first</> },
          { label: "Newer models", value: <span className="text-red-600 dark:text-red-400 font-medium">Unlock app availability has been inconsistent since 2023; do not assume ROG/Zenfone 8+ can unlock</span> },
          { label: "Tencent China models", value: <span className="text-red-600 dark:text-red-400 font-medium">Locked permanently — no unlock path</span> },
          { label: "vbmeta partitions", value: <><code>vbmeta</code> + <code>vbmeta_system</code> on ROG 5+</> },
          { label: "Brick recovery", value: <>Raw <code>.zip</code> firmware on Asus support page → flash via fastboot</> },
          { label: "What you lose", value: <span className="text-amber-600 dark:text-amber-400 font-medium">AirTrigger UI, AeroActive cooler integration, X Mode</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none">
        <Callout type="warning" title="The Asus unlock app got pulled">
          Asus used to ship an "Unlock Device App" on model support pages. Since 2023 its availability has been inconsistent, especially for newer ROG Phone and Zenfone models. If your support page and XDA thread do not show a working unlock method for your exact variant, treat it as locked.
        </Callout>

        <h3>Step 1 — Get the Unlock App (older models only)</h3>
        <ol>
          <li>Go to your model's support page on <a href="https://www.asus.com/support/" target="_blank" rel="noreferrer">Asus Support</a>.</li>
          <li>Look in the Driver &amp; Tools section for <strong>"Unlock Device App"</strong>. If it's not there, your model isn't officially unlockable.</li>
          <li>Install the APK on your phone. Open it, agree to the warranty warning, tap unlock.</li>
          <li>Phone wipes and reboots with the bootloader unlocked.</li>
        </ol>

        <p>
          For the full unlock walkthrough, including the older "Unlock app" method, see my{" "}
          <a href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader" target="_blank" rel="noreferrer">
            Bootloader Unlock Guide
          </a>
          .
        </p>

        <h3>Step 2 — Flash the GSI</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot --disable-verity --disable-verification flash vbmeta_system vbmeta_system.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="ROG-specific features get disabled">
          The AirTrigger touch buttons, the AeroActive cooler integration, the X Mode performance toggle — those are all part of ROG UI. After flashing a GSI you lose them. The actual hardware still works, you just don't get the special UIs. Most gamers prefer to stay on stock for this reason.
        </Callout>

        <Callout type="tip" title="Asus publishes raw firmware">
          One thing Asus does really well: they publish raw <code>.zip</code> firmware on their support pages, and you can flash it back via fastboot or recovery without weird tools. So even if you brick, recovery is just a download away.
        </Callout>

        <Callout type="warning" title="Tencent Edition (China-only models)">
          The Chinese Tencent versions of ROG Phone usually have locked bootloaders with no unlock path. If you imported one, you're probably stuck on stock. Sorry.
        </Callout>
      </div>
    </div>
  );
}
