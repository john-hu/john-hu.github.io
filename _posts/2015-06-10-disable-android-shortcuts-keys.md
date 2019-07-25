---
layout: post
title: How to disable shortcuts at android without rooted?
description: "A way to disable special keys at android system"
modified: 2015-02-19
tags: [Android]
---

It's so nice to see android has keyboard shortcuts feature with [keyboard attached](http://www.howtogeek.com/175267/the-htg-guide-to-using-a-bluetooth-keyboard-with-your-android-device/). But it may be a little annoying that we want to use those keys to do what we want. John Hu had created another open source project called shun-feng-er which is a tool for eye impaired person. During this project, we need to override the behavior of those shortcuts.

As per [discussions](http://forum.xda-developers.com/xposed/modules/keyboard-utilities-t2872579/post55350032#post55350032) and [here](https://groups.google.com/forum/#!topic/android-platform/FhcVipMFZF4), it is not possible to disable it or overide it at app level. The solution I found is to use Xposed Framework to inject code at WindowManagerPolicy. This needs a rooted device. But it doesn't make sense to ask an user with hardware keyboard to have a rooted device. 

After some investigations, I found that there is a keyboard layout config called "apple wireless keyboard". It had change the meta key to home key. The most magic part is all shortcuts related to meta key are disabled, like META + C, META + TAB, etc That's amazing. So, I try to find how it does.

The main part is to remap the key, it only remaps META key to HOME key. This is its configuration:

```
# remap meta key
map key 125 F12
map key 126 F12
 
# remap alt key
map key 56  F11
map key 100 F11
```

We need to change the keyboard layout once connected. It can be made at Settings app -> Language and input -> Physical keyboard -> (tap it and choose new mapping config)

Please find the whole patch at [https://github.com/john-hu/shun-feng-er/commit/a2baf65e0407f294534560278b72474cb9f9dc13](https://github.com/john-hu/shun-feng-er/commit/a2baf65e0407f294534560278b72474cb9f9dc13).
