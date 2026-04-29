import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Motorola() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Motorola</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Honestly one of the friendliest brands for GSI flashing.
        </p>
      </div>

      <BrandSpec
        difficulty="Easy"
        difficultyNote="Best brand for first-time flashers"
        rows={[
          { label: "Unlock method", value: <>Get unique unlock key by email from Motorola's official site</> },
          { label: "Get device ID", value: <><code>fastboot oem get_unlock_data</code> → paste on Motorola site</> },
          { label: "Apply unlock", value: <><code>fastboot oem unlock UNIQUE_KEY_FROM_EMAIL</code></> },
          { label: "Critical unlock", value: <>Some models also need <code>fastboot flashing unlock_critical</code></> },
          { label: "vbmeta partitions", value: <>Just <code>vbmeta</code> — clean and simple</> },
          { label: "Brick recovery", value: <><strong>Motorola Rescue Tool</strong> + lolinet firmware = unbrickable</> },
          { label: "Watch out for", value: <span className="text-amber-600 dark:text-amber-400 font-medium">US carrier-locked models (Verizon) often can't unlock</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="tip" title="Why I love Motorola for this">
          Motorola officially supports bootloader unlocking on most models, near-stock Android means GSIs run super well, and there's no warranty drama like Samsung Knox. If you're new to flashing, this is one of the best brands to start on.
        </Callout>

        <h3>Step 1 — Get an unlock code from Motorola</h3>
        <ol>
          <li>Boot to bootloader: <code>adb reboot bootloader</code></li>
          <li>Get your device ID: <code>fastboot oem get_unlock_data</code></li>
          <li>Copy the long output (remove spaces and newlines so it's one big string).</li>
          <li>Go to <a href="https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a" target="_blank" rel="noreferrer">Motorola's official unlock page</a>.</li>
          <li>Sign in, paste the ID, agree to the warning, and they email you a unique unlock key.</li>
        </ol>

        <h3>Step 2 — Use the unlock key</h3>
        <CodeBlock code="fastboot oem unlock UNIQUE_KEY_FROM_EMAIL" />
        <p>Phone wipes and reboots. Set it back up.</p>

        <h3>Step 3 — Flash the GSI (standard process)</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="A/B partition layout">
          Most Motorola phones from the Moto G7 era onward are A/B devices. The <code>fastboot flash system</code> command flashes the currently active slot automatically — you don't need to specify <code>system_a</code> or <code>system_b</code>.
        </Callout>

        <Callout type="warning" title="Some models lock down later">
          A few US carrier-locked Motorola models (Verizon, mostly) cannot be unlocked at all. Check Motorola's site — if it says your IMEI isn't eligible, sadly you're out of luck.
        </Callout>

        <Callout type="tip" title="Stock firmware is easy to recover">
          Motorola publishes stock firmware (search "lolinet motorola firmware") and the Motorola Rescue tool can re-flash a borked phone. So even if you mess up, recovery is straightforward. Less stress, more flashing.
        </Callout>
      </div>
    </div>
  );
}
