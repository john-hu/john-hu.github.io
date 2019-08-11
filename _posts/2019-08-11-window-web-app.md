---
layout: post
title:  How to Add a Web as Application at Windows?
description: "How to Add a Web as Application at Windows?"
modified: 2019-08-11
tags: [Windows, Browser, Google Keep]
---

## Requirement

I brought a new small PC, Surface Go, for quick writings. My idea is to write some articles at this PC and mobile phone. So, the software requirements are:

* It must support Windows. I don't want to install native Linux on a Surface Go device because most of the hardware we cannot use, like touch screen, surface pen, etc.
* It must support Android and Mac OS. My main computer is still a MacBook Pro and my main mobile phone is still an Android phone. So, the app must support these three platform. That would be greate if it supports iOS.
* It must be private because I want to write primitive or naive ideas and I don't want others to see them.
* It should support rich text format, like HTML editor, or Word. I may need to format the text as a header, bullet item, etc.
* It should be small and easy to open
* It would be nice to support mark-down

Unfortunately, I didn't find a good writing software. So, I keep use Google Keep as the writing software. At lease, it support 4 of 6 items. If you know one, please tell me through my [email](im@john.hu).

## Web App

It's long time that I don't use a Windows box, about 11 years ago. I totally forgot how to use it. After some googling and configuration, I found a ancient feature that runs a web as an app. This was a cool feature call [active desktop](https://en.wikipedia.org/wiki/Active_Desktop). It was invented at Windows 95 and IE 4.0. I didn't use it before but just heard of it. IIRC, it didn't have a lot of users. Fortunately, All chromium-based browsers support a similar feature, create shortcut, which runs a web as an app. We can find it at the `Option` menu / `More tools` / `Create shortcut`:

<figure>
    <a href="/images/windows/chrome-create-shortcut.png">
        <img src="/images/windows/chrome-create-shortcut.png" alt="The place to create a shortcut">
    </a>
    <figcaption>The place to create a shortcut</figcaption>
</figure>

After a shortcut is created, we can find the web is running in the chromeless mode:

<figure>
    <a href="/images/windows/google-keep-shortcut.png">
        <img src="/images/windows/google-keep-shortcut.png" alt="The google keep shortcut as an example">
    </a>
    <figcaption>The google keep shortcut as an example</figcaption>
</figure>

## Fullscreen

At Android app, we can use a fullscreen editor to write a short story which gives us focus. But at the browser version, it has a small editor dialog. That's too bad:

<figure>
    <a href="/images/windows/google-keep-small-editor.png">
        <img src="/images/windows/google-keep-small-editor.png" alt="Small editor mode of Google Keep">
    </a>
    <figcaption>Small editor mode of Google Keep</figcaption>
</figure>

I go to Chrome Web Store to find a tool to make it fullscreen. Ha ha.. There is one extension which can make the editor in fullscreen, called *[Google Keep - Full Screen Edit](https://chrome.google.com/webstore/detail/google-keep-full-screen-e/kcfmkpjpemonceecfpgamaahlkfpjhdk)*. After installed it, the Google Keep web app can support fullscreen editing. That's awesome!!
