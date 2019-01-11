# 博客前后端分离开源项目

### 线上地址 http://116.62.147.91/koa2-vue/

## 本地运行

### web 前端代码

cd web

npm install

npm run dev

### server 后端代码

npm install

mongod --dbpath="database 下的 db 路径" --port="27030"

node app2.js

### 一、项目介绍

本项目是一款前后端分离全栈开发项目，前端采用 vue 框架构建,
后台使用 Koa2 框架构建,MongoDB 数据库,开发过程为 git 分支管理多人协作开发。
项目功能包括注册、登录、发表文章、文章评论、头像上传等功能。

### 二、项目架构

1. 使用 vue 框架，以及 vue-router 构建单页面应用。Vuex 状态管理登录后的用户信息。
2. 本项目通过 vue-cli 脚手架快速搭建开发环境,采用 vuex 管理登录后的用户信息,Axios 封装处理请求。
3. 前端 UI 框架使用 Element-UI 组件库中部分功能进行快速开发。

### 三、预期达到的技术效果

1. 能够熟练运用 HTML5 语义化标签+CSS3 新特性进行页面布局。
2. 能够合理运用 sass 进行样式代码的编写。
3. 能熟悉运用 vue.js 开发，route+vuex 工具的使用。
4. 能熟悉运用 vue.js 中的指令和服务与后台服务进行数据交互 ，实现模块功能 。
5. 能了解运用 Koa2 + MongoDB 搭建后台
6. 能了解运用 git 多人协作的过程
7. 能了解阿里云服务器部署项目

### 四、其他

1. 适用人群：初掌 Vue,Koa2,MongoDB。需带领来系统了解 Vue,Koa2,MongoDB 开发流程。
2. 教学周期：按照徒弟情况待定。
