import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Nothing() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Nothing Phone</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Pretty hardware. Surprisingly developer-friendly software.
        </p>
      </div>

      <BrandSpec
        difficulty="Easy"
        difficultyNote="Pixel-tier developer-friendliness"
        rows={[
          { label: "Unlock method", value: <>Single command: <code>fastboot flashing unlock</code></> },
          { label: "OEM Unlock toggle", value: <>Standard Developer Options → OEM Unlocking</> },
          { label: "vbmeta partitions", value: <><code>vbmeta</code> only — straightforward</> },
          { label: "Flash command", value: <>Standard fastbootd flow — no special tricks</> },
          { label: "Brick recovery", value: <>Stock firmware available on Nothing's official support page</> },
          { label: "What you lose", value: <span className="text-amber-600 dark:text-amber-400 font-medium">Glyph customization UI (lights still work but can't fine-tune)</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="tip" title="Nothing is one of the good ones">
          Nothing officially supports bootloader unlocking, publishes their kernel sources, and treats modders well. The whole process feels closer to Pixel than to Samsung.
        </Callout>

        <h3>Step 1 — Unlock the bootloader</h3>
        <p>
          Settings → About phone → tap Build number 7 times. Then Settings → System → Developer options → enable <strong>OEM unlocking</strong>.
        </p>
        <p>Then from your computer:</p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot flashing unlock`}
        />
        <p>
          Use volume keys to highlight "Unlock the bootloader" and press power to confirm. Phone wipes and reboots. First boot takes a couple of minutes.
        </p>

        <p>
          Need a step-by-step? See my{" "}
          <a href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader" target="_blank" rel="noreferrer">
            Bootloader Unlock Guide
          </a>
          .
        </p>

        <h3>Step 2 — Flash the GSI</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="You'll lose Glyph customisation">
          The Glyph interface and Nothing OS-specific features (the dot-matrix UI, custom widgets) live inside Nothing OS. After flashing a GSI those go away. The lights still work for calls/charging via system notifications, but you lose the fine-grained control. Worth knowing.
        </Callout>

        <Callout type="tip" title="Phone (1) / (2) / (2a) firmware is on Nothing's site">
          If anything goes wrong, Nothing publishes stock firmware on their official support page. Recovery is straightforward — flash via fastboot, no shady tools needed.
        </Callout>
      </div>
    </div>
  );
}
