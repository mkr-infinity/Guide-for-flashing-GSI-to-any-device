import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Help & About</div>
        <h1 className="text-4xl font-extrabold tracking-tight">About Me</h1>
        <p className="text-lg text-muted-foreground mt-2">
          A few words about who's writing this guide.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src="https://avatars.githubusercontent.com/u/125804924?v=4"
          alt="Author"
          className="w-32 h-32 rounded-2xl ring-4 ring-primary/20 shadow-lg object-cover shrink-0"
        />

        <div className="space-y-4 prose dark:prose-invert max-w-none prose-emerald">
          <p className="text-lg leading-relaxed m-0">
            Hey, I'm an Android tinkerer from India. I've been flashing ROMs and breaking phones since I was a teenager. This guide exists because the first time I tried to flash a GSI, I spent two days reading scattered XDA threads and almost bricked my Lenovo tablet — and I figured nobody else should have to do that.
          </p>

          <p className="text-lg leading-relaxed text-muted-foreground m-0">
            Everything in this guide is tested by me personally. I started on the Lenovo TB-X306X (the only one I have lying around for daily testing) and gradually expanded the device pages by collecting tips from the community as people followed the guide on their own phones.
          </p>

          <p className="text-base m-0">
            If this guide helped you and you want to say thanks, the Support page is there. If you got stuck, the Get Help page has my Telegram. I usually reply within a day.
          </p>
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
