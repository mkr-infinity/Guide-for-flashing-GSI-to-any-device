##### Another guide by KAIF for flashing a GSI image file to any of your ANDROID Device that is compitable with it.
<br>

[Samsung user please check before starting](#samsung-devices)

1. **Check Compatibility:** Ensure your device supports GSI and [unlock bootloader](https://github.com/mkr-infinity/Guide-to-unlocking-bootloader).
2. **Download GSI:** Get the compatible GSI file for your device.
3. **Install ADB and Fastboot:** Set up Android Debug Bridge (ADB) and Fastboot on your computer.
4. **Backup Data:** Back up important data on your device as flashing may erase data.
5. **Enable USB Debugging:** Enable USB debugging and OEM unlocking in Developer Options on your device.
6. **Boot into Fastboot Mode:** Power off your device, then boot into Fastboot mode by holding specific button combination.
7. **Connect Device:** Connect your device to the computer via USB cable.
8. **Flash GSI:** Use Fastboot commands to flash the GSI onto your device.
9. **Reboot:** Once flashed, reboot your device.
10. **Set up Device:** Set up your device as required.

>[!TIP]
>Make sure you follow each step carefully. <br>
>just keep patient and be ready.

## HOW TO FLASH A GSI

1. Get [Platform Tools](https://developer.android.com/studio/releases/platform-tools#downloads)

2. Get vbmeta.img from Stock ROM or [Google](https://dl.google.com/developers/android/qt/images/gsi/vbmeta.img)

4. Get desired GSI

5. Boot into bootloader mode:
```
adb reboot bootloader
```
6. Flash the vbmeta you got from step two
```
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
```
👆Here you can remove ```vbmeta.img``` and drag and drop the vbmeta file.

4. Boot into fastbootd
```
fastboot reboot fastboot
```
5. Flash GSI
 ```
fastboot flash system GSI-FILENAME.img

```
👆Here also remove ```GSI-FILENAME.img``` and drag and drop the ```gsi .img``` file <br>

If fastboot tells you there isn't enough place, you can try to delete ```product/system_ext partitions```.  <br>
I recommend flash an empty image on thems to avoid problems with magisk.
```
fastboot flash product placebo.img
fastboot flash system_ext placebo.img
```
👆Here also u can remove ```placebo.img``` and drag and drop the placebo.img file <br>
And try to flash GSI again (step 5)

7. Go back to recovery, command  `fastboot reboot recovery` then perform "Factory reset / Wipe data"

8. Reboot and enjoy😇🥳. <br>

>[!TIP]
>FIRST USE OFFLINE SET-UP MODE.




## SAMSUNG DEVICES

Vbmeta must be flashed trough Odin/Heimdall and isn't required to boot for some devices.

Requires patched recovery to access fastbootd
https://github.com/Johx22/Patch-Recovery

Flash it through Odin/Heimdall.
Boot it and select enter fastboot (fastbootd)
