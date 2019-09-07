---
Title: cython上手记录
Date: 2019-08-01
Modified: 2019-08-01
Category: Python
Tags: python, cython
Slug: cython
Authors: 长恨安歌
Summary: cython上手记录
---

cython是一个


## 比较def, cdef, cpdef
https://stackoverflow.com/questions/28362009/definition-of-def-cdef-and-cpdef-in-cython

The key difference is in where the function can be called from: def functions can be called from Python and Cython while cdef function can be called from Cython and C.

Both types of functions can be declared with any mixture of typed and untyped arguments, and in both cases the internals are compiled to C by Cython (and the compiled code should be very, very similar):
```python
# A Cython class for illustrative purposes
cdef class C:
   pass

def f(int arg1, C arg2, arg3):
    # takes an integer, a "C" and an untyped generic python object
    pass

cdef g(int arg1, C arg2, arg3):
    pass
```
In the example above, f will be visible to Python (once it has imported the Cython module) and g will not be and cannot be called from Python. g will translate into a C signature of:
```
PyObject* some_name(int, struct __pyx_obj_11name_of_module_C *, PyObject*)
```
(where` struct __pyx_obj_11name_of_module_C *` is just the C struct that our class C is translated into). This allows it to be passed to C functions as a function pointer for example. In contrast f cannot (easily) be called from C.

### Restrictions on `cdef` functions:

- cdef functions cannot be defined inside other functions - this is because there is no way of storing any captured variables in a C function pointer. E.g. the following code is illegal:
```
# WON'T WORK!
def g(a):
   cdef (int b):
      return a+b
```
- cdef functions cannot take *args and **kwargs type arguments. This is because they cannot easily be translated into a C signature.

### Advantages of cdef functions

- cdef functions can take any type of argument, including those that have no Python equivalent (for example pointers). def functions cannot have these, since they must be callable from Python.

- cdef functions can also specify a return type (if it is not specified then they return a Python object, PyObject* in C). def functions always return a Python object, so cannot specify a return type:
```
cdef int h(int* a):
    # specify a return type and take a non-Python compatible argument
    return a[0]
```
- cdef functions are quicker to call than def functions because they translate to a simple C function call.

### cpdef functions

cpdef functions cause Cython to generate a cdef function (that allows a quick function call from Cython) and a def function (which allows you to call it from Python). Interally the def function just calls the cdef function. In terms of the types of arguments allowed, cpdef functions have all the restrictions of both cdef and def functions.

### When to use a cdef function

Once the function has been called there is no difference in the speed that the code inside a cdef and a def function runs at. Therefore, only use a cdef function if:

- You need to pass non-Python types in or out, or
- You need to pass it to C as a function pointer, or
- You are calling it often (so the sped-up function call is important) and you don't need to call it from Python.
Use a cpdef function when you are calling it often (so the sped-up function call is important) but you do need to call it from Python.