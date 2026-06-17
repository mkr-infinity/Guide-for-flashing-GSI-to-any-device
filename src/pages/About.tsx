import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch, ShieldCheck, Wrench } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Help & About</div>
        <h1 className="text-4xl font-extrabold tracking-tight">About Me</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Who maintains this guide, what is tested, and what still needs community reports.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src="https://avatars.githubusercontent.com/u/125804924?v=4"
          alt="Author"
          className="w-32 h-32 rounded-none ring-4 ring-primary/20 shadow-lg object-cover shrink-0"
        />

        <div className="space-y-4 prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed m-0">
            Hey, I'm an Android tinkerer from India. I've been flashing ROMs and breaking phones since I was a teenager. This guide exists because the first time I tried to flash a GSI, I spent two days reading scattered XDA threads and almost bricked my Lenovo tablet — and I figured nobody else should have to do that.
          </p>

          <p className="text-lg leading-relaxed text-muted-foreground m-0">
            I personally test what I can, but I do not own every brand listed here. The Lenovo TB-X306X is my main test device; the brand pages are maintained from official unlock pages, XDA reports, TrebleDroid/Phh history, and user feedback from people flashing their own devices.
          </p>

          <p className="text-base m-0">
            If something is wrong, I want the exact model, region, firmware, GSI filename, and command output. That is how this guide stays useful instead of becoming another outdated flashing blog.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border border-border bg-card p-5">
          <Wrench className="mb-3 h-6 w-6 text-primary" />
          <h2 className="text-base font-bold">Practical first</h2>
          <p className="mt-2 text-sm text-muted-foreground">Commands are written for real recovery situations, not perfect lab devices.</p>
        </div>
        <div className="border border-border bg-card p-5">
          <ShieldCheck className="mb-3 h-6 w-6 text-emerald-500" />
          <h2 className="text-base font-bold">Safety over hype</h2>
          <p className="mt-2 text-sm text-muted-foreground">If a method is risky, region-locked, paid, or outdated, the guide should say that clearly.</p>
        </div>
        <div className="border border-border bg-card p-5">
          <GitBranch className="mb-3 h-6 w-6 text-sky-500" />
          <h2 className="text-base font-bold">Community maintained</h2>
          <p className="mt-2 text-sm text-muted-foreground">Device-specific updates are welcome through GitHub issues or Telegram reports.</p>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <Button variant="outline" asChild className="h-auto py-4 justify-start">
          <a href="https://github.com/mkr-infinity" target="_blank" rel="noreferrer" className="flex items-start gap-3">
            <div className="text-left">
              <div className="font-semibold">GitHub</div>
              <div className="text-xs text-muted-foreground">@mkr-infinity</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto mt-1" />
          </a>
        </Button>
        <Button variant="outline" asChild className="h-auto py-4 justify-start">
          <a href="https://t.me/mkr_infinity" target="_blank" rel="noreferrer" className="flex items-start gap-3">
            <div className="text-left">
              <div className="font-semibold">Telegram</div>
              <div className="text-xs text-muted-foreground">@mkr_infinity</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto mt-1" />
          </a>
        </Button>
        <Button variant="outline" asChild className="h-auto py-4 justify-start">
          <a href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader" target="_blank" rel="noreferrer" className="flex items-start gap-3">
            <div className="text-left">
              <div className="font-semibold">Bootloader Unlock Guide</div>
              <div className="text-xs text-muted-foreground">My beginner-friendly companion guide</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto mt-1" />
          </a>
        </Button>
        <Button variant="outline" asChild className="h-auto py-4 justify-start">
          <a href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device" target="_blank" rel="noreferrer" className="flex items-start gap-3">
            <div className="text-left">
              <div className="font-semibold">This Guide on GitHub</div>
              <div className="text-xs text-muted-foreground">Star it, fork it, fix my typos</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto mt-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}
