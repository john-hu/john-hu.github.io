---
layout: post
title:  Centered Square Box in CSS
description: "How to create a centered square box only with CSS?"
modified: 2019-09-07
tags: [CSS Tricks, Browser]
---

# Requirements

Recently, John Hu would like to work on the font design and creation. At first, I chose the Inkscape to create the SVG font because it has a good SVG font editor. After a few days, the Inkscape cannot open the file properly. That file is created by the Inkscape. I cannot believe it. Why does the Inkscape have this kind of issue. So, John Hu decide to create some simple tools to generate a square box for the font template. The requirements are:

* It must be in the center of the screen.
* It must be a square box.
* It must be adaptive to the screen size. The square box should fill the screen, the width/height is equal to the short side.
* It must be a pure CSS settings without any JavaScript calculations.

I googled centered square box or adaptive square box. I found this post: [https://spin.atomicobject.com/2015/07/14/css-responsive-square/](https://spin.atomicobject.com/2015/07/14/css-responsive-square/). Nice idea. I can finish an example to fulfill these requirements.


# How to Do It?

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="john-hu" data-slug-hash="MWgrEdV" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Responsive centered box">
  <span>See the Pen <a href="https://codepen.io/john-hu/pen/MWgrEdV/">
  Responsive centered box</a> by John Hu (<a href="https://codepen.io/john-hu">@john-hu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

There are a few tricks at this example:

## Horizontal Center and Vertical Center

The horizontal center is the simplest one, just use `text-align` to a block container. But the vertical center is relatively hard. We use a lot of ways to deal with it. Recently, John Hu likes to use the `flexbox` to center them. We can see the `.container` class at CSS section uses `justify-content: center` to center the items in the main-axis which is the horizontal and uses `align-items: center` to center items in the the cross-axis which is the vertical. Please note we don't change the `flex-direction` which has `row` in default. So, if we change add the `flex-direction` the direction of of `justify-content` and `align-items` will be reversed.

## Square Box

John Hu learned this tricks at a few years ago. We need to create a box whose width is the same as height. It would be very easy to set both width and height. But how to do it if we only want to set the width and let height adapt its width. The tricky part is at the `padding-top` or `padding-bottom`. We can see the definition of `percentage` value at [MDN doc](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top):

> The size of the padding as a percentage, relative to the width of the containing block. Must be nonnegative.

If we sent the value 100% to the `padding-top` or `padding-bottom`, we can have a square box. So, we can find the `.square` and `.square:after` using this trick. We use the `after` pseudo element to display as block which has 100% width by default. And we use `padding-bottom: 100%` to make the .square to be a square box. Then, according to [the post](https://spin.atomicobject.com/2015/07/14/css-responsive-square/), we use `position: absolute` at the `.content` area and let it be 100% in both width and height.

## Fit in the Screen Adaptively

We can use the new CSS length unit `vh` and `vw` to have the size based on the viewport size. At first version, John Hu uses the `orientation` media query to detect the short side. After checking [MDN length doc](https://developer.mozilla.org/en-US/docs/Web/CSS/length), we can use the `vmin` to know the short side of the viewport. That make the example simpler. We can find the `width` of the `.square` element is `80vmin` which is the 80% of the short side of the viewport.

## No JavaScript

Yes! We don't use any lines of JavaScript to finish this example. We can find the full codepen here: [https://codepen.io/john-hu/pen/MWgrEdV/](https://codepen.io/john-hu/pen/MWgrEdV/)
