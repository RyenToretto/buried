# Buried

![license](https://img.shields.io/github/license/YES-Lee/buried?style=flat-square) ![size](https://img.shields.io/bundlephobia/min/buried?style=flat-square) ![release](https://img.shields.io/github/v/release/YES-Lee/buried?style=flat-square)

前端数据埋点工具

## 适用范围

* web
* H5
* 小程序
* 其它使用javascript开发的应用

## 特性

* 本地数据缓存
* 固定周期自动上报数据
* 手动控制数据上报
* 自定义数据持久化方法
* 自定义数据上报方法

## 安装

模块化引入

```bash
npm install buried
# 或
yarn add buried
```

标签引入

```html
<script src="https://unpkg.com/buried@0.0.3/dist/buried.min.js"></script>
```

## 使用

```javascript
import Buried from 'buried'

const buried = new Buried(options)

buried.put({ ua: window.navigation.userAgent, path: window.location.href }) // 往缓存里添加数据

buried.report() // 手动上报数据
```

## API

### 静态方法

* `public constructor(options: Object)`

  **options**
  |名称|类型|必须|描述|
  |---|---|---|---|
  |url|string|是|数据上报地址|
  |setData|function|否|自定义数据持久化方法，默认使用localStorage|
  |setData|function|否|自定义数据持久化方法，默认使用localStorage|
  |report|function|否|自定义数据上传方法，默认使用fetch|
  |period|number|否|数据自动上报周期，默认为2分钟|

### 实例方法

|方法|参数|返回值|说明|
|---|---|---|---|
|public put(data: TData)|data||往缓存中添加数据|
|public report()||Promise\<TReturn\>|手动上报数据|
|public setPeriod()|period: number||重新设置上报周期|
|public stop()|||停止自动上报|
|public start()|||启动自动上报|
|public reset()|||清空缓存数据|
