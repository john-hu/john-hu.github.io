---
layout: post
title: The Cost of Open CL
description: "The time cost of open CL"
modified: 2015-01-22
tags: [Open CL, Open Source]
---

One of my workmate had experiences on Open CL. We had a discussion on the improvement of histogram. And I learned that we should calculate the cost of Open CL before applying Open CL to a topic. The cost of Open CL is the time that we prepared everything for running Open CL. If the cost is larger than sequence code, we would never get any improvement with Open CL. But in most of cases, we will introduce a lot of calculation to Open CL. So, I wrote a program to measure the cost.

The program is pretty simple. We only measure the followings:

1. creating context and queue
2. reading file from disk
3. building the kernel program
4. creating buffer
5. running the kerner program

The python looks like:

```python
  def run(self):
    # measure elapsed time for creating context and queue
    tQueue = time()
    clContext = cl.create_some_context()
    clQueue = cl.CommandQueue(clContext)
    self.result.append({'type': 'create queue', 'time': (time() - tQueue)})
    # measure elapsed time for reading kernel program from file system
    tReadFile = time()
    f = open('baseline.c', 'r')
    fstr = ''.join(f.readlines())
    self.result.append({'type': 'read file', 'time': (time() - tReadFile)})
    # measure elapsed time for building the kernel program.
    tProgram = time()
    clProgram = cl.Program(clContext, fstr).build()
    self.result.append({'type': 'build program', 'time': (time() - tProgram)})
    # measure elapsed time for creating buffer.
    mf = cl.mem_flags
    pyBuffer = array('i', [0] * self.options.buffer_size)
    tBuffer = time()
    clBuffer = cl.Buffer(clContext, mf.READ_WRITE | mf.USE_HOST_PTR, hostbuf=pyBuffer)
    cl.enqueue_write_buffer(clQueue, clBuffer, pyBuffer).wait()
    self.result.append({'type': 'create buffer', 'time': (time() - tBuffer)})
    # measure elapsed time for running the program
    tRun = time()
    clProgram.baseline(clQueue, (self.options.buffer_size, ), None, clBuffer)
    self.result.append({'type': 'run program', 'time': (time() - tRun)})
    # we don't need to measure the time for reading data back because we use
    # `USE_HOST_PTR` which creates the buffer in main memory instead of GPU's.
    return self.result
```

The kernel program only does a atom_inc function call:

```c++
__kernel void baseline(__global unsigned int* data)
{
  atom_inc(&data[get_global_id(0)]);
}
```

The cost of Open CL in my Makbook Pro are:

```shellscript
Intel(R) Core(TM) i7-3540M CPU @ 3.00GHz
========================================
buffer size (in int): 1048576
create queue: 0.006128s
read file: 0.000031s
build program: 0.006540s
create buffer: 0.000191s
run program: 0.000128s
----------------------------------------
total: 0.013018s
========================================

HD Graphics 4000 GPU
========================================
buffer size (in int): 1048576
create queue: 0.010630s
read file: 0.000050s
build program: 0.006650s
create buffer: 0.001557s
run program: 0.000194s
----------------------------------------
total: 0.019081s
========================================
```

It looks not bad.

The URL of this program is: [https://github.com/john-hu/pyopencl-example/tree/master/baseline](https://github.com/john-hu/pyopencl-example/tree/master/baseline)
