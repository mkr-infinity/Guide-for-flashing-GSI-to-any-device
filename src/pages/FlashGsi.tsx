import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { StepImage } from "@/components/StepImage";
import terminalFlash from "@/assets/terminal-flash.png";

export default function FlashGsi() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Flash the GSI</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The big moment. Don't blink. (Actually do, this takes a while.)
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <h3>Step A — Boot into fastbootd</h3>
        <p>
          Android 10+ devices use something called <strong>dynamic partitions</strong>, which is a fancy way of saying the system partition is virtual and lives inside another partition. To flash it, we need a deeper mode called <code>fastbootd</code>:
        </p>
        <CodeBlock code="fastboot reboot fastboot" />

        <p>
          Your phone will reboot and land on a similar-looking screen, but it'll say <strong>FASTBOOTD</strong> somewhere. Confirm again:
        </p>
        <CodeBlock code="fastboot devices" />

        <Callout type="warning" title="MUST be fastbootd, not regular fastboot — this is the #1 mistake">
          On Android 10+ devices the <code>system</code> partition is a <strong>logical partition</strong> living inside <code>super</code>. Regular fastboot can't see it — only <strong>fastbootd</strong> (note the trailing "d", which stands for "daemon") can. If you skip this step and try <code>fastboot flash system</code> from regular fastboot, you'll get <code>FAILED (remote: 'Partition not found')</code> or <code>'unknown partition'</code>. The screen on your phone is the easiest way to confirm — it should literally say <strong>FASTBOOTD</strong> in big letters at the top, not just "FASTBOOT MODE".
        </Callout>

        <Callout type="note" title="Command not recognized?">
          Older phones (Android 9 and below) don't have fastbootd. That's totally fine — they don't use dynamic partitions either, so just stay in regular fastboot mode and continue. The next command works in both.
        </Callout>

        <h3>Step B — (Optional) Free up some space</h3>
        <p>
          Some devices crash if there isn't enough free space in the system partition. If your GSI is large, run this to delete the unused product partition:
        </p>
        <CodeBlock code="fastboot delete-logical-partition product" />
        <p className="text-sm text-muted-foreground">
          Skip this if you don't get a "no space" error later. It's only a safety move.
        </p>

        <h3>Step C — Flash the actual GSI</h3>
        <p>
          Now the moment of truth. Replace <code>GSI-FILENAME.img</code> with your file (or use the drag-and-drop trick again):
        </p>
        <CodeBlock code="fastboot flash system GSI-FILENAME.img" />

        <p>
          For the next 30 seconds to 2 minutes, the terminal will look completely frozen. Do not panic. Do not unplug. Do not touch anything. Then it'll start showing progress like <code>Sending sparse 1/13</code>:
        </p>

        <StepImage
          src={terminalFlash}
          alt="Terminal showing fastboot flash system progress with sparse 1 of 13"
          caption="When you see '1/13' or similar, you're golden. Now you wait 5–20 minutes."
          size="large"
        />

        <Callout type="warning" title="DO NOT TOUCH ANYTHING">
          The full flash takes <strong>5 to 20 minutes</strong> depending on the size of the GSI. Your terminal will look stuck for long stretches. Your phone screen won't change. <strong>Leave it completely alone.</strong> Pulling the cable here is the most common way people brick phones.
        </Callout>

        <p>
          When it's done you'll see <code>OKAY</code> and <code>Finished. Total time: …</code>. Take a breath. The hard part is over.
        </p>
      </div>
    </div>
  );
}
