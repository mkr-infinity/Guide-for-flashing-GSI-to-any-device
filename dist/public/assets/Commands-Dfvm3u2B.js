import{j as t}from"./index-DSOv8b6W.js";import{C as o}from"./CodeBlock-DWALXIYW.js";import"./check-B__9X2qC.js";function i(){return t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"mb-8",children:[t.jsx("h1",{className:"text-4xl font-extrabold tracking-tight",children:"All Commands"}),t.jsx("p",{className:"text-lg text-muted-foreground mt-2",children:"The cheat sheet. For when you've done this before and just want the copy-paste."})]}),t.jsxs("div",{className:"prose dark:prose-invert max-w-none prose-emerald",children:[t.jsx("h3",{children:"The full flow"}),t.jsx(o,{code:`# 1. Reboot to bootloader
adb reboot bootloader

# 2. Confirm fastboot sees the device
fastboot devices

# 3. Disable verified boot
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img

# 4. Reboot to fastbootd (Android 10+)
fastboot reboot fastboot

# 5. (Optional) Free up space if needed
fastboot delete-logical-partition product

# 6. Flash the GSI
fastboot flash system GSI-FILENAME.img

# 7. Wipe everything
fastboot -w

# 8. Reboot
fastboot reboot`}),t.jsx("h3",{children:"Useful diagnostic commands"}),t.jsx(o,{code:`# What slot is currently active?
fastboot getvar current-slot

# What's my device codename?
fastboot getvar product

# Is the bootloader unlocked?
fastboot getvar unlocked

# List all variables fastboot knows about
fastboot getvar all`}),t.jsx("h3",{children:"If things go wrong"}),t.jsx(o,{code:`# Boot a recovery image without flashing it (handy for testing)
fastboot boot recovery.img

# Flash boot image (if your GSI ships its own)
fastboot flash boot boot.img

# Switch active A/B slot
fastboot --set-active=a
fastboot --set-active=b`}),t.jsx("p",{className:"text-sm text-muted-foreground mt-6",children:"Pro tip: drag and drop image files into the terminal instead of typing the full path. Saves typos. Saves sanity."})]})]})}export{i as default};
