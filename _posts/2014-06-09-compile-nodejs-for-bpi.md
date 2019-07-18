---
layout: post
title: Compile node.js for Banana Pi
description: "A hint to compile the node.js executable for Banana Pi"
modified: 2014-06-09
tags: [Maker]
---

Since I used Lubuntu for Banana Pi, the compiling procedure is similar to cubieboard. We can download the source from node.js and do the `configure` and `make`. But there is one thing different. We have to configure with an extra argument, otherwise we get the segmentation fault:

```console
./configure --without-snapshot
```
