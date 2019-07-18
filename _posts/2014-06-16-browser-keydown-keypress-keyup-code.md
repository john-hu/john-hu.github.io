---
layout: post
title: JavaScript keyDown, keyPress, and keyUp event
description: "A test page to test keydown, keypress, and keyup"
modified: 2014-06-16
tags: [JavaScript]
---

## A Complex Thing: Keyboard Event?

Have you checked the keyCode for keyDown, keyPress, and keyUp events of browsers? The values of them are different. Some of them are ASCII code and some of them are printable key code, what?! We can find the detailed rules [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode). we can check [this](https://unixpapa.com/js/key.html) to know more about JavaScript keyboard event

It would be nice to have a page to test it. John Hu had created one for this purpose. Since the modern browsers will repeat the keyDown and keyPress, this page prints keyDown and keyPress while you hold the keys.

page: [http://jsfiddle.net/huchengtw/Wk7jR/show/](http://jsfiddle.net/huchengtw/Wk7jR/show/)

source: [http://jsfiddle.net/huchengtw/Wk7jR/](http://jsfiddle.net/huchengtw/Wk7jR/)
