import { Card, CardContent } from "@/components/ui/card";

export default function Community() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Help & About</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Get Help</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Stuck? Don't suffer alone. Reach out — bricked phones love company.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <a href="https://t.me/mkr_infinity" target="_blank" rel="noreferrer" className="no-underline block h-full">
          <Card className="hover:border-[#0088cc] transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-[#0088cc]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.64 3.73-.53.37-1.01.54-1.44.53-.48-.01-1.41-.27-2.1-.49-.85-.27-1.51-.42-1.45-.88.03-.24.38-.49 1.04-.76 4.08-1.78 6.79-2.92 8.16-3.48 3.88-1.6 4.69-1.85 5.17-1.86.11 0 .34.03.48.13.12.09.16.21.17.33.01.07.01.16 0 .26z"/></svg>
              </div>
              <h3 className="font-semibold text-xl m-0 mb-1">DM me on Telegram</h3>
              <p className="text-sm text-muted-foreground m-0">@mkr_infinity</p>
              <p className="text-xs text-muted-foreground mt-2">Best for quick questions and panic moments</p>
            </CardContent>
          </Card>
        </a>

        <a href="https://t.me/lenovotbx306xchat" target="_blank" rel="noreferrer" className="no-underline block h-full">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
              </div>
              <h3 className="font-semibold text-xl m-0 mb-1">Telegram Group Chat</h3>
              <p className="text-sm text-muted-foreground m-0">Lenovo TB-X306X &amp; GSI talk</p>
              <p className="text-xs text-muted-foreground mt-2">A community of fellow GSI flashers</p>
            </CardContent>
          </Card>
        </a>
      </div>

      <div className="mt-8 prose dark:prose-invert max-w-none prose-emerald">
        <h3>Other places to look for help</h3>
        <ul>
          <li><strong>XDA Developers</strong> — search for your exact device model. Almost every Android phone has a thread with people who have flashed GSIs on it.</li>
          <li><strong>r/Android</strong> &amp; <strong>r/AndroidQuestions</strong> on Reddit — for general "why is this happening" questions.</li>
          <li><strong>Phh's Treble repository</strong> on GitHub — the source for the most popular GSIs. Issues there often mirror what you're seeing.</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          When you ask for help, always include: your phone model, Android version, GSI file name, what command you ran, and the exact error. The more info, the faster someone can help.
        </p>
      </div>
    </div>
  );
}
