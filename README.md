<div align="center">
  <img src="./logo.svg" width="96" height="96" alt="GSI Flashing Guide logo">
  <h1>GSI Flashing Guide</h1>
  <p>A practical guide for flashing Generic System Images on Project Treble Android devices.</p>

  <p>
    <a href="https://gsiflash.netlify.app/">Open Netlify Site</a>
    ·
    <a href="https://mkr-infinity.github.io/Guide-for-flashing-GSI-to-any-device/">Open GitHub Pages</a>
  </p>
</div>

---

## What This Covers

- GSI basics, file naming, and Project Treble checks.
- Bootloader unlock preparation and safety warnings.
- vbmeta, fastbootd, dynamic partitions, wipe, and reboot flow.
- Brand-specific notes for Samsung, Xiaomi, Oppo/Realme/OnePlus, Vivo/iQOO, Motorola, Pixel, Nothing, Asus, Sony, Huawei/Honor, LG, and MediaTek devices.
- Troubleshooting, command cheat sheet, tool links, and device report template.

## Current Data Notes

Last reviewed: June 17, 2026.

- TrebleDroid is the active continuation point for the old Phh/Treble wiki.
- Sony's official unlock page still warns about DRM/warranty risk and lists some US Xperia IV variants as not bootloader-unlockable.
- mtkclient is active in 2026 and documents newer V6/protected MediaTek loader behavior.
- Brand unlock policies change often; always confirm your exact model, region, carrier, firmware, and chipset before flashing.

## Local Development

```bash
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run build
```

For GitHub Pages-compatible output, this project uses relative assets so it works under the repository path and custom domains.

## Support

If this guide helped, star the repo or use the Support page on the website. Device reports and corrections are welcome through GitHub issues.
