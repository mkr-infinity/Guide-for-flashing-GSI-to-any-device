### Another guide by KAIF for flashing a GSI image file to any of your ofcourse 😅 ANDROID Devices ios users regret 😂.
<br>

>[!WARNING]
>First check if your device is project treble supported or not by [Treble Check App](https://play.google.com/store/apps/details?id=tk.hack5.treblecheck). <br>
if it supporteed like this 😇
>![IMG_20240329_135907_489.jpg](https://github.com/mkr-infinity/Guide-to-unlocking-bootloader/assets/125804924/795d0bdc-e315-442c-a12d-f20d6292825e) then only proceed to next.
>If project treble is not supported then don't try this.
><br> Generally devices after Android 8,9 supports project treble.<br>
but check it to confirm.



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

3. Get desired GSI

4. Boot into bootloader mode:
```
adb reboot bootloader
```
5. Flash the vbmeta you got from step two
```
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
```
👆Here you can remove ```vbmeta.img``` and drag and drop the vbmeta file.
<br>
>[!TIP]
>You can skip this👆 process.

6. Boot into fastbootd
```
fastboot reboot fastboot
```
>[!TIP]
>NOT ALL DEVICES HAVE FASTBOOTD MODE. <br>
SO U CAN PROCEED WITH FASTBOOT MODE IF THIS COMMNAD NOT WORK.



6. Flash GSI
 ```
fastboot flash system GSI-FILENAME.img

```
👆Here also remove ```GSI-FILENAME.img``` and drag and drop the ```gsi .img``` file <br>


7. Go back to recovery, command  `fastboot reboot recovery` then perform "Factory reset / Wipe data"

8. Reboot and enjoy😇🥳. <br>

>[!TIP]
>FIRST USE OFFLINE SET-UP MODE😇.




## SAMSUNG DEVICES

Vbmeta must be flashed trough Odin/Heimdall and isn't required to boot for some devices.

Requires patched recovery to access fastbootd
https://github.com/Johx22/Patch-Recovery

Flash it through Odin/Heimdall.
Boot it and select enter fastboot (fastbootd) <br>



#### All commands used for..💁‍♂️
```
adb reboot bootloader
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot fastboot
fastboot delete-logical-partition product 
fastboot flash system system.img
```
👆I am writing these commands for whom who knows it very well not for everyone.

#### You can join these telegram groups for help.
[Lenovo TB-X306X](https://t.me/lenovotbx306xchat) 👈 join this for GSI and suppor. <br>
[Premium MODZ](https://t.me/mkrinfinity) 👈 join this for premium apk for free.

#### Connect with me🇮🇳.
<div id="badges">
  <a href="https://www.instagram.com/mkr_infinity/">
    <img src="https://img.shields.io/badge/Instagram-red?style=for-the-badge&logo=Instagram&logoColor=blue" alt="Instagram Badge"/>
  </a>  
</div>

<div id="badges">
  <a href="https://t.me/mkr_infinity">
    <img src="https://img.shields.io/badge/Telegram-red?style=for-the-badge&logo=telegram&logoColor=blue" alt="Instagram Badge"/>
  </a>  
</div>
