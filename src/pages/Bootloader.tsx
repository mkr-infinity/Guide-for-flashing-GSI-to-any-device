import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { StepImage } from "@/components/StepImage";
import bootloaderScreen from "@/assets/bootloader-screen.png";

export default function Bootloader() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Boot into Bootloader</h1>
        <p className="text-lg text-muted-foreground mt-2">
          We need to put your phone in a special mode where it listens to your computer.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <h3>Step 1 — Plug in your phone</h3>
        <p>
          Connect your phone to the computer with the USB cable. The first time you do this, your phone will pop up a "Allow USB debugging?" prompt — tap <strong>Allow</strong> (and tick "Always allow from this computer" so you don't see it again).
        </p>

        <h3>Step 2 — Open the platform-tools terminal</h3>
        <p>
          Go to the platform-tools folder you set up earlier and open a terminal there. Type this to confirm your phone is detected:
        </p>
        <CodeBlock code="adb devices" />
        <p>
          You should see something like <code>ABC1234DEF&nbsp;&nbsp;&nbsp;device</code>. If it says <code>unauthorized</code>, check your phone screen — there's probably a popup waiting for you. If it says nothing, see the troubleshooting page.
        </p>

        <h3>Step 3 — Reboot to bootloader</h3>
        <p>
          Now the magic command. Type this and hit Enter:
        </p>
        <CodeBlock code="adb reboot bootloader" />

        <p>
          Your phone will restart and land on the bootloader / fastboot screen. It usually looks something like this:
        </p>
        <StepImage
          src={bootloaderScreen}
          alt="Phone screen showing FASTBOOT MODE with the lying down Android robot mascot"
          caption="The classic 'Android lying down with its chest open' look. Some brands skip the mascot and just show text. Both are fine."
          size="phone"
        />

        <Callout type="note" title="Your screen might look different">
          Pixel/Motorola phones show this style. Xiaomi shows a Mi Bunny with FASTBOOT text. Samsung shows a download mode screen instead (different process — see the Samsung page). OnePlus/Realme show a bare black screen with a few lines of text. All normal.
        </Callout>

        <h3>Step 4 — Confirm fastboot sees your phone</h3>
        <p>
          Run this to make sure your computer can talk to the phone in fastboot mode:
        </p>
        <CodeBlock code="fastboot devices" />
        <p>
          You should see your serial number again, this time followed by <code>fastboot</code>. If yes, you're ready for the next step.
        </p>

        <Callout type="tip" title="Stuck on 'no permissions' on Linux?">
          Try with <code>sudo fastboot devices</code>, or set up the udev rules from the Android SDK. Windows users: install the universal ADB driver if your phone doesn't show up.
        </Callout>
      </div>
    </div>
  );
}
