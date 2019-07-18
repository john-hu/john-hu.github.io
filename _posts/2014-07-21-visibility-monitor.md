---
layout: post
title: Visibility monitor in Gecko and Gaia
description: "The visibility monitor implementation of Gecko and Gaia"
modified: 2014-07-21
tags: [mozilla, Firefox OS]
---

# What Is the Visibility Monitor?

An app with a lots images brings memory pressure in mobile world. In Android, they tries to recycle the existing UI elements to show images. The original image is freed automatically when the UI element's image source is changed. That's handled by Java's reference count, IIRC.

We have similar tricks in Firefox OS. Gecko, the core engine of Firefox, has an image [visibility monitor](http://dxr.mozilla.org/mozilla-central/source/layout/generic/nsGfxScrollFrame.cpp#2262) tool. It releases the uncompressed image when an image is out of screen, but keeps its DOM structure for other updates. That brings you a fast and easy way to manage your gallery view.

Besides Gecko, Gaia, the code name of apps level of Firefox OS, also has a [visibility monitor](https://github.com/mozilla-b2g/gaia/blob/master/shared/js/tag_visibility_monitor.js). It tells the app which UI element is in or out of screen. We can use it to free or load image on to img element. It helps Gallery app out of memory presure issues.

The difference between Gecko's version and Gaia's version is that the Gecko version releases the uncompressed image but keeps the raw image which is compressed image downloaded from server, like JPEG or PNG. The Gaia version takes images off the UI element which releases both uncompressed and compressed images. The memory usage of Gaia version is lower than Gecko version. But the scrolling performance, FPS, of the Gaia version is worse than Gecko version because the Gecko needs to download the images from server or file system in the Gaia version. This document focuses on the Gaia version.

# How Does It Work?

<figure>
    <img src="/images/mozilla/visibility-monitor.png" alt="The example of visibility monitor">
    <figcaption>The example of visibility monitor</figcaption>
</figure>

The above image is the definition of each area of a scrollable frame. We have pre-rendered area, display port area, margin area, and non-rendered area to comprise the all area. Images in pre-rendered area are loaded, uncompressed and rendered. The full area is the height of display port + 2 x margin. The display port is the real area shown on the screen. The margin area provides a buffer to make scrolling more smooth. The larger margin area brings the higher FPS and larger memory consumption. The default vaue of margin in Gecko version is a size of display port area. We don't have the default value in Gaia version.

# Visibility Monitor API ([link](https://github.com/mozilla-b2g/gaia/blob/cab9e0dd0dee93f31f12313d012e660f074663cf/shared/js/tag_visibility_monitor.js#L14))

There is only one function in tag visibility monitor, which is monitorTagVisibility. It takes 6 arguments:

1. container: the scrollable element we want to monitor the children
2. tag: the tag to monitor
3. scrollMargin: the size of margin area
4. scrollDelta:  how much the container needs to be scrolled before onscreen and offscreen are recalculated. The higher value means callbacks fired less frequently, but there are more of them when they are fired/
5. onscreenCallback: called with the element that is now onscreen
6. offscreenCallback: called with the element that is now offscreen

An example can be found at Gallery app in [v1.3t](https://github.com/mozilla-b2g/gaia/blob/15c6f09cba250132eb25fadb33fd0472e3a9bfdd/apps/gallery/js/gallery.js#L371-L380) branch:

```javascript
  var visibilityMargin = 360;
  var minimumScrollDelta = 1;
 
  visibilityMonitor =
    monitorTagVisibility(thumbnails, 'li',
                         visibilityMargin, // extra space top and bottom
                         minimumScrollDelta, // min scroll before we do work
                         thumbnailOnscreen, // set background image
                         thumbnailOffscreen); // remove background image
```

The `thumbnails` is the DOM element container which hosts all thumbnail items. The tag name of thumbnail item is "li" according to this example. We use 360 which is the 3/4 height of the screen size and 1 as the scrollDelta. We just set or remove the background image in the onscreen/offscreen callbacks.

# The Performance of Visibility Monitor

We choose the low-end device, Tarako, to show the performance of it.

The memory consumption of Music app without visibility monitor is:
```
├──23.48 MB (41.04%) -- images
│  ├──23.48 MB (41.04%) -- content
│  │  ├──23.48 MB (41.04%) -- used
│  │  │  ├──17.27 MB (30.18%) ── uncompressed-nonheap
│  │  │  ├───6.10 MB (10.66%) ── raw
│  │  │  └───0.12 MB (00.20%) ── uncompressed-heap
│  │  └───0.00 MB (00.00%) ++ unused
│  └───0.00 MB (00.00%) ++ chrome
```
The memory consumption of Music app with visibility monitor is:
```
├───6.75 MB (16.60%) -- images
│   ├──6.75 MB (16.60%) -- content
│   │  ├──5.77 MB (14.19%) -- used
│   │  │  ├──3.77 MB (09.26%) ── uncompressed-nonheap
│   │  │  ├──1.87 MB (04.59%) ── raw
│   │  │  └──0.14 MB (00.34%) ── uncompressed-heap
│   │  └──0.98 MB (02.41%) ++ unused
│   └──0.00 MB (00.00%) ++ chrome
```
It seems we have large improvement in memory consumption.
