import { Callout } from "@/components/Callout";
import { StepImage } from "@/components/StepImage";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";
import samsungOdin from "@/assets/samsung-odin.png";

export default function Samsung() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Samsung Galaxy</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Samsung loves doing things their own way. Here's how to flash a GSI on a Galaxy.
        </p>
      </div>

      <BrandSpec
        difficulty="Hard"
        difficultyNote="Knox tripping permanent"
        rows={[
          { label: "Unlock method", value: <>Download mode + Volume Up confirm (after 7-day OEM Unlock wait)</> },
          { label: "Flash tool", value: <><strong>Odin</strong> (Windows) or <strong>Heimdall</strong> (Mac/Linux) — not fastboot</> },
          { label: "File format", value: <><code>.tar</code> for Odin, not <code>.img</code></> },
          { label: "Key step", value: <>Flash a <strong>patched recovery</strong> first to unlock fastbootd</> },
          { label: "vbmeta partitions", value: <><code>vbmeta</code> + sometimes <code>vbmeta_system</code></> },
          { label: "Brick recovery", value: <>Re-flash stock firmware (.tar files) via Odin</> },
          { label: "Warranty / Pay", value: <span className="text-red-600 dark:text-red-400 font-medium">Knox tripped → Samsung Pay + Secure Folder lost forever</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="warning" title="Knox is forever">
          The moment you unlock the bootloader, Samsung's <strong>Knox counter</strong> trips and your warranty + Samsung Pay + Secure Folder are gone for good. There is no way to reverse it. Make sure you're okay with that.
        </Callout>

        <h3>The Samsung-specific differences</h3>
        <ul>
          <li>Samsung doesn't use standard fastboot — it uses <strong>Odin</strong> (Windows) or <strong>Heimdall</strong> (Mac/Linux).</li>
          <li>To boot into download mode (Samsung's "fastboot equivalent"): power off, then hold <strong>Volume Down + Volume Up</strong> while plugging in the USB cable.</li>
          <li>You'll need a <strong>patched recovery</strong> to access fastbootd, because stock Samsung recovery doesn't expose it.</li>
        </ul>

        <h3>Step 1 — Unlock the bootloader</h3>
        <p>
          In Developer Options, turn on <strong>OEM Unlocking</strong> (this toggle only appears after your phone has been online for ~7 days — Samsung's anti-theft delay). Then boot to download mode and hold Volume Up to confirm bootloader unlock. Phone wipes itself.
        </p>

        <h3>Step 2 — Install a patched recovery</h3>
        <p>
          Download Samsung Odin and a patched recovery from <a href="https://github.com/Johx22/Patch-Recovery" target="_blank" rel="noreferrer">Johx22/Patch-Recovery</a> (or TWRP / OrangeFox if available for your model).
        </p>

        <StepImage
          src={samsungOdin}
          alt="Samsung Odin software window with file slots ready to flash a recovery image"
          caption="Odin window — load the patched recovery into the AP slot, then hit Start."
          size="large"
        />

        <p>Inside Odin:</p>
        <ol>
          <li>Click the <strong>AP</strong> button</li>
          <li>Pick the patched recovery <code>.tar</code> file</li>
          <li>Make sure <strong>Auto Reboot</strong> is unchecked (so we can boot straight into recovery after)</li>
          <li>Click <strong>Start</strong></li>
        </ol>

        <h3>Step 3 — Boot into the patched recovery</h3>
        <p>
          When Odin finishes (it'll say PASS! in green), unplug the phone and immediately hold <strong>Volume Up + Power</strong> (or your model's recovery combo) to boot into recovery. The patched recovery will load.
        </p>

        <h3>Step 4 — Enter fastbootd from recovery</h3>
        <p>
          Inside the patched recovery, find an option called <strong>Enter fastboot (fastbootd)</strong> and select it. Now your phone behaves like any other device in fastbootd.
        </p>

        <h3>Step 5 — Disable vbmeta (the Samsung way: a <code>.tar</code> in Odin)</h3>
        <p>
          Here's the Samsung-specific bit most guides skip: on a Galaxy you typically can't run <code>fastboot --disable-verity --disable-verification flash vbmeta</code> directly, because Samsung devices don't expose vbmeta to fastboot in the standard way. The community workaround is a <strong>pre-built "vbmeta_disable" patched flashable .tar</strong> that you flash <em>through Odin</em>, not the command line.
        </p>
        <ol>
          <li>Search XDA for "<em>[your model] vbmeta disable tar</em>" — the community maintains them per series (S10, S20, S22, A52, etc.).</li>
          <li>Boot back into <strong>download mode</strong> (Volume Down + Up + USB).</li>
          <li>Open Odin → click <strong>AP</strong> → pick the <code>vbmeta-disable.tar.md5</code> file.</li>
          <li>Make sure <strong>Auto Reboot</strong> is unchecked. Hit <strong>Start</strong>.</li>
          <li>When it shows PASS!, manually boot back into the patched recovery → fastbootd, then flash the GSI as in Step 6 below.</li>
        </ol>

        <Callout type="warning" title="Use the .tar made for your model">
          The vbmeta-disable .tar is keyed to the specific Galaxy series. Flashing one made for an S22 onto an A52 will hard-brick. Always grab it from the XDA thread for your exact model number.
        </Callout>

        <h3>Step 6 — Flash the GSI in fastbootd</h3>
        <p>From here, the rest of the guide applies normally — but stay in <strong>fastbootd</strong> (not regular fastboot) since Samsung uses dynamic partitions:</p>
        <CodeBlock
          code={`fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />
        <p className="text-sm text-muted-foreground">
          The <code>fastboot -w</code> command wipes userdata in one shot — handy on Samsung where stock recovery wiping can be flaky.
        </p>

        <Callout type="note" title="Encrypted partitions on newer Galaxies">
          On Galaxy S20 and newer, the userdata partition is encrypted. After flashing the GSI, you'll need to <code>fastboot -w</code> to wipe and re-encrypt — otherwise it'll bootloop on first boot.
        </Callout>

        <Callout type="tip" title="Stuck? Ask for help">
          The XDA Developers forum has a thread for almost every Samsung model. Post your model number and what failed; people are usually super helpful. You can also ping me on Telegram (link in the top bar).
        </Callout>
      </div>
    </div>
  );
}
