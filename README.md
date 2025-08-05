### Some important terms u need to know before flashing a GSI😊
```
{arm|a64|arm64}_{a|b}{v|g}{N|S}-{vndklite|secure|personal}
|               |    |    |     |
|               |    |    |     vndklite: For VNDKLite devices,
|               |    |    |               or for read-writeable /system on regular devices
|               |    |    |     secure: Superuser removed and system props spoofed,
|               |    |    |             for better chances of passing SafetyNet
|               |    |    |     personal: With personal mods, for reference
|               |    |    |
|               |    |    N: No Superuser
|               |    |    S: *Built* with PHH Superuser (app needed)
|               |    |    (Z): *Built* with eremitein's Dynamic Superuser (not offered here)
|               |    |
|               |    v: Vanilla, i.e. no GAPPS
|               |    g: With regular GAPPS
|               |    o: With Android Go GAPPS
|               |    (f): With built-in MicroG and FLOSS replacements of GAPPS (not offered here)
|               |
|               a: "A-only", i.e. system-as-system (deprecated since Android 12)
|               b: "AB", i.e. system-as-root
|
arm: ARM 32-bit (deprecated since Android 12)
a64: ARM 32-bit with 64-bit binder
arm64: ARM 64-bit
```


### Another guide by KAIF for flashing a GSI image file to any of your ofcourse 😅 ANDROID Devices ios users regret 😂.(don't mind i bunked my English classes)
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
After 3 minutes or 5 minutes later you  can see count as 1/13 or like this👇👇👇 <br>
then wait untill this process complets.![Fastboot flash system system.img.png](https://github.com/mkr-infinity/Guide-to-unlocking-bootloader/assets/125804924/636a3fcf-4bc1-44db-85fb-2f6e42661455)
>[!NOTE]
>After this commnad this will take approx. 5 minutes to show something like 1/13 or 1/something . <br>
>please be patient untill all completed , Do not press any button and anything just to avoid errors.<br>
>this process takes 15 or 20 mintes to complete the system flash.<br>

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





![Image](https://github.com/user-attachments/assets/1679d9f8-c877-427d-9969-e44ade67cb41)
## 🍾 Support My Work 🥳

If you find my work valuable, consider supporting me through the following platforms.  <br>
Your contributions help me continue developing and maintaining open-source projects!.

<br>

### 🌟 Crypto Donations 😇


-  <img width="147" height="56" alt="Image" src="https://github.com/user-attachments/assets/4240bc46-a3ac-4ce2-9b69-432e8dfa0067" />
 **TON (The Open Network)**
  
  ```
  UQDTX8QV6csepk9U1-dGzhoPfE4MUZTzAjjVE6YVIKVWuVj1
  ```

  Send Toncoin☝️☝️ or anything based on TON to support my projects on The Open Network (TON).
![Image](https://github.com/user-attachments/assets/1679d9f8-c877-427d-9969-e44ade67cb41)

<br>




- <img width="800" height="201" alt="Image" src="https://github.com/user-attachments/assets/f3c84e84-9011-4470-97d6-f4b395e5c3a1" />
 **Etherium**
  
  ```
   0x56dC57B9D03C6b947e49a28edC7e18FBe383365a
  ```

Send Anything(Token/NFT) on Etherium Chain.

![Image](https://github.com/user-attachments/assets/1679d9f8-c877-427d-9969-e44ade67cb41)
<br>




- <img width="2584" height="384" alt="Image" src="https://github.com/user-attachments/assets/a642c5e6-216b-43bd-90be-65097cf4f9f3" />
 **Solana**

  ```
  9JEjaDCfe9esp6ECpyww7Gm3NUcieiy7hMU1pKMQVWxP
  ```
  Send Anything(Token) In Solana Chain.

![Image](https://github.com/user-attachments/assets/1679d9f8-c877-427d-9969-e44ade67cb41)


<br>




![rainbow](https://github.com/NiREvil/vless/assets/126243832/1aca7f5d-6495-44b7-aced-072bae52f256)
### 💖 Support Via Telegram

<img width="250" height="75" alt="Image" src="https://github.com/user-attachments/assets/fe380ea4-6526-423e-8a66-2385918dcea5" />

- ⭐ You can send ***NFT*** OR ***Stars*** directly to me on [Telegram](https://t.me/mkr_infinity)
  
- 💬 [Contact @mkr_infinity](https://t.me/mkr_infinity)

*Note: Please include your GitHub username when donating NFTs so I can thank you!*

![rainbow](https://github.com/NiREvil/vless/assets/126243832/1aca7f5d-6495-44b7-aced-072bae52f256)

