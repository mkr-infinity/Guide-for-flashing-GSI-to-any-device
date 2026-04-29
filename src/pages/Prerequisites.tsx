import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StepImage } from "@/components/StepImage";
import { Callout } from "@/components/Callout";
import trebleCheck from "@/assets/treble-check.png";
import usbDebug from "@/assets/usb-debug.png";

export default function Prerequisites() {
  const items: { label: React.ReactNode }[] = [
    { label: <>Project Treble support — verified with the <a href="https://play.google.com/store/apps/details?id=tk.hack5.treblecheck" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">Treble Check app</a></> },
    { label: <>Bootloader unlocked — follow my <a href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">Bootloader Unlock Guide</a></> },
    { label: <>USB Debugging + OEM Unlocking turned on (in Developer Options)</> },
    { label: <>A computer (Windows, Mac, or Linux)</> },
    { label: <>A real USB data cable (the cheap charging-only ones cause endless pain)</> },
    { label: <><a href="https://developer.android.com/studio/releases/platform-tools#downloads" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">Platform Tools</a> installed (gives you adb &amp; fastboot)</> },
    { label: <><code>vbmeta.img</code> — from your stock ROM or this <a href="https://dl.google.com/developers/android/qt/images/gsi/vbmeta.img" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">Google download</a></> },
    { label: <>The GSI <code>.img</code> file you want to flash</> },
    { label: <>All your data backed up (photos, contacts, WhatsApp, 2FA…)</> },
    { label: <>At least 50% battery on your phone</> },
    { label: <>Snacks. I'm serious.</> },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Prerequisites Checklist</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Don't skip this. Tick each box once you've got it ready.
        </p>
      </div>

      <Callout type="warning" title="Bootloader unlock comes first">
        Almost everything in this guide assumes your bootloader is already unlocked. If it isn't, you can't even start. I wrote a separate, beginner-friendly walkthrough for that — please go through it before continuing here:{" "}
        <a
          href="https://github.com/mkr-infinity/Guide-to-unlock-Bootloader"
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline"
        >
          Bootloader Unlock Guide →
        </a>
      </Callout>

      <Card className="border-primary/20 shadow-sm">
        <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start space-x-4">
              <Checkbox id={`prereq-${i}`} className="mt-1 h-5 w-5 rounded-md" />
              <label htmlFor={`prereq-${i}`} className="text-base font-medium leading-snug cursor-pointer text-foreground/90">
                {item.label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="prose dark:prose-invert max-w-none prose-emerald mt-12">
        <h2>1. Check Project Treble support</h2>
        <p>
          Install the <strong>Treble Check</strong> app from the Play Store and open it. If it shows a big green checkmark like in the picture below, you're good.
        </p>
        <StepImage
          src={trebleCheck}
          alt="Treble Check app showing a green checkmark for Project Treble support"
          caption="Green check = you can flash a GSI. Red X = sorry, this guide isn't for you."
          size="phone"
        />

        <Callout type="note">
          Generally any phone shipped with Android 9 or later supports Project Treble. Phones launched on Android 8 might or might not — that's why we check.
        </Callout>

        <h2>2. Turn on USB Debugging &amp; OEM Unlocking</h2>
        <p>
          On your phone, go to <strong>Settings → About phone</strong> and tap <strong>Build number</strong> seven times until it says "You are now a developer!". Then go to <strong>Settings → System → Developer options</strong> and turn on these two toggles:
        </p>
        <ul>
          <li><strong>USB debugging</strong> — lets your computer talk to your phone</li>
          <li><strong>OEM unlocking</strong> — required for fastboot to accept commands</li>
        </ul>
        <StepImage
          src={usbDebug}
          alt="Developer Options screen with USB debugging and OEM unlocking toggles enabled"
          caption="Both toggles ON. The path is similar on every brand — just look for 'Developer Options'."
          size="phone"
        />

        <h2>3. Install Platform Tools</h2>
        <p>
          Download <a href="https://developer.android.com/studio/releases/platform-tools#downloads" target="_blank" rel="noreferrer">Platform Tools</a>, unzip it somewhere easy to find (I keep mine on the Desktop in a folder called <code>platform-tools</code>). Inside you'll see <code>adb.exe</code> and <code>fastboot.exe</code> — those are the tools we'll use the entire guide.
        </p>

        <Callout type="tip" title="Open a terminal in that folder">
          Windows: hold <kbd>Shift</kbd> + right-click inside the platform-tools folder → "Open PowerShell window here". Mac/Linux: right-click → "Open in Terminal". This way you can just type <code>adb</code> and <code>fastboot</code> without typing the full path.
        </Callout>

        <h2>4. Install OEM USB drivers (Windows)</h2>
        <p>
          This is the step almost every guide skips, and it's the #1 reason "<code>adb devices</code> shows nothing" on Windows. Platform Tools alone is <strong>not enough</strong> — Windows also needs your specific phone brand's USB driver to recognize the device in fastboot mode.
        </p>
        <p>Install the driver matching your phone <em>before</em> you plug it in:</p>
        <ul>
          <li><strong>Pixel / Nexus / Generic AOSP:</strong> <a href="https://developer.android.com/studio/run/win-usb" target="_blank" rel="noreferrer">Google USB Driver</a></li>
          <li><strong>Samsung Galaxy:</strong> <a href="https://developer.samsung.com/android-usb-driver" target="_blank" rel="noreferrer">Samsung USB Driver for Mobile Phones</a> (required for Odin too)</li>
          <li><strong>Xiaomi / Redmi / POCO:</strong> Bundled with the <a href="https://miuirom.org/tools/mi-flash" target="_blank" rel="noreferrer">Mi Flash Tool</a> — install Mi Flash and the drivers come with it</li>
          <li><strong>OnePlus / Oppo / Realme:</strong> <a href="https://oneplususbdrivers.com/" target="_blank" rel="noreferrer">OnePlus USB Drivers</a> (works for all BBK brands)</li>
          <li><strong>Motorola:</strong> <a href="https://motorola-global-portal-en.custhelp.com/app/answers/prod_answer_detail/a_id/88481" target="_blank" rel="noreferrer">Motorola Device Manager</a></li>
          <li><strong>Sony Xperia:</strong> <a href="https://developer.sony.com/develop/drivers" target="_blank" rel="noreferrer">Xperia Drivers</a></li>
          <li><strong>Huawei / Honor:</strong> Bundled with HiSuite — install <a href="https://consumer.huawei.com/en/support/hisuite/" target="_blank" rel="noreferrer">HiSuite</a></li>
          <li><strong>LG:</strong> <a href="https://www.lg.com/us/support/mobile-support" target="_blank" rel="noreferrer">LG United Mobile Driver</a></li>
          <li><strong>Anything else / no clue:</strong> <a href="https://github.com/mkr-infinity/ADB-Fastboot_Drivers" target="_blank" rel="noreferrer">Universal ADB Driver</a> (covers most random brands and budget MTK phones)</li>
        </ul>

        <Callout type="note" title="Mac and Linux users — relax">
          You usually don't need anything extra. macOS recognizes most phones automatically. On Linux, you may need a one-line udev rule (Arch and Fedora have a <code>android-udev</code> package that handles this for you).
        </Callout>

        <Callout type="warning" title="If 'fastboot devices' still shows nothing">
          That means Windows didn't bind the right driver. Open <strong>Device Manager</strong> while the phone is in fastboot mode → look for "Android Device" or a yellow exclamation icon → right-click → <strong>Update driver</strong> → "Browse my computer" → point it at the platform-tools folder. That fixes it 95% of the time.
        </Callout>

        <p className="text-base mt-6">
          Once every box above is ticked, head to the next page. We'll decode those weird GSI file names so you pick the right one.
        </p>
      </div>
    </div>
  );
}
