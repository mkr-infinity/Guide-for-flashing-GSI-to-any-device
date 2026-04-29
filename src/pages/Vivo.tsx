import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Vivo() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Vivo · iQOO</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The most locked-down brand of the lot. Be honest with yourself before you start.
        </p>
      </div>

      <BrandSpec
        difficulty="Mostly Locked"
        difficultyNote="Most retail models cannot be unlocked"
        rows={[
          { label: "Unlock method", value: <span className="text-red-600 dark:text-red-400 font-medium">No official method for retail Vivo / iQOO global models</span> },
          { label: "Exception", value: <>A few <strong>India-only iQOO</strong> models have community unlock tools (XDA model thread)</> },
          { label: "Fastboot trigger", value: <>Volume Up + Power (only works if unlocked)</> },
          { label: "vbmeta partitions", value: <>Often <code>vbmeta_a</code> / <code>vbmeta_b</code> instead of plain <code>vbmeta</code></> },
          { label: "Slot quirk", value: <>Check active slot with <code>fastboot getvar current-slot</code> first</> },
          { label: "Recommendation", value: <>Don't try unless an active XDA thread for your exact model says it works</> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="warning" title="Most Vivo / iQOO phones cannot be officially unlocked">
          Vivo, like Oppo, generally does not provide a way to unlock the bootloader for retail devices. There is no "fastboot oem unlock" that just works. This means GSI flashing is <strong>not possible</strong> on most Vivo / iQOO phones unless someone in the community has reverse-engineered an unlock method for your specific model.
        </Callout>

        <h3>Before you start: check XDA</h3>
        <p>
          Search "<em>[your exact model] bootloader unlock</em>" on XDA Developers. If there's no thread or only "we still can't unlock this" replies, sadly this guide doesn't apply to you. I'd love to be more helpful here — but I'm not going to send you down a rabbit hole that ends with a brick.
        </p>

        <h3>If your model IS unlockable</h3>
        <p>
          A handful of older or India-only iQOO models have community unlock tools. The general flow looks like:
        </p>
        <ol>
          <li>Find the unlock tool in the model-specific XDA thread (often a custom Mi Unlock-style app).</li>
          <li>Sign in, bind the device, wait the required period.</li>
          <li>Run the unlock tool while the phone is in fastboot mode.</li>
          <li>Once unlocked, the GSI flashing process is the standard one:</li>
        </ol>

        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="note" title="Funtouch OS / OriginOS quirks">
          Vivo's skin sometimes uses non-standard partition names. If <code>vbmeta</code> fails, look for <code>vbmeta_a</code>/<code>vbmeta_b</code>. If <code>system</code> fails, double-check your active slot with <code>fastboot getvar current-slot</code> and try <code>fastboot flash system_a</code> instead.
        </Callout>

        <Callout type="tip" title="Honest advice">
          If you really want a clean Android experience and you're shopping for a phone, pick a brand that officially supports unlocking — Pixel, Motorola, OnePlus, Xiaomi, Nothing. It saves a ton of pain. Vivo / iQOO are great hardware but the worst for modding.
        </Callout>
      </div>
    </div>
  );
}
