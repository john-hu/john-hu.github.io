---
layout: post
title: Different Indentation on Different Languages in Sublime Text
description: "How to configure your sumbline to have different indentation on different language"
modified: 2015-02-19
tags: [Programming, IDE]
---

While writing programs in pyopencl, we should face the indentation of python and CL. According to the coding convention, python uses 4 spaces as the indentation and C uses 2 spaces as the indentation. So, we may want to configure our IDE to have different indentation on different programming languages.

As a user of Sublime Text, I found that the __*Syntax Specific*__ is the correct place to configure it. If we want to configure C to use 2 spaces as its default indentation, we can do the followings:

1. Open/create a C file
2. Open Syntax Specific at Preferences -> Settings-More -> Syntax Specific
3. use the following content as the opened file which should be C++.sublime-settings:

```json
{
  "tab_size": 2,
  "translate_tabs_to_spaces": true
}
```

It's so cool to have that.
