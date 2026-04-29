import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Pixel() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Google Pixel</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The reference device. Easiest GSI experience you'll ever have.
        </p>
      </div>

      <BrandSpec
        difficulty="Easy"
        difficultyNote="The gold standard"
        rows={[
          { label: "Unlock method", value: <>Single command: <code>fastboot flashing unlock</code></> },
          { label: "vbmeta needed?", value: <>Often <strong>not required</strong> — Pixels accept GSIs directly</> },
          { label: "Flash command", value: <>Plain <code>fastboot flash system GSI.img</code> in fastbootd — no slot tricks</> },
          { label: "Pixel 6+ (Tensor)", value: <>Needs Android 13+ A/B GSI — older builds won't boot</> },
          { label: "Re-locking", value: <span className="text-emerald-600 dark:text-emerald-400 font-medium">YES — can re-lock after restoring stock (rare among brands)</span> },
          { label: "Brick recovery", value: <>Google's <strong>Android Flash Tool</strong> (web-based) restores stock in one click</> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="tip" title="Pixels are the gold standard">
          Pixels are literally the devices Google designs GSIs against. Bootloader unlock is one command, the partitions are clean, fastbootd works perfectly, and you can re-lock the bootloader later if you want. This is as easy as it gets.
        </Callout>

        <h3>Step 1 — Enable OEM unlock</h3>
        <p>
          Settings → About phone → tap Build number 7 times. Then Settings → System → Developer options → turn on <strong>OEM unlocking</strong>. (Make sure you're connected to the internet — Google checks server-side that your account isn't carrier-locked.)
        </p>

        <h3>Step 2 — Unlock the bootloader</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot flashing unlock`}
        />
        <p>
          Use Volume keys to highlight "Unlock the bootloader" and Power to confirm. Phone wipes and reboots.
        </p>

        <h3>Step 3 — Flash the GSI</h3>
        <p>
          On Pixels you usually don't even need vbmeta — they accept GSIs directly. But it doesn't hurt to flash it:
        </p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="Pixel 6 / 7 / 8 / 9 and Tensor specifics">
          Tensor-based Pixels (Pixel 6 onward) need slightly newer GSIs (Android 13+ A/B layout). Make sure your GSI is built for Android 13 or higher — older GSIs may not boot.
        </Callout>

        <Callout type="tip" title="You can re-lock after">
          Unlike most other brands, Pixels let you re-lock the bootloader once you're back on stock firmware (<code>fastboot flashing lock</code>). Useful if you ever want to sell or fully restore the device. Note: re-locking with a non-stock system bricks the device, so only do it after flashing back stock.
        </Callout>
      </div>
    </div>
  );
}
