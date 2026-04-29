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

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <h3>The full flow</h3>
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

# 6. Flash the GSI
fastboot flash system GSI-FILENAME.img

# 7. Wipe everything
fastboot -w

# 8. Reboot
fastboot reboot`}
        />

        <h3>Useful diagnostic commands</h3>
        <CodeBlock
          code={`# What slot is currently active?
fastboot getvar current-slot

# What's my device codename?
fastboot getvar product

# Is the bootloader unlocked?
fastboot getvar unlocked

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
fastboot --set-active=b`}
        />

        <p className="text-sm text-muted-foreground mt-6">
          Pro tip: drag and drop image files into the terminal instead of typing the full path. Saves typos. Saves sanity.
        </p>
      </div>
    </div>
  );
}
