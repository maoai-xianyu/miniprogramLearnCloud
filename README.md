# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)


## 创建云开发环境 133~134视频讲解和文档

## 135 云开发初始化

### 兼容性

> 云开发能力从基础库2.2.3开始支持，现在2.2.3或以上的基础库没有完全覆盖所有用户（目前约90%），如需使上传的代码能够覆盖全量用户，请做以下特殊处理：
在app.json / game.json中增加字段"cloud": true
指定后云能力可以在所有基础库中使用，并且如果云能力有更新，并不会随着基础库升级而自动升级，需在后续版本发布后重新上传。如2.2.4发布后，需重新上传才能将云能力更新至2.2.4版本的云能力。

```
{
  "pages": [
    "pages/index/index"
  ],
  "window": {
    "backgroundColor": "#F6F6F6",
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#F6F6F6",
    "navigationBarTitleText": "云开发 QuickStart",
    "navigationBarTextStyle": "black"
  },
  "sitemapLocation": "sitemap.json",
  "cloud": true
}
```

### 创建程序

> 在创建完云开发的项目后，默认会生成一个miniprogram项目，这个项目是一些演示性的代码，不符合我们的需求。因此我们重新创建一个新的项目，项目名字可以随便取，比如叫做databasedemo，然后在项目中需要创建好项目所需要的文件，比如app.json、app.wxss以及pages文件夹等。创建完项目后，还需要在project.config.json文件中配置"miniprogramRoot":"databasedemo/"。

```
project.config.json

{
	"miniprogramRoot": "dbdemo/",
	"cloudfunctionRoot": "cloudfunctions/",
	"setting": {
		"urlCheck": true,
		"es6": true,
		"postcss": true,
		"minified": true,
		"newFeature": true
	},
	"appid": "wx08e3282a7dda50dd",
	"projectname": "miniprogramLearnCloud",
	"libVersion": "2.7.7",
	"simulatorType": "wechat",
	"simulatorPluginLibVersion": {},
	"condition": {
		"search": {
			"current": -1,
			"list": []
		},
		"conversation": {
			"current": -1,
			"list": []
		},
		"plugin": {
			"current": -1,
			"list": []
		},
		"game": {
			"list": []
		},
		"miniprogram": {
			"current": 0,
			"list": [
				{
					"id": -1,
					"name": "db guide",
					"pathName": "pages/databaseGuide/databaseGuide"
				}
			]
		}
	}
}

```
### 初始化云开发

> 如果我们想要使用小程序的云开发功能，必须在小程序初始化的时候就调用wx.cloud.init方法来进行初始化，这个方法可以接受两个参数，两个参数的作用如下：

1. env String	默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境，传入对象可以分别指定各个服务的默认环境
2. traceUser boolean 是否在将用户访问记录到用户管理中，在控制台中可见

```
App({

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function() {
        wx.cloud.init({
            env: "codingtk-dev-9nkey", // 环境开发
            traceUser: true //是否在将用户访问记录到用户管理中，在控制台中可见
        })

    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function(options) {

    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function() {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function(msg) {

    }
})
```

### 创建集合

> 在云开发的数据库中，使用的是NoSQL类型的数据库。关系型数据库中的表，对应的是NoSQL中的一个集合。所以在所数据操作之前，应该先创建一个集合。创建完集合后，也不需要跟关系型数据库一样，先定义好这个集合中的字段，而是直接插入数据，并且插入数据的时候，每条数据的字段无需保持一致！

## 136~140 数据库使用

### 创建数据库，初始化数据
```
// dbdemo/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 操作数据库
    // const db = wx.cloud.database({
    //     env: "codingtk-dev-9nkey",
    // })
    const db = wx.cloud.database(); // 不添加 env 默认是当前环境
    // 一般写法
    db.collection('article').get({
      success: res => {
        console.log(res);
      }
    });
    // promise 风格,这种的还是很舒服的
    db.collection('article').get().then(res => {
      console.log(res);
    });
    
  }
})
```