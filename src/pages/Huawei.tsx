import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { BrandSpec } from "@/components/BrandSpec";

export default function Huawei() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">By Brand</div>
        <h1 className="text-4xl font-extrabold tracking-tight">Huawei · Honor</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The hardest brand to flash. I'll be straight with you about whether it's even worth trying.
        </p>
      </div>

      <BrandSpec
        difficulty="Very Hard"
        difficultyNote="Often paid third-party services only"
        rows={[
          { label: "Official unlock", value: <span className="text-red-600 dark:text-red-400 font-medium">Killed by Huawei in July 2018 — no official method since</span> },
          { label: "Workaround", value: <>Paid third-party services like <strong>DC-Unlocker</strong>, HCU Client, or Huawei ID-based tools (~$20–$80)</> },
          { label: "Honor (post-2020)", value: <>Honor split off from Huawei — slightly easier on a few new models, still no official path</> },
          { label: "EMUI / HarmonyOS quirk", value: <>HarmonyOS NEXT (2024+) replaces Android underneath — GSI is impossible on those models</> },
          { label: "vbmeta partitions", value: <>Multiple — <code>vbmeta</code>, <code>vbmeta_system</code>, <code>vbmeta_vendor</code></> },
          { label: "Brick recovery", value: <><strong>HiSuite</strong> + DLOAD mode + leaked stock firmware (.app files)</> },
          { label: "What you lose", value: <span className="text-red-600 dark:text-red-400 font-medium">Camera AI, Mate/P series Leica processing, secure folder, Huawei Pay</span> },
        ]}
      />

      <div className="prose dark:prose-invert max-w-none prose-emerald">
        <Callout type="warning" title="Read this before you spend a single dollar">
          Huawei is the brand I get the most "I bricked it, please help" messages about. Their bootloader is genuinely locked down at the hardware level on most models. Many "unlock services" online are scams. Many that aren't scams still <em>permanently brick</em> a percentage of devices. If your phone is your daily driver and you can't afford to replace it, please don't try this on a Huawei.
        </Callout>

        <h3>Step 1 — Check if your model is even unlockable</h3>
        <p>
          Before anything else, search XDA: "<em>[your exact model] bootloader unlock 2024</em>". If the most recent threads are full of "still impossible" / "service stopped working", that's your answer. The list of unlockable Huawei/Honor models shrinks every year.
        </p>
        <ul>
          <li><strong>Pre-2018 models</strong> (Mate 9, P10, Honor 8, Honor View 10): used to unlock with a free code from Huawei's own site. That site is dead, but old codes still float around on XDA — search by your serial number.</li>
          <li><strong>2018–2020 models</strong> (Mate 20, P20, Honor 10, Honor 20): need paid third-party services. Mixed success rate.</li>
          <li><strong>2021+ Huawei models</strong> (Mate 40+, P50+, P60, Mate 50+): essentially locked. No reliable method.</li>
          <li><strong>Honor 2021+</strong> (Magic series, Honor 50+): a few models have community methods — check XDA per model.</li>
        </ul>

        <h3>Step 2 — Get an unlock code (if your model supports it)</h3>
        <p>For the <strong>old models</strong> that still work:</p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot oem unlock UNLOCK_CODE`}
        />
        <p className="text-sm text-muted-foreground">
          The <code>UNLOCK_CODE</code> is a 16-digit number tied to your specific device serial. There is no formula — you either have the code (from old Huawei site backups, paid services, or community databases) or you don't.
        </p>

        <Callout type="note" title="DC-Unlocker is the most-used paid service">
          If you must pay, <a href="https://www.dc-unlocker.com/" target="_blank" rel="noreferrer">DC-Unlocker</a> is the most established service for Huawei/Honor unlocks. Costs $20–$80 depending on the model. Read XDA threads to confirm it currently works on your exact firmware version before paying — services sometimes stop working after Huawei pushes new firmware.
        </Callout>

        <h3>Step 3 — Flash the GSI (standard process, but careful)</h3>
        <p>Once unlocked, the flashing process is normal — just multi-vbmeta:</p>
        <CodeBlock
          code={`adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot --disable-verity --disable-verification flash vbmeta_system vbmeta.img
fastboot --disable-verity --disable-verification flash vbmeta_vendor vbmeta.img
fastboot reboot fastboot
fastboot flash system GSI-FILENAME.img
fastboot -w
fastboot reboot`}
        />

        <Callout type="warning" title="Google services won't be there">
          Modern Huawei devices (post-2019) ship without Google Mobile Services thanks to US sanctions. After flashing a GSI you'll <em>get</em> Google services back — but the camera quality and many hardware features will degrade because the AOSP HAL doesn't know about Huawei's custom Kirin/Hisilicon hardware extensions.
        </Callout>

        <h3>Honest recommendation</h3>
        <p>
          If you bought a Huawei phone specifically for Huawei's camera or HarmonyOS experience, flashing a GSI throws away most of what you paid for. If you got one second-hand and want to try a clean Android, give it a shot — but accept that this is the highest-risk brand in this guide.
        </p>

        <Callout type="tip" title="Better alternative">
          On many locked Huawei/Honor models, you <em>can</em> still install <strong>microG</strong> (a privacy-friendly Google Play replacement) and a launcher to get a much cleaner experience without flashing anything. Worth trying first.
        </Callout>
      </div>
    </div>
  );
}
