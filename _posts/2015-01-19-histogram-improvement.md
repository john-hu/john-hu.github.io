---
layout: post
title: Open CL Color Histogram - Improvement Attempt
description: "The improvement code of color histogram"
modified: 2015-01-19
tags: [Open CL, Open Source]
---

As we known, it is faster to use local memory or private memory in Open CL. To compare them, I had made a test on it. Before doing that, we may find the time elapsed of each part:

* Open CL usage: about 0.9s (look fair)
* Merging semiResult to finalResult: 18s (too bad)

It is very clear that the bottleneck is merging semiResult to finalResult.

If we use Python Image Library's histogram function, the elapsed time only took: 1.5s with the same picture, images/7728x4354.jpg.

## Private Memory

For private memory testing, it still worths to use private memory in the kernel code without changing others. The [commit](https://github.com/john-hu/pyopencl-example/commit/6d9740671793479204a389adb83a48ceefed48bb) is a test of private memory. Since we need to save the result to the global memory `result`, we may save the result to private memory and try to copy them to global memory. If we look closer to the number of access of global memory, it still the same while using global memory. So, the kernel code looks like:

```c++
// 1024 pixels per work item.
#define BIN_SIZE 1024
#define RESULT_SIZE 768
 
__kernel void histogram(__global unsigned char* bytes, __global unsigned int* pixelCount,
                        __global unsigned int* result)
{
  unsigned int lid = get_local_id(0);
  unsigned int gid = get_group_id(0);
  unsigned int gsize = get_local_size(0);
  unsigned int globalId = get_global_id(0);
 
  unsigned int i, bValue;
  unsigned int basePixelIdx = lid * BIN_SIZE + gid * gsize * BIN_SIZE;
  unsigned int baseResultIdx = globalId * RESULT_SIZE;
  unsigned int maxPixel = *pixelCount;
  unsigned int privateBuffer[RESULT_SIZE];
 
  for (i = 0; i < RESULT_SIZE; i++) {
    result[baseResultIdx + i] = 0;
  }
 
  unsigned int processIndex = 0;
  while (processIndex < BIN_SIZE && (basePixelIdx + processIndex < maxPixel)) {
    // data partition of bytes is RGBRGBRGB....
    bValue = bytes[basePixelIdx * 3 + processIndex * 3];
    // result partition is RR..RRGG..GGBB..BB.
    privateBuffer[bValue]++;
    // G
    bValue = bytes[basePixelIdx * 3 + processIndex * 3 + 1];
    privateBuffer[256 + bValue]++;
    // B
    bValue = bytes[basePixelIdx * 3 + processIndex * 3 + 2];
    privateBuffer[512 + bValue]++;
    processIndex++;
  }
 
  for (i = 0; i < RESULT_SIZE; i++) {
    result[baseResultIdx + i] = privateBuffer[i];
  }
}
```

I created a 768 unsigned int array for temporary storage and copied all of them to global memory `result`. The improvement seems not good. The elapsed time of Open CL looks the same, about 0.9s.

## First Attempt to Move the Merging Code to Open CL

Since we already knew the bottleneck, I had moved the [merging code](https://github.com/john-hu/pyopencl-example/commit/8f6a3fc3f443a5703c567bc5269ce01bb787a7fd) from sequence CPU to Open CL. I still kept a huge temporary result for each work item, 768 unsigned integers for each work item. But the difference is the final result is calculated at Open CL. I used the lastest 768 work items to copy each temporary result to final result. If we have 100 work items, there are 768 * 100 read operations on global memory and 768 write operations on global memory. In the previous version, only 768 write operations on global memory was needed. I know we need to loop all of the pixels and this part is the same. The following is the partial kernel code of this version:

```c++
  // Only use the latest 768 work items to copy the data. We assume that the
  // latest 768 work items are the last group executes.
  unsigned int lastGroup = totalTasks - RESULT_SIZE;
 
  for (i = 0; i < RESULT_SIZE; i++) {
    privateBuffer[i] = 0;
  }
  if (globalId >= lastGroup) {
    finalResult[globalId] = 0;
  }
 
  unsigned int processIndex = 0;
  while (processIndex < BIN_SIZE && (basePixelIdx + processIndex < maxPixel)) {
    ...(the same)
  }
 
  for (i = 0; i < RESULT_SIZE; i++) {
    tempResult[baseResultIdx + i] = privateBuffer[i];
  }
 
  barrier(CLK_GLOBAL_MEM_FENCE);
 
  if (globalId >= lastGroup) {
    for (i = 0; i < totalTasks; i++) {
      finalResult[globalId - lastGroup] += tempResult[globalId - lastGroup + i * RESULT_SIZE];
    }
  }
```

The result had significant improvement on the speed. Since we don't have the merging code in python, the Open CL part became: about 2.5s. It runs faster than before but still slower than Python Image Library.

## Conclusion

There are two things can be improved:

* trying to use local memory to save the temporary result
* use work group to test if any improvement earned.
