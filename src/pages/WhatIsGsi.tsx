import { Card, CardContent } from "@/components/ui/card";

export default function WhatIsGsi() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">What is a GSI?</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Let me explain what we're actually about to install on your phone.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <p className="text-lg leading-relaxed">
          GSI stands for <strong>Generic System Image</strong>. Think of it like a "universal Android" — one ROM file that can boot on tons of different phones, instead of being built specifically for your exact model.
        </p>

        <Card className="my-8 bg-muted/40 border-muted">
          <CardContent className="p-6 text-center">
            <p className="text-xl font-medium m-0">
              The car analogy I always use:<br />
              <strong className="text-primary">it's like swapping the engine of your car while keeping the body and wheels.</strong>
            </p>
          </CardContent>
        </Card>

        <h3>Why would I even want one?</h3>
        <ul>
          <li><strong>A cleaner Android</strong> — escape your manufacturer's bloatware (looking at you, MIUI ads).</li>
          <li><strong>Newer Android version</strong> — your manufacturer dropped updates? A GSI can give you Android 14 or 15 anyway.</li>
          <li><strong>Try custom ROMs without a device-specific port</strong> — LineageOS, Pixel Experience, crDroid… all available as GSIs.</li>
          <li><strong>Pure curiosity</strong> — see what stock Android actually looks like.</li>
        </ul>

        <h3>So how does it work?</h3>
        <p>
          Since Android 8, Google forced manufacturers to separate the Android system from the device-specific drivers. That separation is called <strong>Project Treble</strong>. Because of it, you can swap out the system part (the GSI) and the drivers stay where they are. That's the whole magic.
        </p>

        <p className="text-base text-muted-foreground italic">
          Bottom line: if your phone supports Project Treble (most phones from 2018 onward do), you can flash a GSI. We'll check that next.
        </p>
      </div>
    </div>
  );
}
