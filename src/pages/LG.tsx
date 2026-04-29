import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function LG() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">LG (Legacy)</h1>
        <p className="text-lg text-muted-foreground mt-2">
          LG quit phones in 2021, but their old G/V series are still some of the best GSI-friendly devices around.
        </p>
      </div>

      <BrandSpec
        difficulty="Medium"
        difficultyNote="Easy on supported models, impossible on others"
        rows={[
          { label: "Unlock method", value: <>Old <strong>LG Developer Site</strong> codes (still archived on XDA) for supported models</> },
          { label: "Flash tool", value: <><strong>LGUP</strong> + <strong>LG Bridge</strong> on Windows — not standard fastboot</> },
          { label: "File format", value: <><code>.kdz</code> or <code>.dz</code> for LGUP, not <code>.img</code></> },
          { label: "US carrier models", value: <span className="text-red-600 dark:text-red-400 font-medium">Verizon / AT&T / T-Mobile branded LGs are mostly unlockable-blocked</span> },
          { label: "Best models", value: <>LG G5 / G6 / G7 / G8, V20 / V30 / V40 / V50, Velvet (international SKUs)</> },
          { label: "Brick recovery", value: <><strong>LGUP</strong> with stock <code>.kdz</code> from LG-Firmwares.com or LGMobileFirmware</> },
          { label: "Discontinued", value: <span className="text-amber-600 dark:text-amber-400 font-medium">LG exited mobile in April 2021 — no official tool downloads anymore</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="note" title="Why people still flash LG phones in 2026">
          LG quit, but the V60 and Velvet are still amazing hardware: headphone jack, microSD, removable cases, dual screens. A clean GSI breathes years of life into these phones, which is why LG flashing is still a healthy scene on XDA.
        </Callout>

        <h3>Step 1 — Find your unlock code</h3>
        <p>
          LG used to host a Developer site where you could request a unique unlock code for your IMEI. That site shut down in 2021. Codes are still circulating in two ways:
        </p>
        <ul>
          <li>The XDA thread for your specific model often has a <strong>code generator script</strong> contributed by the community.</li>
          <li>Some older codes are still in archived databases — search "[your model] unlock.bin LG".</li>
        </ul>

        <h3>Step 2 — Apply the unlock</h3>
        <CodeBlock
          code={`adb reboot bootloader
fastboot flash unlock unlock.bin
fastboot oem unlock`}
        />
        <p className="text-sm text-muted-foreground">
          Some LG models accept the standard <code>fastboot oem unlock</code> directly once you flash the <code>unlock.bin</code> blob to the unlock partition. Others require a community tool — check your model thread.
        </p>

        <h3>Step 3 — Install LG Bridge + LGUP</h3>
        <p>
          Since LG's official downloads are gone, the community mirrors what you need:
        </p>
        <ul>
          <li><strong>LG Bridge</strong> — the USB driver layer. Mirror: <a href="https://www.lg.com/us/support/mobile-support" target="_blank" rel="noreferrer">LG support site</a> (older builds still listed) or XDA archives.</li>
          <li><strong>LGUP</strong> — the actual flashing GUI. Search XDA for "<em>LGUP DLL [your model]</em>" — each model needs the right model DLL dropped into the LGUP folder.</li>
        </ul>

        <Callout type="warning" title="LGUP is finicky on Windows 11">
          LGUP was last updated in ~2018 and doesn't love Windows 11. Most people run it inside a Windows 10 virtual machine, or use a community-patched fork like <strong>UPPERCUT</strong> on XDA. Worth knowing before you spend an hour fighting driver signing.
        </Callout>

        <h3>Step 4 — Flash the GSI (after unlock)</h3>
        <p>
          Once LGUP has flashed your patched stock kdz (with vbmeta-disabled), you can use standard fastboot for the GSI itself:
        </p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="A-only vs A/B layout">
          LG flagships up through the V40 are <strong>A-only</strong> (single slot). The V50, V60, and Velvet switched to A/B. Pick your GSI accordingly — A-only devices need the <code>arm64_a</code> variant, A/B devices need <code>arm64_ab</code>.
        </Callout>

        <Callout type="tip" title="The XDA LG community is small but very helpful">
          Because LG is dead and the community is shrinking, the people still active on XDA's LG forums are the deep experts. Don't be shy — post your model and the exact error, and you'll usually get a real answer within a day.
        </Callout>
      </div>
    </div>
  );
}
