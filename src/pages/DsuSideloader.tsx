import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, RefreshCw, Smartphone, Zap, ExternalLink } from "lucide-react";

export default function DsuSideloader() {
  return (
    <div className="space-y-8">
      <div className="mb-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Test First with DSU Sideloader</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The smartest thing you can do before flashing for real: try the GSI as a temporary "guest OS" first.
        </p>
      </div>

      <Callout type="tip" title="Read this even if you're confident">
        DSU Sideloader lets you boot a GSI <strong>without touching your real system partition</strong>. If the GSI bootloops or your camera/wifi breaks, just reboot — your normal phone is back, untouched. It's the difference between "trying on shoes" and "gluing them to your feet".
      </Callout>

      {/* Why use it */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Why this matters</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: ShieldCheck,
              title: "Zero risk to your stock ROM",
              body: "DSU runs the GSI in a sandbox alongside your real OS. Nothing on your actual system is overwritten.",
            },
            {
              icon: RefreshCw,
              title: "Reboot to undo",
              body: "Hate the GSI? Just restart and you're back on your normal phone. No flashing, no recovery, no panic.",
            },
            {
              icon: Smartphone,
              title: "Test hardware first",
              body: "Verify camera, fingerprint, wifi, mobile data, NFC actually work on your specific phone before committing.",
            },
            {
              icon: Zap,
              title: "No PC required (after install)",
              body: "Once DSU Sideloader is set up, you can try out new GSIs entirely from your phone. No more cable juggling.",
            },
          ].map((c) => (
            <Card key={c.title}>
              <CardContent className="p-5 flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold mb-1">{c.title}</div>
                  <p className="text-sm text-muted-foreground m-0">{c.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-3">What you need</h2>
        <Card>
          <CardContent className="p-5 space-y-2 text-sm">
            <div className="flex items-baseline gap-3"><span className="font-bold text-primary shrink-0 w-6">✓</span> <span><strong>Android 10 or newer</strong> with dynamic partitions support (most phones from 2019+)</span></div>
            <div className="flex items-baseline gap-3"><span className="font-bold text-primary shrink-0 w-6">✓</span> <span>The <strong>compressed GSI file</strong> (<code className="text-xs px-1.5 py-0.5 bg-muted rounded font-mono">.img.xz</code> or <code className="text-xs px-1.5 py-0.5 bg-muted rounded font-mono">.img.gz</code>) — DSU wants it compressed, do not extract it</span></div>
            <div className="flex items-baseline gap-3"><span className="font-bold text-primary shrink-0 w-6">✓</span> <span><strong>5–10 GB free internal storage</strong> for the temporary virtual partition</span></div>
            <div className="flex items-baseline gap-3"><span className="font-bold text-primary shrink-0 w-6">✓</span> <span><strong>Battery above 20%</strong> (Android refuses to enter DSU below this)</span></div>
            <div className="flex items-baseline gap-3"><span className="font-bold text-primary shrink-0 w-6">✓</span> <span>Either <strong>Shizuku</strong>, <strong>root</strong>, or a one-time ADB command — DSU Sideloader walks you through whichever you pick</span></div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground mt-3">
          You do <strong>not</strong> need an unlocked bootloader for DSU — it works on locked stock devices too. That's the magic.
        </p>
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Step-by-step</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
              Download DSU Sideloader
            </h3>
            <p className="text-muted-foreground mb-2">
              Get the latest APK from the official GitHub releases page:
            </p>
            <a
              href="https://github.com/VegaBobo/DSU-Sideloader/releases"
              target="_blank"
              rel="noreferrer"
              className="no-underline inline-flex"
            >
              <Card className="hover:border-primary transition-colors group">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="font-mono text-sm font-semibold group-hover:text-primary">
                    github.com/VegaBobo/DSU-Sideloader
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Install the <code className="text-xs px-1.5 py-0.5 bg-muted rounded font-mono">.apk</code> like any side-loaded app. You may need to allow "Install from unknown sources" for your file manager.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
              Grant DSU permissions
            </h3>
            <p className="text-muted-foreground mb-3">
              Open DSU Sideloader. It needs elevated permissions to install a DSU image. You have three options — pick whichever you can do:
            </p>
            <div className="space-y-2 text-sm">
              <div className="rounded-lg border border-border p-3">
                <div className="font-semibold text-foreground">Option A — Shizuku (recommended)</div>
                <div className="text-muted-foreground">Install <a href="https://shizuku.rikka.app/" target="_blank" rel="noreferrer" className="text-primary underline">Shizuku</a>, start it via wireless ADB, then grant DSU Sideloader access from inside Shizuku. No root needed.</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="font-semibold text-foreground">Option B — Root</div>
                <div className="text-muted-foreground">If your phone is already rooted (Magisk/KernelSU), grant root access from the prompt. Done.</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="font-semibold text-foreground">Option C — One-time ADB command</div>
                <div className="text-muted-foreground">Plug into your computer and run the command DSU Sideloader shows you. Works without root or Shizuku, but you have to repeat it after every reboot.</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
              Pick your GSI file
            </h3>
            <p className="text-muted-foreground mb-2">
              In DSU Sideloader, tap <strong>Select a GSI/DSU image</strong> and pick the <code>.xz</code> or <code>.gz</code> file you downloaded.
            </p>
            <Callout type="warning" title="Don't extract the file">
              DSU expects the compressed file. If you already extracted it to a raw <code>.img</code>, re-compress it first or just re-download. This trips up almost everyone the first time.
            </Callout>
          </div>

          <div>
            <h3 className="text-lg font-bold flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
              Set sizes (or leave defaults)
            </h3>
            <p className="text-muted-foreground">
              You'll see two size sliders: <strong>userdata</strong> (recommended 8 GB minimum) and <strong>system</strong> (DSU usually fills this in for you). The defaults are fine for most phones. Hit <strong>Install</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
              Wait, then reboot
            </h3>
            <p className="text-muted-foreground">
              DSU spends a few minutes unpacking the GSI into a virtual partition. When it finishes, a notification appears: <em>"Dynamic System Updates is ready. Restart to use the new image."</em> Tap <strong>Restart</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">6</span>
              You're now booted into the GSI
            </h3>
            <p className="text-muted-foreground mb-3">
              First boot takes 3–10 minutes. Don't panic. Once it's up, walk through the GSI like a real install:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Does Wi-Fi connect?</li>
              <li>Does mobile data work? (test a few websites)</li>
              <li>Does the camera open and take a photo?</li>
              <li>Does fingerprint / face unlock work?</li>
              <li>Does Bluetooth pair?</li>
              <li>Sound, vibration, brightness — all good?</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">7</span>
              Decide what to do
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardContent className="p-4">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">It works great</div>
                  <p className="text-sm text-muted-foreground m-0">
                    Awesome. Reboot back to your stock ROM, then continue with the proper flashing steps in this guide. Use the <strong>same GSI file</strong> you just tested.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-4">
                  <div className="font-semibold text-red-700 dark:text-red-300 mb-1">Something's broken</div>
                  <p className="text-sm text-muted-foreground m-0">
                    Reboot. You're back on stock with no damage done. Try a different GSI variant (try <code className="text-xs px-1 py-0.5 bg-muted rounded font-mono">vndklite</code>, or a different ROM) and DSU it again.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              To exit DSU at any time: just reboot normally. Or open DSU Sideloader → <strong>Discard DSU image</strong> to free up the storage it used.
            </p>
          </div>
        </div>
      </div>

      {/* CLI alternative */}
      <div>
        <h3 className="text-xl font-bold tracking-tight mb-2">Command-line alternative (for nerds)</h3>
        <p className="text-muted-foreground mb-3">
          If you'd rather skip the app, Android has built-in DSU support via ADB:
        </p>
        <CodeBlock
          code={`adb push GSI-FILENAME.img.xz /sdcard/
adb shell
gsi_tool install -s 8589934592 /sdcard/GSI-FILENAME.img.xz`}
        />
        <p className="text-xs text-muted-foreground mt-2">
          The number is the userdata size in bytes (8 GB here). Easier to just use the app, honestly.
        </p>
      </div>

      <Callout type="note" title="DSU isn't a permanent solution">
        DSU is for testing. The GSI lives in a separate virtual partition and Android may discard it after big stock updates or when you run low on storage. Once you've confirmed the GSI works, do the real flash so you can use it as your daily driver.
      </Callout>
    </div>
  );
}
