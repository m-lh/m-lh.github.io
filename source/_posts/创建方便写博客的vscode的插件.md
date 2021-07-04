---
title: 创建方便写博客的vscode的插件
date: 2019-07-26
modified: 2019-07-26
category: Python
tags: mix
authors: 长恨安歌
summary: 创建方便写博客的vscode的插件
---

# 背景

在博客撰写中，vscode是一个方便的编辑器，但是还是缺少一些方便的操作。

# 需求分析

## 较高优先级的功能

### 1. 新建博客

新建一个博客

1. 菜单文件添加新建博客条目或者使用绑定ctrl+n快捷键新建博客
2. 交互输入博客题目
3. 新建文件
4. 文件内容输入初始内容。

### 2. 一键发布
通过一个按键进行博客发布



## 优先级靠后的功能

### 1. 一键预览
```
inv livereload
```
但是集成在vscode的一个新的页面

### 2. 屏蔽git的操作
看不到对git的操作。
新建一个树的展示板

# 简单设计

## 菜单栏

对于项目为“博客”在文件菜单中，添加“新建博客”

## 功能栏
在右上角，md侧边预览旁边，添加 预览博客 功能

## 左侧
添加博客树状管理菜单
有博客列表，未发布，已更改，未更改
按照时间排序，支持搜索

功能栏有：提交

# 关键问题

## 创建插件
使用模版开始

## 设置配置



# 详细实现

下面便开始进行实现，便实现边记录。

## 模版创建与测试
```
npm install -g yo generator-code
yo code
code .
```

F5打开新窗口，ctrl+shift+p
输入Hello World回车
右下角弹出"Hello world!"

## 

# 参考资料

1. [VSCode插件开发全攻略](https://www.cnblogs.com/liuxianan/p/vscode-plugin-overview.html)
2. 