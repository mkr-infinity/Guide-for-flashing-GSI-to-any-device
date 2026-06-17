import { Card, CardContent } from "@/components/ui/card";
import { Bug, Github, MessageCircle, Search, Send } from "lucide-react";

export default function Community() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Help & About</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Get Help</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Stuck? Send the exact details once. Good reports get fixed faster than panic messages.
        </p>
      </div>

      <div className="border border-border bg-card p-5">
        <h2 className="text-lg font-bold tracking-tight">Copy this help template</h2>
        <p className="mt-1 text-sm text-muted-foreground">Paste it on Telegram, GitHub, XDA, or TrebleDroid. Fill every line you can.</p>
        <div className="mt-4 border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground/85">
          Device model / codename:<br />
          Region / carrier / chipset:<br />
          Stock firmware Android version:<br />
          GSI name and Android version:<br />
          Treble Check result:<br />
          Bootloader state:<br />
          Exact command used:<br />
          Exact error text or photo:
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <a href="https://t.me/mkr_infinity" target="_blank" rel="noreferrer" className="no-underline block h-full">
          <Card className="hover:border-[#0088cc] transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 border border-[#0088cc]/30 bg-[#0088cc]/10 flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-[#0088cc]" />
              </div>
              <h3 className="font-semibold text-xl m-0 mb-1">DM me on Telegram</h3>
              <p className="text-sm text-muted-foreground m-0">@mkr_infinity</p>
              <p className="text-xs text-muted-foreground mt-2">Best for quick checks when you include the template above</p>
            </CardContent>
          </Card>
        </a>

        <a href="https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device/issues/new?title=%5BMistake%5D+&body=**Page%3A**+%0A%0A**Device%3A**+%0A%0A**What%27s+wrong%3F**+%0A%0A**Suggested+fix+or+source%3A**+%0A" target="_blank" rel="noreferrer" className="no-underline block h-full">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 border border-primary/30 bg-primary/10 flex items-center justify-center mb-4">
                <Github className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl m-0 mb-1">Report guide issue</h3>
              <p className="text-sm text-muted-foreground m-0">GitHub issue</p>
              <p className="text-xs text-muted-foreground mt-2">Best for wrong commands, outdated brand info, or missing warnings</p>
            </CardContent>
          </Card>
        </a>

        <a href="https://t.me/lenovotbx306xchat" target="_blank" rel="noreferrer" className="no-underline block h-full">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 border border-primary/30 bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl m-0 mb-1">Telegram Group Chat</h3>
              <p className="text-sm text-muted-foreground m-0">Lenovo TB-X306X &amp; GSI talk</p>
              <p className="text-xs text-muted-foreground mt-2">A community of fellow GSI flashers</p>
            </CardContent>
          </Card>
        </a>
      </div>

      <div className="mt-8 prose dark:prose-invert max-w-none">
        <h3>Other places to look for help</h3>
        <ul>
          <li><strong>XDA Developers</strong> — search for your exact model number and codename, not just the marketing name.</li>
          <li><strong>r/Android</strong> &amp; <strong>r/AndroidQuestions</strong> on Reddit — for general "why is this happening" questions.</li>
          <li><strong>TrebleDroid</strong> on GitHub — Phh's old Treble wiki was archived in 2025 and now points users to TrebleDroid.</li>
          <li><strong>Official support pages</strong> — Motorola, Sony, Nothing, Google, and Asus often publish unlock or recovery notes that beat random mirrors.</li>
        </ul>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-border bg-card p-4 text-sm">
          <Bug className="mb-2 h-5 w-5 text-red-500" />
          <div className="font-bold">Do not hide the failed command</div>
          <p className="mt-1 text-muted-foreground">The exact terminal output is often more useful than a long story.</p>
        </div>
        <div className="border border-border bg-card p-4 text-sm">
          <Search className="mb-2 h-5 w-5 text-primary" />
          <div className="font-bold">Search before flashing again</div>
          <p className="mt-1 text-muted-foreground">If three people with your codename report the same bootloop, stop and read that thread.</p>
        </div>
      </div>
    </div>
  );
}
