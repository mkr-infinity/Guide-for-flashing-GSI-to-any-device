import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Oppo() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Oppo · Realme · OnePlus</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Same parent company (BBK), same quirks. Mostly.
        </p>
      </div>

      <BrandSpec
        difficulty="Medium"
        difficultyNote="Varies wildly by sub-brand"
        rows={[
          { label: "OnePlus unlock", value: <><code>fastboot oem unlock</code> (older) or <code>fastboot flashing unlock</code> (OnePlus 8+)</> },
          { label: "Realme unlock", value: <><strong>Deep Testing app</strong> from realme.com — wait for approval</> },
          { label: "Oppo unlock", value: <span className="text-red-600 dark:text-red-400 font-medium">Mostly NOT supported — only old Find X2/X3 era</span> },
          { label: "vbmeta partitions", value: <><code>vbmeta</code> alone usually — OnePlus 9+ adds <code>vbmeta_system</code></> },
          { label: "Free space trick", value: <><code>fastboot delete-logical-partition product_a</code> for ColorOS 13+</> },
          { label: "Brick recovery (OP)", value: <><strong>MSMDownloadTool</strong> (XDA leaks) — full EDL restore</> },
          { label: "Brick recovery (Realme)", value: <>Realme UI flash via QFIL / EDL — find on community sites</> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="warning" title="Bootloader unlock support varies">
          <strong>OnePlus</strong> phones are usually fully unlockable from Developer Options. <strong>Realme</strong> requires their "In-Depth Test" app to apply for unlock. <strong>Oppo</strong> mostly does <em>not</em> allow official bootloader unlocking — only a handful of older Oppo models (like Find X2/X3) let you do it. Check XDA for your specific model first.
        </Callout>

        <h3>OnePlus (the easy one)</h3>
        <ol>
          <li>Settings → About → tap Build number 7 times to enable Developer options.</li>
          <li>Developer options → enable <strong>OEM unlocking</strong> + <strong>Advanced reboot</strong>.</li>
          <li>Run <code>adb reboot bootloader</code>, then <code>fastboot oem unlock</code> (or <code>fastboot flashing unlock</code> on newer models).</li>
          <li>Confirm with Volume Up. Phone wipes and reboots.</li>
        </ol>

        <h3>Realme (the medium one)</h3>
        <ol>
          <li>Install the official <strong>Deep Testing</strong> (In-Depth Test) app from realme.com.</li>
          <li>Apply for "deep testing" inside the app. You'll wait a few days for approval.</li>
          <li>Once approved, the app gives you an unlock button. Phone wipes and reboots into a "Deep Testing" version of Realme UI.</li>
          <li>From there it behaves like a regular bootloader-unlocked device — proceed with the standard fastboot commands below.</li>
        </ol>

        <h3>Oppo (the hard one)</h3>
        <p>
          For most Oppo models there is no official unlock. Some older flagships have community-made unlock tools (search XDA for "[your model] bootloader unlock"). If your model isn't supported, sadly you can't flash a GSI safely — and unofficial workarounds usually trip the security counter permanently.
        </p>

        <h3>Flash the GSI (same for all three brands once unlocked)</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="ColorOS / Realme UI 13+">
          Newer ColorOS/Realme UI releases use stricter partition layouts. If <code>fastboot flash system</code> fails with "partition too small", you may need to first run <code>fastboot delete-logical-partition product_a</code> (or <code>product_b</code> depending on your active slot) to make space.
        </Callout>

        <Callout type="tip" title="OnePlus MSM Tool is your safety net">
          For OnePlus, if anything goes catastrophically wrong, the <strong>MSMDownloadTool</strong> (leaks of it exist on XDA) can fully restore your phone from EDL mode. It's the closest thing to a "factory reset to brand new" button. Keep a copy handy.
        </Callout>
      </div>
    </div>
  );
}
