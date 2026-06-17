import { CodeBlock } from "@/components/CodeBlock";

export default function Commands() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">All Commands</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The cheat sheet. For when you've done this before and just want the copy-paste.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h3>Before flashing anything</h3>
        <CodeBlock
          code={`# Use the newest Android SDK Platform-Tools first
adb version
fastboot --version

# Confirm ADB sees the phone while Android is running
adb devices

# Reboot and confirm fastboot sees the phone
adb reboot bootloader
fastboot devices

# Confirm bootloader state and active slot
fastboot getvar unlocked
fastboot getvar current-slot
fastboot getvar product`}
        />

        <h3>The standard fastbootd flow</h3>
        <CodeBlock
          code={`# 1. Reboot to bootloader
adb reboot bootloader

# 2. Confirm fastboot sees the device
fastboot devices

# 3. Disable verified boot
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img

# 4. Reboot to fastbootd (Android 10+)
fastboot reboot fastboot

# 5. (Optional) Free up space if needed
fastboot delete-logical-partition product
fastboot delete-logical-partition product_a
fastboot delete-logical-partition product_b

# 6. Flash the GSI
fastboot flash system GSI-FILENAME.img

# 7. Wipe everything
fastboot -w

# 8. Reboot
fastboot reboot`}
        />

        <p className="text-sm text-muted-foreground">
          Use the unsuffixed <code>product</code> command first. If fastboot says the partition does not exist, try the active slot suffix shown by <code>fastboot getvar current-slot</code>.
        </p>

        <h3>vbmeta variants</h3>
        <CodeBlock
          code={`# Most devices
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img

# Some dynamic-partition devices also expose these
fastboot --disable-verity --disable-verification flash vbmeta_system vbmeta_system.img
fastboot --disable-verity --disable-verification flash vbmeta_vendor vbmeta_vendor.img

# Some A/B devices expose slot-suffixed vbmeta
fastboot --disable-verity --disable-verification flash vbmeta_a vbmeta.img
fastboot --disable-verity --disable-verification flash vbmeta_b vbmeta.img`}
        />

        <p className="text-sm text-muted-foreground">
          Do not force every vbmeta command. If a partition does not exist, skip it and check your device-specific thread.
        </p>

        <h3>Useful diagnostic commands</h3>
        <CodeBlock
          code={`# What slot is currently active?
fastboot getvar current-slot

# What's my device codename?
fastboot getvar product

# Is the bootloader unlocked?
fastboot getvar unlocked

# Dynamic partition / fastbootd clues
fastboot getvar is-userspace
fastboot getvar super-partition-name

# List all variables fastboot knows about
fastboot getvar all`}
        />

        <h3>If things go wrong</h3>
        <CodeBlock
          code={`# Boot a recovery image without flashing it (handy for testing)
fastboot boot recovery.img

# Flash boot image (if your GSI ships its own)
fastboot flash boot boot.img

# Switch active A/B slot
fastboot --set-active=a
fastboot --set-active=b

# Reboot from bootloader into userspace fastbootd
fastboot reboot fastboot

# Return to bootloader from fastbootd
fastboot reboot bootloader`}
        />

        <h3>Commands to avoid unless a device maintainer says so</h3>
        <CodeBlock
          code={`# Dangerous: wipes modem/NVRAM/IMEI data on many devices
fastboot erase modem
fastboot erase persist
fastboot erase nvdata

# Dangerous on MediaTek/SP Flash Tool: can erase IMEI/calibration
Format All + Download`}
        />

        <p className="text-sm text-muted-foreground mt-6">
          Samsung Download Mode is not fastboot. Do not run these fastboot commands expecting Odin mode to respond.
        </p>

        <p className="text-sm text-muted-foreground mt-6">
          Pro tip: drag and drop image files into the terminal instead of typing the full path. Saves typos. Saves sanity.
        </p>
      </div>
    </div>
  );
}
