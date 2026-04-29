import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Sony() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Sony Xperia</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The OG developer-friendly brand. Just be ready to lose some camera magic.
        </p>
      </div>

      <BrandSpec
        difficulty="Medium"
        difficultyNote="Easy unlock, painful camera trade-off"
        rows={[
          { label: "Eligibility check", value: <>Dial <code>*#*#7378423#*#*</code> → Service Info → Configuration</> },
          { label: "Unlock method", value: <>Get unique code by email from <strong>Sony Developer site</strong> via IMEI</> },
          { label: "Apply unlock", value: <><code>fastboot oem unlock 0xUNLOCK_CODE</code> — the <code>0x</code> prefix is mandatory</> },
          { label: "vbmeta partitions", value: <>Just <code>vbmeta</code></> },
          { label: "Partition gotcha", value: <>Smaller dynamic partitions — try <code>delete-logical-partition product_a</code> if "image too large"</> },
          { label: "Brick recovery", value: <><strong>Xperifirm</strong> (download stock) + <strong>Newflasher</strong> (flash without Sony tool)</> },
          { label: "Permanent loss", value: <span className="text-red-600 dark:text-red-400 font-medium">DRM keys erased → X-Reality, Bravia HDR, Photo Pro features all degraded</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="tip" title="Sony has been good to modders for over a decade">
          Sony's official unlock website and the AOSP-based skin on Xperias make GSI flashing very approachable. Just be aware of two things: DRM keys and the camera processing.
        </Callout>

        <h3>Step 1 — Check unlock eligibility</h3>
        <ol>
          <li>On your phone, dial <code>*#*#7378423#*#*</code> (the "service info" code).</li>
          <li>Service Info → Configuration → Bootloader unlock allowed: <strong>Yes</strong> means you're good. <strong>No</strong> means your model/region isn't unlockable.</li>
          <li>While you're there, write down your IMEI. You'll need it.</li>
        </ol>

        <h3>Step 2 — Get the unlock code from Sony</h3>
        <ol>
          <li>Go to <a href="https://developer.sony.com/develop/open-devices/get-started/unlock-bootloader" target="_blank" rel="noreferrer">Sony's official unlock page</a>.</li>
          <li>Pick your model, enter your IMEI.</li>
          <li>Sony emails you a unique unlock code.</li>
        </ol>

        <h3>Step 3 — Use the code</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot oem unlock 0xUNLOCK_CODE_FROM_EMAIL`}
        />

        <Callout type="warning" title="The 0x prefix is mandatory">
          Sony's unlock code is a hexadecimal value, and fastboot only recognizes it as hex when it's prefixed with <code>0x</code>. So if Sony emails you the code <code>1A2B3C4D</code>, you must type it as <code>fastboot oem unlock 0x1A2B3C4D</code>. Drop the <code>0x</code> and the command fails silently with "FAILED (remote: 'flashing unlock failed')" or just hangs. This trips up most first-time Xperia flashers.
        </Callout>

        <p>Phone wipes and reboots. Walk through setup again.</p>

        <p>
          If you'd rather follow a fully illustrated bootloader unlock walkthrough first, my{" "}
          <a href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader" target="_blank" rel="noreferrer">
            Bootloader Unlock Guide
          </a>{" "}
          has the Sony method covered too.
        </p>

        <Callout type="warning" title="DRM keys and camera quality">
          Unlocking erases Sony's DRM keys permanently. This means: <strong>X-Reality engine</strong> (image enhancement), <strong>Bravia HDR</strong> processing, and the <strong>Photography Pro / Cinematography Pro</strong> camera apps lose key features. Camera goes from "great" to "okay". This is irreversible. Make peace with it before you unlock.
        </Callout>

        <h3>Step 4 — Flash the GSI</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="Xperia has a lighter A/B layout">
          Most modern Xperias are A/B but with smaller dynamic partitions than Pixel/OnePlus. If <code>fastboot flash system</code> fails with "image too large", try a slimmer GSI build (<code>vndklite</code> variant) or run <code>fastboot delete-logical-partition product_a</code> first.
        </Callout>

        <Callout type="tip" title="Xperifirm + Newflasher for stock recovery">
          The community tools <strong>Xperifirm</strong> (downloads stock firmware) and <strong>Newflasher</strong> (flashes it without Sony's official tool) are lifesavers if anything goes wrong. Both are free and very actively maintained. Keep a stock firmware <code>.zip</code> for your model on your computer just in case.
        </Callout>
      </div>
    </div>
  );
}
