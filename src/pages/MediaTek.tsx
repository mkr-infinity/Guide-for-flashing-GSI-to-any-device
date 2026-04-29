import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function MediaTek() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">MediaTek Devices</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Infinix, Tecno, Itel, Umidigi, Doogee, Cubot — budget brands with MTK chips and their own quirky toolchain.
        </p>
      </div>

      <BrandSpec
        difficulty="Medium"
        difficultyNote="Different toolchain entirely"
        rows={[
          { label: "Unlock method", value: <>Standard <code>fastboot flashing unlock</code> on most — but many MTK devices need <strong>SP Flash Tool</strong> first</> },
          { label: "Flash tool", value: <><strong>SP Flash Tool</strong> (SmartPhone Flash Tool) — replaces fastboot on most MTK devices</> },
          { label: "Required files", value: <><strong>scatter file</strong> (<code>MT6xxx_Android_scatter.txt</code>) + the partition images you want to flash</> },
          { label: "Mode for flashing", value: <><strong>BROM</strong> (Boot ROM) mode — hold Volume Up + Volume Down + plug in cable while phone is OFF</> },
          { label: "Auth file", value: <span className="text-amber-600 dark:text-amber-400 font-medium">Newer MTK chips (MT6789+) require a paid AUTH file from the OEM</span> },
          { label: "Brick recovery", value: <strong>SP Flash Tool's "Format All + Download" mode is nearly unbrickable</strong> },
          { label: "Treble check first", value: <span className="text-amber-600 dark:text-amber-400 font-medium">Many cheap MTK phones ship without Treble — verify with Treble Check app</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="warning" title="Step zero: confirm Project Treble actually works">
          A lot of budget MTK phones (especially Itel, Cubot, sub-$100 Tecno/Infinix models) <em>claim</em> Treble support but ship with a broken or partial implementation. <strong>Run the Treble Check app</strong> first. If it shows red anywhere, this guide can't help you — flashing a GSI on a broken-Treble device produces an unbootable phone every time.
        </Callout>

        <h3>Step 1 — Get SP Flash Tool</h3>
        <p>
          SP Flash Tool is the universal flashing utility for MediaTek devices. Download from <a href="https://spflashtool.com/" target="_blank" rel="noreferrer">spflashtool.com</a>. Get the latest Windows version. Linux builds exist but are buggy — Windows is recommended.
        </p>
        <ul>
          <li>Install MTK USB drivers first (bundled with SP Flash Tool). On Windows you'll need to disable Driver Signature Enforcement to install them.</li>
          <li>Have your phone's <strong>scatter file</strong> ready. Search XDA for "<em>[your model] scatter file</em>" — it tells SP Flash Tool how your phone's partitions are laid out.</li>
        </ul>

        <h3>Step 2 — Get into BROM (Boot ROM) mode</h3>
        <p>
          BROM is MediaTek's equivalent of EDL on Snapdragon — a hardware-level flashing mode that works even when the phone is bricked. It's how SP Flash Tool talks to the device.
        </p>
        <ol>
          <li>Power the phone fully off.</li>
          <li>Unplug the USB cable.</li>
          <li>Hold <strong>Volume Up + Volume Down</strong> together (some models: just Volume Up; some: just Volume Down — varies).</li>
          <li>While still holding, plug the USB cable in.</li>
          <li>The phone screen stays black. SP Flash Tool will detect a "MediaTek USB Port (COMx)" device — that's BROM mode.</li>
        </ol>

        <Callout type="note" title="No screen activity is normal">
          BROM mode shows nothing on the phone screen at all. If your screen is dark and SP Flash Tool sees a new COM port, you're in. People often think their phone is bricked and panic — don't.
        </Callout>

        <h3>Step 3 — Bootloader unlock (the MTK way)</h3>
        <p>
          Most modern MTK devices (Tecno Camon, Infinix Note/Hot, Umidigi, etc.) actually <em>do</em> support standard fastboot for unlock:
        </p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot flashing unlock`}
        />
        <p>
          But many require an extra step first: a community tool called <strong>MTK Auth Bypass</strong> or <strong>mtkclient</strong> (<a href="https://github.com/bkerler/mtkclient" target="_blank" rel="noreferrer">github.com/bkerler/mtkclient</a>) which talks directly to BROM and skips the OEM's lockout. Worth bookmarking — it's the secret weapon for any "fastboot oem unlock returns FAILED" situation on MTK.
        </p>

        <Callout type="warning" title="Newer MTK chips need an AUTH file">
          On MT6789, MT6877, Dimensity 8200/9200 and newer, MediaTek added a Secure Boot layer. SP Flash Tool will refuse to flash without a per-device <strong>AUTH file</strong> signed by the OEM. These leak occasionally on XDA but are usually paid (~$10–$30) on community sites. If your phone needs one and you can't get it, sadly you're out of luck.
        </Callout>

        <h3>Step 4 — Flash the GSI</h3>
        <p>Once unlocked, flashing is the normal flow:</p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="Pick the right GSI architecture">
          Most modern MTK phones are <code>arm64</code> A/B. Older Helio P-series and budget Helio A/G phones might be plain <code>arm</code> A-only. Use Treble Check to confirm — wrong architecture = bootloop.
        </Callout>

        <h3>If anything goes wrong</h3>
        <p>
          The single biggest advantage of MediaTek devices: <strong>SP Flash Tool's "Format All + Download" mode is essentially unbrickable</strong>. As long as BROM mode still responds (and it almost always does, even on a phone that won't power on), you can wipe everything and re-flash stock from a scatter file. This is why a lot of advanced flashers actually <em>prefer</em> MTK devices for experimenting.
        </p>

        <Callout type="tip" title="Where to find stock firmware + scatter">
          For Tecno / Infinix / Itel: <a href="https://www.hovatek.com/forum/" target="_blank" rel="noreferrer">Hovatek forums</a> are the gold standard. For Umidigi / Cubot / Doogee: their official support pages still publish stock ROMs. For everything else: search XDA by model number.
        </Callout>
      </div>
    </div>
  );
}
