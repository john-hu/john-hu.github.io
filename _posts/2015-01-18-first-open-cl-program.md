---
layout: post
title: My first Open CL program
description: "An example of Open CL program"
modified: 2015-01-18
tags: [Open CL, Open Source]
---

Open CL is an open spec in heterogeneous parallel programming. As a front-end engineer, it should not be related to my field. But it's so interesting that I want to learn more about it. This is my first Open CL program at [here](https://github.com/john-hu/pyopencl-example).

Before writing atheny code, I am searching for scripting language binding of Open CL. It's so pitty that I cannot find a good JavaScript binding of it since JavaScript is my primary programming language in Mozilla. So, the alternative is Python. The python binding of opencl is pyopencl. You may find a lots articles in google to know how to install it.

After googling, a good example can be found [here](https://github.com/benshope/PyOpenCL-Tutorial). So, I try to expose my owned codes. If you guys know other good examples, please let me know. I will be very happy to list yours in my site.

My first examle is "histogram". Before discussing it, let me explain a little bit about histogram if you don't know it. A histogram is a spectrum of R, G, B color. There are so many types of histogram. Here is R, G, B histogram instead of graylevel histogram, or other color space's histogram.

Before using Open CL, I tried to write a small piece of Open CL code. The first part moved to Open CL is the R, G, B counting. The program looks like:

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
 
  for (i = 0; i < RESULT_SIZE; i++) {
    result[baseResultIdx + i] = 0;
  }
 
  unsigned int processIndex = 0;
  while (processIndex < BIN_SIZE && (basePixelIdx + processIndex < maxPixel)) {
    // data partition of bytes is RGBRGBRGB....
    bValue = bytes[basePixelIdx * 3 + processIndex * 3];
    // result partition is RR..RRGG..GGBB..BB.
    result[baseResultIdx + bValue]++;
    // G
    bValue = bytes[basePixelIdx * 3 + processIndex * 3 + 1];
    result[baseResultIdx + 256 + bValue]++;
    // B
    bValue = bytes[basePixelIdx * 3 + processIndex * 3 + 2];
    result[baseResultIdx + 512 + bValue]++;
    processIndex++;
  }
}
```

As you seen, I tried to use a work item to process 1024 pixels. The `bytes` argument is the raw pixel data which is partitioned in RGBRGBRGB...RGB for each bytes. We have to check the `pixelCount` because the last work item may not need to process a full 1024 pixels array. So, I use `(basePixelIdx + processIndex < maxPixel)` for the check. The `result` argument are temporary result for each work item. So, the array is so huge. In this case, if we have 1000 work items, we will have 768,000 unsigned integer at this argument. I know the performance may not be good. But it's nice to have a simple logic in the first example. The `result` field is partitioned in RRR...RRRGGG...GGG.BBB...BBB. This is for compatible with python image module.

The python code to invoke this kernel code is:

```python
...
def opencl_histogram(pixels):
  # format of pixels is RGBRGBRGB each of character in a byte
  # calculate buffer size
  groupSize = 4
  binSize = 1024
  pixelSize = len(pixels) / 3 
  trunkSize = int(math.ceil(math.ceil(pixelSize / groupSize) / binSize))
  globalSize = int(math.ceil(pixelSize / binSize))
  globalSize += (groupSize - globalSize % groupSize)
  # buffer size is 768(whole space) * group size * trunk size
  outputBufSize = 768 * groupSize * trunkSize
  #create context/queue
  clContext = cl.create_some_context()
  clQueue = cl.CommandQueue(clContext)
  f = open('histogram.c', 'r')
  fstr = ''.join(f.readlines())
  # create the program
  clProgram = cl.Program(clContext, fstr).build()
  # create buffers
  mf = cl.mem_flags
  bufPixels = cl.Buffer(clContext, mf.READ_ONLY | mf.USE_HOST_PTR, hostbuf=pixels)
  bufPixelSize = cl.Buffer(clContext, mf.READ_ONLY | mf.USE_HOST_PTR, size=4, hostbuf=numpy.asarray([pixelSize]).astype(numpy.uint32))
  bufOutput = cl.Buffer(clContext, mf.WRITE_ONLY, size=outputBufSize * 4, hostbuf=None)
  clProgram.histogram(clQueue, (globalSize, ), (groupSize, ), bufPixels, bufPixelSize, bufOutput)
  semiFinal = numpy.zeros(outputBufSize, dtype=numpy.uint32)
  evt = cl.enqueue_read_buffer(clQueue, bufOutput, semiFinal)
  evt.wait()
 
  finalResult = [0] * 768
  for i in range(outputBufSize):
    finalResult[i % 768] += semiFinal[i]
 
  return finalResult
 
parser = argparse.ArgumentParser(description='Dump histogram data.')
parser.add_argument('--input', help='the input image')
parser.add_argument('--dump', help='dump the histogram if specify any value')
 
args = parser.parse_args()
 
if args.input is None:
  parser.print_help()
  sys.exit(1)
print ('trying to build histogram data for {}'.format(args.input))
 
image = Image.open(args.input)
 
...
print ('-' * 20)
 
start_time = time()
histogramG = opencl_histogram(image.tobytes())
end_time = time()
print ('time elapsed with open cl: {0}s'.format(end_time - start_time))
...
```

After Open CL computation, we need to merge each work items' results into a single 768 array.

The performance of this code is very poor since we need to do so many useless loops to merge each work items' results into a single 768 array.

I have another [branch](https://github.com/john-hu/pyopencl-example/tree/single-work-group/histogram) which have better performance but with some known issues or limitations. I will write another article to say how I did.

BTW, I am reading "[Open CL Programming by Example](https://www.amazon.com/OpenCL-Programming-Example-Ravishekhar-Banger/dp/1849692343/ref=sr_1_sc_1?ie=UTF8&qid=1421575665&sr=8-1-spell&keywords=Open+CL+Programming+by+Example)" now, but only finished 4 chapters. I will continue to update my code to improve the performance.
