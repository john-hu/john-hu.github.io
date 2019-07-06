---
layout: post
title: Inaccurate floating point at JavaScript
description: "How to deal with inaccurate floating point at JavaScript"
modified: 2014-05-12
tags: [JavaScript, jsperf]
---

This is a famous problem in computer world. It is originated from the IEEE 754 spec and binary system. Let's see the problem at JavaScript:

```javascript
var a = 0.2 + 0.4;
console.log(a);
```

In most browser, we may have the value 0.600...0001. It is very anonying when we want to show a value with decimal point. There are a lot of methods to deal with it. We focus on `round` and `parseFloat`:

1. `Math.round(a * 10) / 10`

2. `parseFloat(a.toFixed(1))`

I believe that you will say method 1 has high performance. But how faster it has?

Please see the result here: [http://jsperf.com/round-vs-tofix-parsefloat](http://jsperf.com/round-vs-tofix-parsefloat)
