---
title: 上手quickjs
date: 2019-07-31
modified: 2019-07-31
category: C++, python
tags: C++, python
authors: 长恨安歌
summary: Short Summary
---

闲逛github看到了https://github.com/quickjs-zh/QuickJS，上次还在新闻上看到了。这个zh项目只是做了一点翻译，有点像是盗版的。

为了在WSL上玩一下，执行以下命令
```shell
wget https://bellard.org/quickjs/quickjs-2019-07-28.tar.xz
tar -xJf quickjs-2019-07-28.tar.xz
cd quickjs-2019-07-28/
make
# 报错/usr/include/features.h:367:25: fatal error: sys/cdefs.h: No such file or directory
sudo apt install libc6-dev-i386
make
./qjs
```

编译成动态链接库试一下，尝试了半天终于成功了
```
gcc -fPIC -shared -DCONFIG_VERSION=\"2019-07-09\" -D_GNU_SOURCE -DCONFIG_BIGNUM quickjs.c libunicode.c libregexp.c cutils.c quickjs-libc.c libbf.c -o libquickjs.so
```

在Python中用ctypes调用一下试一试
```
from ctypes import *
js = cdll.LoadLibrary('./libquicKjs.so')
<CDLL './libquickjs.so', handle 7ffff2716d20 at 0x7f346d4101d0>
js.JS_NewRuntime.restype = c_void_p
rt = js.JS_NewRuntime()
>>> rt
140737261618464
>>> type(rt)
<class 'int'>
```

用cython尝试写一个wrapper
```shell
mkdir python
cd python
touch cquickjs.pyd
touch quickjs.pyx
touch setup.py
```

setup.py的内容基本是固定的，参考
- [http://docs.cython.org/en/latest/src/tutorial/clibraries.html]简单介绍写wrapper的setup.py的写法
- [http://docs.cython.org/en/latest/src/userguide/source_files_and_compilation.html]详细介绍setup.py的写法
- [https://docs.python.org/3/distutils/apiref.html#distutils.core.Extension]列举Extension的参数，相当于给gcc传递参数
```python
# setup.py
from distutils.core import setup
from distutils.extension import Extension
from Cython.Build import cythonize

define_macros=[('CONFIG_VERSION','"2019-07-09"'), ('_GNU_SOURCE', ''), ('CONFIG_BIGNUM', '')]
sources=['../quickjs.c', '../libunicode.c', '../libregexp.c', '../cutils.c', '../quickjs-libc.c', '../libbf.c']

ext = Extension("quickjs", 
        ["quickjs.pyx"]+sources, 
        define_macros=define_macros,
        include_dirs=['..'],
)

setup(ext_modules = cythonize([ext]))
# python setup.py build_ext -i
```
https://raw.githubusercontent.com/quickjs-zh/quickjspp/master/quickjspp.hpp
