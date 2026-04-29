import { Callout } from "@/components/Callout";
import { StepImage } from "@/components/StepImage";
import brickWarning from "@/assets/brick-warning.png";

export default function RisksWarnings() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Risks & Warnings</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Read this part. Future-you will thank me.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <p className="text-lg leading-relaxed">
          I am not going to sugarcoat it — flashing a GSI is messing with the heart of your phone's software. Most of the time it just works. Sometimes it doesn't. Here's what you should know before we start.
        </p>

        <StepImage
          src={brickWarning}
          alt="A phone wrapped in caution tape, joking that a wrong move turns it into a brick"
          caption="Worst case: your phone becomes a fancy paperweight. Best case: nothing exciting happens."
          size="small"
        />

        <Callout type="warning" title="You can soft-brick your device">
          If something goes wrong mid-flash, your phone might refuse to boot. The good news: 99% of the time this is fixable by flashing the stock firmware back. The bad news: it requires patience and Googling.
        </Callout>

        <Callout type="warning" title="All your data will be wiped">
          We have to factory-reset at the end. Backup your photos, messages, WhatsApp chats, game saves, 2FA codes — everything. Don't say I didn't warn you.
        </Callout>

        <Callout type="warning" title="Sign out of your Google account FIRST (FRP lockout)">
          Android has a feature called <strong>Factory Reset Protection (FRP)</strong>. If you flash or factory-reset while a Google account is still signed in, the new ROM will demand that exact account's password on first boot — and many GSIs ship with broken Google sign-in flows, so even with the right password you can get permanently locked out.
          <br /><br />
          <strong>Before you start:</strong> go to Settings → Accounts → remove every Google account, then remove your Samsung/Mi/OPPO account too. Same for any work / school account. Then proceed.
        </Callout>

        <Callout type="note" title="Your warranty is going bye-bye">
          Unlocking the bootloader voids your warranty on most brands. On some (Samsung, Huawei) it also trips Knox/security flags that you can't undo.
        </Callout>

        <Callout type="note" title="Banking and payment apps may stop working">
          Google Pay, banking apps, Netflix HD, some games (BGMI, etc.) check for an unmodified system. After flashing a GSI they might refuse to run. There are workarounds, but expect some friction.
        </Callout>

        <Callout type="tip" title="Take a deep breath">
          The flashing itself looks scary because the screen freezes for what feels like forever. It's normal. Don't unplug, don't press buttons, don't panic. Snacks help.
        </Callout>

        <p className="text-base mt-8">
          Still in? Let's get your toolbox ready in the next page.
        </p>
      </div>
    </div>
  );
}
