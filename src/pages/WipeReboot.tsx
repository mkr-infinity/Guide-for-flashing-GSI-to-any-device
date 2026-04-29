import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { StepImage } from "@/components/StepImage";
import recoveryWipe from "@/assets/recovery-wipe.png";

export default function WipeReboot() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Wipe & Reboot</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Last step. Clear the old data so the new system starts fresh.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <h3>Why we wipe</h3>
        <p>
          The old userdata partition is full of files written by your old ROM. The new GSI doesn't recognize them and will probably bootloop forever. So we factory reset to give it a clean home.
        </p>

        <h3>Step A — Boot into recovery</h3>
        <CodeBlock code="fastboot reboot recovery" />
        <p>
          Your phone restarts into recovery mode. On stock recovery you'll see a list of options. Use <strong>volume keys</strong> to move up/down and <strong>power button</strong> to select.
        </p>

        <StepImage
          src={recoveryWipe}
          alt="Android recovery menu with Factory reset / Wipe data option highlighted"
          caption="Pick 'Factory reset' or 'Wipe data/factory reset'. Confirm when it asks."
          size="phone"
        />

        <Callout type="warning" title="This wipes all your personal data">
          Photos, accounts, app data — gone. (You backed up earlier, right?) The internal storage is also wiped on most phones.
        </Callout>

        <h3>Step B — Reboot into your new system</h3>
        <p>
          Once the wipe finishes, go back to the main recovery menu and pick <strong>Reboot system now</strong>. Or from your computer:
        </p>
        <CodeBlock code="fastboot reboot" />

        <Callout type="tip" title="The first boot is sloooow">
          Your phone will sit on the boot animation for 5–10 minutes. That's normal — it's regenerating caches and Dalvik/ART code. Go make tea.
        </Callout>

        <Callout type="tip" title="Skip Wi-Fi during setup">
          When the setup wizard asks for Wi-Fi, tap "Skip" and use offline setup. It's faster and avoids weird Google Account issues that can pop up on freshly flashed GSIs. You can sign in normally after setup.
        </Callout>

        <h3>You did it 🎉</h3>
        <p>
          Welcome to your new ROM. Take a moment to enjoy the fact that you just performed open-heart surgery on your phone and it survived. If anything is off, the troubleshooting page has fixes for the most common issues.
        </p>
      </div>
    </div>
  );
}
