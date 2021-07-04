---
title: 使用clang的python绑定cindex解析C++文件
date: 2019-08-10
modified: 2019-08-10
category: C++, python
tags: C++, python
authors: 长恨安歌
summary: 使用clang的python绑定cindex解析C++文件
---

在Python中，对于C语言进行分析的话，可以使用pycparser，但是如果对C++进行分析的话，只有clang的Python绑定Cindex了。

## 安装
cindex随着clang发行，在github的位置是[https://github.com/llvm-mirror/clang/blob/master/bindings/python/clang/cindex.py]，
但是安装比较繁琐。

不论是windows还是linux，第一步都是安装clang，windows直接去官方下载二进制即可，注意选择将path环境变量自动添加。

有人将cindex放到到pypi中取名为clang，[https://pypi.org/project/clang/]，这样就可以直接通过pypi安装了。

```shell
pip install clang
```

在Python中调用时，Windows应该已经可以使用了，Linux需要配置libclang.so的路径。如：
```Python
from clang.cindex import Config
Config.set_library_file("/usr/lib/llvm-4.0/lib/libclang-4.0.so.1")
Config.set_library_path("/usr/lib/llvm-4.0/lib")
```

## 简单介绍

```Python
import clang.cindex
from clang.cindex import Index, CursorKind

# 一整个项目的索引对应一个Index
index = Index.create()

# 一个翻译单元对应一个文件。可以接受提供给gcc的所有参数
translation_unit = index.parse(sys.argv[1])

# cursor是translation_unit的一个最重要的属性，对应的是语法树的根节点。
root_node = translation_unit.cursor

# 这个节点的枚举类型,例如CursorKind.FUNCTION_DECL
print(root_node.kind)

# 这个节点的源代码名字？
print(root_node.spelling)

# 这个节点在源代码的位置
print(root_node.location)

# 这个节点的子节点
print(root_node.get_children())

extent信息比get_location()丰富一些

# 获取分词结果
cur.get_tokens()
```

## 常用方式

```Python
from clang.cindex import Index, CursorKind

g_index = Index.create()

def parse_string(s, filename="<memory_file>.cpp"):
    """
    利用unsaved_files的参数特性，直接载入内存中的源代码
    """
    return g_index.parse(filename, None, unsaved_files=[(filename, s)]).cursor


```

分析下面的C++代码
``` C++
class Person {
};


class Room {
public:
    void add_person(Person person)
    {
        // do stuff
    }

private:
    Person* people_in_room;
};


template <class T, int N>
class Bag<T, N> {
};


int main()
{
    Person* p = new Person();
    Bag<Person, 42> bagofpersons;

    return 0;
}
```



    测试目录 D:\workspace\cparser_plus