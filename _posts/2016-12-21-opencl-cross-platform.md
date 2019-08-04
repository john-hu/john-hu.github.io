---
layout: post
title:  OpenCL cross platform??!!
description: "A discussion on Open CL"
modified: 2016-12-21
tags: [Programming, Open CL]
---

"Write Once, Run Anywhere" is a magic slogon from Java. In theory, OpenCL should have similar characteristic. But, it doesn't. There are few reasons:

* OpenCL doesn't have byte-code module. We should generate mediate code on the platform we want to run. This one should be easy to conquer.
* Memory model are different across GPU and CPU. We are newbies to OpenCL. We found that the same code with different platform, Intel and NVIDIA. Intel gives us OUT_OF_RESOURCES error, but NVIDIA doesn't. You may wonder that how large the memory is. In our PC, it has 8GB main memory which can be used by Intel CPU and 4GB display memory for NVIDIA. This PC has dual GPU, Intel HD Graphics 530 and NVIDIA 950m.
* Barrier behavior are different. In the code [here](https://github.com/PyOCL/oclGA/blob/8ed20ea6a6233b5c08aa5afe59e9bfc9168b2b6a/evaluation/oclGA/cl/shuffler_chromosome.c#L263-L274), we have a early return which is before a barrier. The NVIDIA platform gives us result, but Intel just gives us segmentation fault. The correct behavior is segmentation fault because we doesn't make sure every work item passes the barrier.
* Work item size are a big question. As item 2, we have two GPU, Intel HD Graphics 530 and NVIDIA 950m. The work item size of Iris is so small comparing to NVIDIA 950m. This doesn't make sense. Because Intel HD Graphics 530 supports OpenCL 2.0 which can access main memory directly. It should have the same behavior of Intel CPU but it doesn't....

We are still searching for the answer for the above questions and inconsistency. If you knows the answer, please don't hasitate to tell us.

BTW, we do not say that NVIDIA is superior but the inconsistency of OpenCL at different platforms.