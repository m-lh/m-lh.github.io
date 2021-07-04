---
title: Win10 Bash Mysql
tategory: wsl
date: 2017-07-15
---

http://blog.csdn.net/quqi99/article/details/45100933

对于ubuntu的虚机使用upstart时会报错：

> Start: Unable To Connect To Upstart: Failed To Connect To Socket /Com/Ubuntu/Upstart: Connection Refused

workaround如下：

```bash
sudo dpkg-divert --local --rename --add /sbin/initctl
ln -s /bin/true /sbin/initctl
```

貌似不起作用，取消上面的命令的影响
```bash
rm /sbin/initctl
dpkg-divert --local --rename --remove /sbin/initctl
```
