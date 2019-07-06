---
layout: post
title: Android recovery mode screenshot
description: "How to take a screenshot for android recovery mode"
modified: 2014-02-12
tags: [Android]
image:
  path: /images/android/recovery-screenshot.png
  feature: android/recovery-screenshot.png
---

Screenshot is a best tool to give a direction for novices. We had used it to demostrate a lot of methods to flash custom ROMs into our Android devices. The Android SDK provides different methods to take a screenshot at normal Android mode but none for Recovery mode.

To make it possible, John Hu had done some researches and found the following url: 

[http://forum.xda-developers.com/showthread.php?p=40260716](http://forum.xda-developers.com/showthread.php?p=40260716)

That's a nice tool to take a screenshot at Recovery mode and it works pretty good. But it only has Windows version. That's too bad becase John Hu doesn't have any Windows box. So, John Hu created a porting to Mac OS X and Linux. You may find the source and executable files at 

[https://github.com/john-hu/android-recovery-screenshot](https://github.com/john-hu/android-recovery-screenshot)

To run it, we may need to do the following thing:

1. download the code
2. reboot your device into recovery mode
3. plug-in USB cable
4. run "screenshot_run_me.sh" or "screenshot_run_me.bat"
5. find your screenshot file at the folder

At TWRP recovery ROM, we may need to wait for a few seconds to make sure the device is connected with your PC after you see the recovery mode screen. Or you can use `adb devices` to check if the device is already connected with your computer.

A screenshot example can be found at:

<figure>
    <img src="/images/android/recovery-screenshot.png" alt="Example of TWRP screenshot">
    <figcaption>Example of TWRP screenshot</figcaption>
</figure>

Note:

* We need root authority to mount the partition if you use the device offical recovery.
* Pleae run the script at the folder it is.
