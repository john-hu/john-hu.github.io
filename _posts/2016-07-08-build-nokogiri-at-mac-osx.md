---
layout: post
title: Build nokogiri 1.6.8 at Mac OS X 10.11
description: "how to build nokogiri at mac os x"
modified: 2016-07-08
tags: [Programming]
---

Since we need to use a jekyll theme, it has a dependency on nokogiri. If you cannot install it just with "gem install nokogiri". Please check this post.

This is the error message we met:

```
Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.

    /Users/hchu/.rvm/rubies/ruby-2.0.0-p247/bin/ruby extconf.rb

Using pkg-config version 1.1.7
checking if the C compiler accepts ... yes
checking if the C compiler accepts -Wno-error=unused-command-line-argument-hard-error-in-future... no
Building nokogiri using packaged libraries.
Using mini_portile version 2.1.0
checking for iconv.h... yes
checking for gzdopen() in -lz... yes
checking for iconv... yes

************************************************************************

IMPORTANT NOTICE:

Building Nokogiri with a packaged version of libxml2-2.9.4.

Team Nokogiri will keep on doing their best to provide security

updates in a timely manner, but if this is a concern for you and want

to use the system library instead; abort this installation process and

reinstall nokogiri as follows:

    gem install nokogiri -- --use-system-libraries
        [--with-xml2-config=/path/to/xml2-config]
        [--with-xslt-config=/path/to/xslt-config]


If you are using Bundler, tell it to use the option:

    bundle config build.nokogiri --use-system-libraries
    bundle install

Note, however, that nokogiri is not fully compatible with arbitrary

versions of libxml2 provided by OS/package vendors.

************************************************************************

Extracting libxml2-2.9.4.tar.gz into tmp/x86_64-apple-darwin12.3.0/ports/libxml2/2.9.4... OK
Running 'configure' for libxml2 2.9.4... OK
Running 'compile' for libxml2 2.9.4... ERROR, review '/Users/hchu/.rvm/gems/ruby-2.0.0-p247/gems/nokogiri-1.6.8/ext/nokogiri/tmp/x86_64-apple-darwin12.3.0/ports/libxml2/2.9.4/compile.log' to see what happened. Last lines are:

========================================================================

    unsigned short* in = (unsigned short*) inb;

                         ^~~~~~~~~~~~~~~~~~~~~
encoding.c:815:27: warning: cast from 'unsigned char *' to 'unsigned short *' increases required alignment from 1 to 2 [-Wcast-align]

    unsigned short* out = (unsigned short*) outb;

                          ^~~~~~~~~~~~~~~~~~~~~~
4 warnings generated.
  CC       error.lo
  CC       parserInternals.lo
  CC       parser.lo
  CC       tree.lo
  CC       hash.lo
  CC       list.lo
  CC       xmlIO.lo
xmlIO.c:1450:52: error: use of undeclared identifier 'LZMA_OK'

    ret =  (__libxml2_xzclose((xzFile) context) == LZMA_OK ) ? 0 : -1;
                                                   ^

1 error generated.

make[2]: *** [xmlIO.lo] Error 1
make[1]: *** [all-recursive] Error 1
make: *** [all] Error 2
```

We found the root cause is the following two things:

1. Lacking of libxml2 2.9.4
1. use of undeclared identifier 'LZMA_OK'

Our MBP had already installed libxml2 before but it is old version. You may check your version through:

```shellscript
brew list libxml2
```

If it is not libxml2 2.9.4. Please use the following commands to upgrade it:

```shellscript
brew update
brew upgrade libxml2
```

After that, if you cannot install nokogiri 1.6.8 with the same error. Please check your xcode-selected. We found an issue of nokogiri which is exactly the same one. The main clue to fix it is:

```shellscript
xcode-select --install
```

Hope this helps...

