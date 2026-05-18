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
          Samsung handles flashing very differently from standard Android devices. Their devices require specific tools and strict procedures.
        </p>
      </div>

      <BrandSpec
        difficulty="Hard"
        difficultyNote="Knox tripping is permanent, heavily fragmented partition structures"
        rows={[
          { label: "Unlock method", value: <>Download mode + Volume Up confirm (VaultKeeper / 7-day wait may apply)</> },
          { label: "Flash tool", value: <><strong>Odin</strong> (Windows) is preferred. Heimdall is unreliable on modern models.</> },
          { label: "File format", value: <><code>.tar</code> or <code>.tar.md5</code> for Odin, rarely raw <code>.img</code></> },
          { label: "Key step", value: <>Flashing exact version-matched vbmeta/recovery and using multidisabler</> },
          { label: "fastboot status", value: <>Standard bootloader fastboot is NOT supported. Limited userspace fastbootd support is highly device-dependent.</> },
          { label: "Brick recovery", value: <>Re-flash stock firmware (.tar files) via Odin</> },
          { label: "Warranty / Pay", value: <span className="text-red-600 dark:text-red-400 font-medium">Knox tripped → Samsung Pay + Secure Folder lost forever</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none">
        <Callout type="warning" title="Critical Samsung Warnings">
          <ul className="mt-2 mb-0 space-y-1">
            <li><strong>Knox is forever:</strong> Unlocking the bootloader permanently trips Knox. You will permanently lose Samsung Pay, Secure Folder, Samsung Pass, and Warranty.</li>
            <li><strong>VaultKeeper:</strong> Samsung's security can unexpectedly lock the bootloader or block custom binaries if you don't boot directly to recovery after flashing.</li>
            <li><strong>Anti-Rollback (SW REV CHECK FAIL):</strong> You cannot flash older bootloaders or modems. Ensure your custom binaries and GSI are based on the correct firmware version.</li>
            <li><strong>Standard Bootloader Fastboot is Not Supported:</strong> Do not assume your Galaxy behaves like a Pixel or Xiaomi device. You cannot generally use standard fastboot commands to manipulate partitions, and even when a custom recovery exposes 'fastbootd', it is a limited userspace implementation where device detection and standard commands often fail.</li>
          </ul>
        </Callout>

        <h3>The Samsung-specific differences</h3>
        <ul>
          <li>Samsung primarily uses <strong>Odin</strong> (Download Mode) instead of standard Android <strong>bootloader fastboot</strong>. While Heimdall exists for Mac/Linux, it is highly unreliable on modern Samsung devices. Use Odin on Windows whenever possible.</li>
          <li>To enter Download Mode: power off the phone, then hold <strong>Volume Down + Volume Up</strong> (varies by model) while plugging in the USB cable connected to a PC.</li>
          <li>Not all Samsung devices use dynamic partitions. Many older/budget Galaxy devices are A-only, while newer ones may use dynamic partitions.</li>
          <li>A custom recovery (TWRP, OrangeFox, or patched recovery) provides advanced partition access and <em>sometimes</em> exposes a limited <strong>userspace fastbootd</strong> on certain devices. However, this fastbootd support varies heavily by device model, Android version, chipset (Exynos vs Snapdragon), and the specific custom recovery implementation in use.</li>
        </ul>

        <h3>Step 1 — Unlock the bootloader</h3>
        <p>
          In Developer Options, turn on <strong>OEM Unlocking</strong>. Note: this toggle may only appear after the phone has been online for a few days due to Samsung's VaultKeeper mechanism and anti-theft delays.
        </p>
        <p>
          Once enabled, power off the phone. Boot to Download Mode and hold <strong>Volume Up</strong> when prompted to unlock the bootloader. The phone will wipe all userdata. Go through initial setup, connect to Wi-Fi, and re-enable Developer Options to verify OEM Unlocking is still present and greyed out.
        </p>

        <h3>Step 2 — VBMeta and AVB (Critical)</h3>
        <p>
          Samsung Android Verified Boot (AVB) must be disabled. You cannot simply run the standard fastboot disable-verity commands because standard fastboot is unavailable. Instead, you flash a patched, empty <code>vbmeta.tar</code> via Odin.
        </p>
        <Callout type="warning" title="Strict Version Matching Required">
          The blank <code>vbmeta.tar</code> <strong>must</strong> exactly match your specific device model number and firmware version. Flashing the wrong vbmeta or incompatible version can cause bootloops, soft bricks, or immediate failure to boot. Avoid using generic vbmeta files unless strictly advised by your device's maintainer.
        </Callout>
        <ol>
          <li>Boot into <strong>Download mode</strong>.</li>
          <li>Open Odin → click <strong>USERDATA</strong> or <strong>AP</strong> (consult your device guide, usually AP) → select the customized <code>vbmeta_disabled.tar</code> for your exact firmware.</li>
          <li>Hit <strong>Start</strong> (ensure Auto Reboot is handled carefully; often you need to reboot immediately to recovery).</li>
        </ol>

        <StepImage
          src={samsungOdin}
          alt="Samsung Odin software window with file slots ready to flash a recovery image"
          caption="Odin window — load the patched recovery or vbmeta into the AP slot, then hit Start."
          size="large"
        />

        <h3>Step 3 — Custom Recovery and Multidisabler</h3>
        <p>
          Flashing a GSI over stock Samsung firmware often results in bootloops due to Samsung's file-based encryption and security checks. You generally need TWRP or a patched recovery.
        </p>
        <ol>
          <li>Flash your device-specific TWRP/Recovery via Odin (usually in the AP slot).</li>
          <li>Boot <strong>immediately</strong> into recovery. If you let the phone boot to the Samsung system, VaultKeeper or stock recovery will overwrite TWRP.</li>
          <li>In TWRP, flash a <strong>multidisabler</strong> zip or similar script designed for your device. This script disables file-based encryption (FBE), Samsung VaultKeeper, proca, and other proprietary security measures.</li>
        </ol>
        
        <h3>Step 4 — Flashing the GSI</h3>
        <p>
          Because standard fastboot is absent and fastbootd is often broken or limited on Samsung, the safest and most reliable flashing method is usually via <strong>Recovery (TWRP)</strong>, rather than command line.
        </p>

        <h4>Method A: Flashing via TWRP (Recommended for most Galaxies)</h4>
        <ol>
          <li>Copy the GSI <code>.img</code> file to your device's internal storage or SD card.</li>
          <li>In TWRP, tap <strong>Install</strong> → <strong>Install Image</strong>.</li>
          <li>Select the GSI <code>.img</code> file.</li>
          <li>Choose the <strong>System Image</strong> partition.</li>
          <li>Swipe to flash.</li>
        </ol>

        <h4>Method B: Flashing via Fastbootd (If supported)</h4>
        <p>
          Some modern Samsung devices with specific patched recoveries expose a functional userspace <strong>fastbootd</strong> environment. Note that if your PC does not recognize the device or commands fail completely, your recovery/device combination likely does not support fastbootd flashing properly and you must use Method A.
        </p>
        <ol>
          <li>From TWRP / Patched Recovery, select <strong>Enter fastboot</strong> or <strong>Reboot to fastboot (fastbootd)</strong>.</li>
          <li>Connect to your PC and verify the device is detected via <code>fastboot devices</code>.</li>
        </ol>
        <CodeBlock
          code={`fastboot flash system GSI-FILENAME.img`}
        />
        <Callout type="warning" title="Avoid Standard Fastboot Commands">
          Do <strong>NOT</strong> attempt standard commands like <code>fastboot flash system</code> in download mode, and do not expect <code>fastboot -w</code> to work flawlessly in fastbootd space. These commands frequently fail or misbehave on Samsung implementations.
        </Callout>

        <h3>Step 5 — Format Data</h3>
        <p>
          Before booting the GSI, you must completely format userdata.
        </p>
        <p>
          If you are in TWRP: Go to <strong>Wipe</strong> → <strong>Format Data</strong> → type <code>yes</code>. This completely erases the userdata partition (removing encryption completely).
        </p>
        <p>
          If you used fastbootd, you can <em>attempt</em> to use the wipe command:
        </p>
        <CodeBlock
          code={`fastboot -w`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Note: <code>fastboot -w</code> wipes and formats userdata. However, on Samsung devices, this command is notoriously flaky and may fail. If it fails, rely on TWRP's Format Data option instead.
        </p>

        <Callout type="tip" title="Stuck? Ask for help">
          Because Samsung implementations vary wildly between Exynos, Snapdragon, regions, and Android versions, generic guides only go so far. Find the XDA Developers forum thread for your specific Samsung model. Post your exact model number and firmware version when asking for help.
        </Callout>
      </div>
    </div>
  );
}
