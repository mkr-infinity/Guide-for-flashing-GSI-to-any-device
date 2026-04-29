import { Callout } from "@/components/Callout";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function Naming() {
  return (
    <div className="space-y-8">
      <div className="mb-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Decode GSI File Names</h1>
        <p className="text-lg text-muted-foreground mt-2">
          GSI file names look like a barcode that fell down the stairs. Let me show you how to read one in 30 seconds.
        </p>
      </div>

      {/* Anatomy diagram */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-primary/20">
        <CardContent className="p-6 sm:p-8">
          <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-3">Anatomy of a GSI file name</div>
          <div className="font-mono text-center text-lg sm:text-xl my-4 select-all leading-relaxed break-all">
            <span className="text-emerald-600 dark:text-emerald-400">arm64</span>
            <span className="text-muted-foreground">_</span>
            <span className="text-blue-600 dark:text-blue-400">b</span>
            <span className="text-purple-600 dark:text-purple-400">g</span>
            <span className="text-amber-600 dark:text-amber-400">N</span>
            <span className="text-muted-foreground">-</span>
            <span className="text-rose-600 dark:text-rose-400">vndklite</span>
            <span className="text-muted-foreground">.img.xz</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs sm:text-sm text-center mt-6">
            <div><div className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">arm64</div><div className="text-muted-foreground mt-1">Architecture</div></div>
            <div><div className="text-blue-600 dark:text-blue-400 font-semibold font-mono">b</div><div className="text-muted-foreground mt-1">Partition style</div></div>
            <div><div className="text-purple-600 dark:text-purple-400 font-semibold font-mono">g</div><div className="text-muted-foreground mt-1">GApps?</div></div>
            <div><div className="text-amber-600 dark:text-amber-400 font-semibold font-mono">N</div><div className="text-muted-foreground mt-1">Root?</div></div>
            <div><div className="text-rose-600 dark:text-rose-400 font-semibold font-mono">vndklite</div><div className="text-muted-foreground mt-1">Variant</div></div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed reference table */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">The full reference table</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm border-collapse m-0">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="p-4 font-semibold">Slot</th>
                <th className="p-4 font-semibold">Code</th>
                <th className="p-4 font-semibold">What it means</th>
                <th className="p-4 font-semibold hidden md:table-cell">When to pick it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              <tr>
                <td rowSpan={3} className="p-4 font-semibold align-top text-emerald-600 dark:text-emerald-400">Architecture</td>
                <td className="p-4 font-mono">arm</td>
                <td className="p-4 text-muted-foreground">32-bit ARM</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Very old phones (pre-2017)</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">a64</td>
                <td className="p-4 text-muted-foreground">32-bit userspace, 64-bit kernel</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Older mid-range (2017–2018)</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">arm64</td>
                <td className="p-4 text-muted-foreground">Full 64-bit (most common today)</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">99% of phones from 2019+</td>
              </tr>

              <tr className="bg-muted/20">
                <td rowSpan={2} className="p-4 font-semibold align-top text-blue-600 dark:text-blue-400">Partition style</td>
                <td className="p-4 font-mono">a</td>
                <td className="p-4 text-muted-foreground">A-only (single system partition)</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Phones launched on Android 8/9</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="p-4 font-mono">b</td>
                <td className="p-4 text-muted-foreground">A/B (dual seamless slots)</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Most modern phones (Android 10+)</td>
              </tr>

              <tr>
                <td rowSpan={3} className="p-4 font-semibold align-top text-purple-600 dark:text-purple-400">Apps</td>
                <td className="p-4 font-mono">v</td>
                <td className="p-4 text-muted-foreground">Vanilla — no Google Apps</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Privacy / de-Googled setup</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">g</td>
                <td className="p-4 text-muted-foreground">With standard GApps (Play Store etc.)</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Most users want this</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">o</td>
                <td className="p-4 text-muted-foreground">With Android Go GApps (lighter)</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Phones with ≤2 GB RAM</td>
              </tr>

              <tr className="bg-muted/20">
                <td rowSpan={2} className="p-4 font-semibold align-top text-amber-600 dark:text-amber-400">Root</td>
                <td className="p-4 font-mono">N</td>
                <td className="p-4 text-muted-foreground">No superuser (not rooted)</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Banking apps, daily driver</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="p-4 font-mono">S</td>
                <td className="p-4 text-muted-foreground">Built-in PHH superuser</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Power users / Magisk replacement</td>
              </tr>

              <tr>
                <td rowSpan={3} className="p-4 font-semibold align-top text-rose-600 dark:text-rose-400">Variant</td>
                <td className="p-4 font-mono">vndklite</td>
                <td className="p-4 text-muted-foreground">For VNDKLite or read-only system devices</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Try this first if normal GSI bootloops</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">secure</td>
                <td className="p-4 text-muted-foreground">No superuser, spoofed props</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Better SafetyNet / banking compatibility</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">personal</td>
                <td className="p-4 text-muted-foreground">Author's personal mods (reference only)</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">Skip unless you know why you want it</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick decision guide */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">My "just tell me what to download" cheatsheet</h2>
        <p className="text-muted-foreground mb-4">If you don't want to think, here's the GSI I'd grab in each scenario.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { who: "I just want a clean Android with Play Store", pick: "arm64_bgN", note: "64-bit · A/B · Google Apps · no root" },
            { who: "I want it rooted out of the box", pick: "arm64_bgS", note: "Same as above + PHH superuser pre-installed" },
            { who: "Privacy-focused, no Google", pick: "arm64_bvN", note: "Vanilla, no GApps. Pair with F-Droid / MicroG" },
            { who: "My phone bootloops the normal one", pick: "arm64_bgN-vndklite", note: "Lite variant for stubborn devices" },
            { who: "I have an old A-only phone (Android 8/9)", pick: "arm64_agN", note: "Note the 'a' instead of 'b'" },
            { who: "Low-RAM phone (2GB or less)", pick: "arm64_boN", note: "Android Go GApps for lighter footprint" },
          ].map((row) => (
            <Card key={row.who}>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-2">{row.who}</div>
                <div className="font-mono text-lg font-bold text-primary">{row.pick}</div>
                <div className="text-xs text-muted-foreground mt-1">{row.note}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Callout type="tip" title="Don't know your architecture?">
        Open the <strong>Treble Check</strong> app on your phone — it tells you exactly which architecture (<code>arm</code>, <code>a64</code>, or <code>arm64</code>) and which partition style (<code>a-only</code> or <code>A/B</code>) to look for.
      </Callout>

      {/* GSI sources */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Where to actually download GSIs</h2>
        <p className="text-muted-foreground mb-5">
          Stick to the sources below. Random Telegram links and shady forums are how malware ends up on your phone.
        </p>

        {/* Search hubs - browse hundreds of GSIs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <h3 className="text-lg font-bold tracking-tight m-0">Search hubs — browse hundreds of GSIs</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            These are aggregators / index sites where you can browse, filter, and download many different ROMs as GSIs from one place.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                name: "SourceForge — TrebleGSI Hub",
                tag: "Massive multi-ROM archive",
                desc: "The biggest one-stop shop. Hosts dozens of GSIs (LineageOS, Pixel Experience, crDroid, AOSP, more) from many maintainers. Filter by Android version and architecture.",
                href: "https://sourceforge.net/projects/treblegsi/files/",
              },
              {
                name: "AndyYan's GSI Collection",
                tag: "20+ ROMs · weekly builds",
                desc: "Long-running maintainer who builds LineageOS, Pixel Experience, RisingOS, EvolutionX, crDroid and more as GSIs. Updates almost every week.",
                href: "https://sourceforge.net/projects/andyyan-gsi/files/",
              },
              {
                name: "GitHub — gsi-list (community index)",
                tag: "Curated repository list",
                desc: "Crowd-maintained index of every public GSI repository, tagged by ROM, Android version and active/dead status. Great starting point.",
                href: "https://github.com/the-muppet/gsi-list",
              },
              {
                name: "XDA Forums — GSI Index",
                tag: "Device-specific finds",
                desc: "The official XDA section for Treble / GSI. Search '[your phone codename] GSI' — many builds here are model-tuned by other users.",
                href: "https://xdaforums.com/f/treble-enabled-device-guides-news-discussion.7843/",
              },
              {
                name: "GitHub — gsi topic",
                tag: "Discover new projects",
                desc: "Every public repo tagged 'gsi' on GitHub. Sort by stars or recent updates to find new GSI projects as soon as they launch.",
                href: "https://github.com/topics/gsi",
              },
              {
                name: "Treble Info",
                tag: "Knowledge base + downloads",
                desc: "Community wiki that documents which GSIs are known to work on which devices, with links to each build. Useful sanity check before flashing.",
                href: "https://treble.info/",
              },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                <Card className="h-full hover:border-primary transition-colors group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                        {s.name}
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    </div>
                    <div className="inline-block text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded mb-3">
                      {s.tag}
                    </div>
                    <p className="text-sm text-muted-foreground m-0 leading-relaxed">
                      {s.desc}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Specific ROM downloads */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <h3 className="text-lg font-bold tracking-tight m-0">Specific ROMs — pick one and download direct</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            If you already know which ROM you want, here are the official download pages for popular GSI projects.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                name: "Phh's Treble Releases",
                tag: "AOSP · the original",
                desc: "Phhusson basically invented community GSIs. Multiple variants of pure AOSP with PHH superuser baked in.",
                href: "https://github.com/phhusson/treble_experimentations/releases",
              },
              {
                name: "TrebleDroid",
                tag: "AOSP · hardware-focused",
                desc: "Modern fork of phh's project with extra hardware compatibility patches. Best fallback when other GSIs bootloop.",
                href: "https://github.com/TrebleDroid/treble_experimentations/releases",
              },
              {
                name: "PixelOS GSI",
                tag: "Pixel-look ROM",
                desc: "Brings the Pixel design language to non-Pixel devices. Smooth, clean, official-feeling.",
                href: "https://github.com/PixelOS-AOSP/treble_releases/releases",
              },
              {
                name: "crDroid GSI",
                tag: "Customization-heavy",
                desc: "If you love tweaking every status bar pixel and lockscreen detail, this is your ROM.",
                href: "https://crdroid.net/devices",
              },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                <Card className="h-full hover:border-primary transition-colors group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                        {s.name}
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    </div>
                    <div className="inline-block text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded mb-3">
                      {s.tag}
                    </div>
                    <p className="text-sm text-muted-foreground m-0 leading-relaxed">
                      {s.desc}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Callout type="tip" title="Try before you flash">
        Once you've picked a GSI, don't go straight to flashing — boot it temporarily with{" "}
        <strong>DSU Sideloader</strong> first. If it works, then flash for real. If it doesn't, just reboot and you're back on stock with zero damage. See the next page →
      </Callout>

      <Callout type="warning" title="Verify before you flash">
        Always check the file's SHA256 (most release pages publish one). A corrupt download will brick you faster than a wrong command. And never install GSIs from random Telegram links you can't trace back to the original developer.
      </Callout>

      {/* File compression */}
      <div>
        <h3 className="text-xl font-bold tracking-tight mb-3">A note on the file extension</h3>
        <div className="prose dark:prose-invert max-w-none prose-emerald">
          <p>
            GSIs usually come compressed: <code>.img.xz</code>, <code>.img.gz</code>, or zipped. Before flashing, you need the raw <code>.img</code> file.
          </p>
          <ul>
            <li><strong>.xz files</strong> — open with <a href="https://www.7-zip.org/" target="_blank" rel="noreferrer">7-Zip</a> on Windows, or <code>xz -d filename.img.xz</code> on Mac/Linux.</li>
            <li><strong>.gz files</strong> — same tools as above, or <code>gunzip filename.img.gz</code>.</li>
            <li><strong>.zip files</strong> — just extract the way you normally would.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Heads up: an extracted GSI can easily be 2–4 GB. Make sure you have the disk space.
          </p>
        </div>
      </div>
    </div>
  );
}
