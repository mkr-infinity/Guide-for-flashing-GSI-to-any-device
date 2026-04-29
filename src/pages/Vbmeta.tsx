import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Vbmeta() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Flash vbmeta</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Disabling Android's "is this the original system?" check.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <p className="text-lg">
          Android has a built-in security feature called <strong>Verified Boot</strong>. It checks every time your phone starts up that the system hasn't been modified. We're about to modify the system, so we need to politely ask it to stop checking — that's what flashing vbmeta does.
        </p>

        <h3>The command</h3>
        <p>Make sure your phone is in bootloader mode (from the previous step), then run:</p>
        <CodeBlock code="fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img" />

        <Callout type="tip" title="Pro move: drag and drop">
          Type <code>fastboot --disable-verity --disable-verification flash vbmeta&nbsp;</code> (with a space at the end), then drag the <code>vbmeta.img</code> file from your file manager directly into the terminal window. The full path appears automatically. No typos. Beautiful.
        </Callout>

        <p>
          You'll see a few lines of output ending with <code>OKAY</code>. Takes about a second. That's it.
        </p>

        <Callout type="note" title="What if I don't have vbmeta.img?">
          You can grab a generic one from <a href="https://dl.google.com/developers/android/qt/images/gsi/vbmeta.img" target="_blank" rel="noreferrer">this Google link</a>. It works on most devices. For perfect compatibility, extract <code>vbmeta.img</code> from your device's stock firmware (search "[your phone model] stock firmware" online).
        </Callout>

        <Callout type="warning" title="Samsung &amp; some others">
          Samsung devices need vbmeta flashed through Odin, not fastboot — see the Samsung page. A few Xiaomi/Redmi models also have a slightly different name (<code>vbmeta_a</code>, <code>vbmeta_b</code>, <code>vbmeta_system</code>). If the command fails, see Troubleshooting.
        </Callout>

        <Callout type="tip" title="Skipping this step">
          Some devices don't actually need this — they accept the GSI without disabling vbmeta. If you're brave you can skip ahead and only come back if the GSI flash fails. I personally always do it just to be safe.
        </Callout>
      </div>
    </div>
  );
}
