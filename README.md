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

### 创建数据库，初始化数据，查询数据
```
// dbdemo/pages/index/index.js
// 操作数据库
// const db = wx.cloud.database({
//     env: "codingtk-dev-9nkey",
// })
const db = wx.cloud.database(); // 不添加 env 默认是当前环境

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
    this.selectArticle();
    this.seleceArticleById();
    this.selectArticleWhere();
  },
  // 获取数据，获取所有数据（考虑到性能，小程序一次性最多只能获取20条数据)
  selectArticle: function() {
    // 一般写法
    db.collection('article').get({
      success: res => {
        console.log(res);
      }
    });
    // promise 风格,这种的还是很舒服的
    db.collection('article').get().then(res => {
      console.log("查询数据全部，最多20条");
      console.log(res);
    });
  },
  // 如果你知道某条数据的id，可以根据id获取某条数据：通过id获取数据需要通过doc函数来实现
  seleceArticleById: function() {
    db.collection('article').doc('310b52b2-c6cf-49dc-9551-2f7b8288205c')
      .get().then(res => {
        console.log("查询数据 byid");
        console.log(res);
      })
  },
  // 根据条件获取数据：根据条件获取数据，可以通过where函数来实现。
  selectArticleWhere: function() {
    const _ = db.command
    db.collection('article').where({
        pub_date: _.gte(new Date("2019/7/26 11:00:00")),
      }
    ).get().then(res => {
      console.log("查询数据 where");
      console.log(res);
    })

})
```
### 添加数据
```
// dbdemo/pages/index/index.js
// 操作数据库
// const db = wx.cloud.database({
//     env: "codingtk-dev-9nkey",
// })
const db = wx.cloud.database(); // 不添加 env 默认是当前环境

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
    this.addArticle();
  },

  // 添加数据
  addArticle: function() {
    db.collection('article').add({
      data:{
        title:"我国单身人口规模已达2.4亿，你以为单身只是影响了父母抱孙子？",
        author:"三联生活周刊",
        pub_date:new Date(),
        content: "靠外卖吃饭，住小而美的居所，囤购喜欢的物品，通过网上交友相亲，从旅行健身取乐，与宠物为伴，遵从自己内心的需求，敢于提前透支消费能力，单身群体的生活状态折射着社会发展和生活方式的变化。",
        tags:["国际","科技"]
      }
    }).then(res =>{
      console.log("添加成功");
      console.log(res);
    })
  }
})
```
### 删除数据
```
// dbdemo/pages/index/index.js
// 操作数据库
// const db = wx.cloud.database({
//     env: "codingtk-dev-9nkey",
// })
const db = wx.cloud.database(); // 不添加 env 默认是当前环境

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
    this.removeArticle();
  },
  // 删除一条数据：输出一条数据，需要知道这条数据的id
  removeArticle: function() {

    // face13585d3a70df02dd437954e6e23c 为用户在控制台添加的数据
    db.collection('article').doc('face13585d3a70df02dd437954e6e23c').remove()
      .then(res => {
        console.log("删除成功 只能删用户在控制台添加数据");
        console.log(res);
      });

    // 310b52b2-c6cf-49dc-9551-2f7b8288205c 为管理员的数据，所以删除不了
    // db.collection('article').doc('310b52b2-c6cf-49dc-9551-2f7b8288205c').remove()
    //   .then(res => {
    //     console.log("删除成功 只能删用户在控制台添加数据");
    //     console.log(res);
    //   });
  },
  // 删除多条数据（只能在服务端实现，需要用到云函数） 之后写
  removeArticleCloud: function() {

  }
})
```

### 更新数据
```
// dbdemo/pages/index/index.js
// 操作数据库
// const db = wx.cloud.database({
//     env: "codingtk-dev-9nkey",
// })
const db = wx.cloud.database(); // 不添加 env 默认是当前环境

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
    //this.updateArticleById();
    this.updateArticleAllSet();
  },
  // 局部数据：局部更新是一次性只更新一条数据中的某几个字段的值，用的是update方法
  updateArticleById:function(){
    db.collection('article').doc('face13585d3a717002ddc74d36910f87').update({
      data:{
        author:"盒子鱼开发"
      }
    }).then(res=>{
      console.log("更新成功 update 更新单个数据");
      console.log();
    })
  },
  //整体更新：整体更新是一次性把所有数据都更新，用的是set方法
  updateArticleAllSet: function () {
    db.collection('article').doc('face13585d3a717002ddc74d36910f87').set({
      data: {
        title:"盒子鱼学习",
        content:"学习为了更好发展",
        author: "盒子鱼开发",
        pub_date:new Date(),
        tags:['开发','测试']
      }
    }).then(res => {
      console.log("更新成功 set 更多全部数");
      console.log();
    })
  },
  // 一次更新多个数据：需要在服务器端，使用云函数来实现。
  updateArticleCloud: function () {

  },
})
```

## 141~149 command 指令

### command.eq 等于  command.neq 不等于
```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandEq();
  },
  commandEq: function() {
    db.collection('article').where({
      author: "今日头条",
    }).get().then(
      res => {
        console.log("原始条件 where");
        console.log(res);
      }
    );

    // 目前这两种没有区别
    db.collection('article').where({
      author: _.eq("今日头条"),
    }).get().then(
      res => {
        console.log("command eq");
        console.log(res);
      }
    );

    // 当硬性要去必须是什么条件的时候用 eq
    db.collection('article').where({
      author: {
        name: "上观新闻",
        age: 18
      },
    }).get().then(
      res => {
        console.log("原始条件 多重条件 wheres");
        console.log(res);
      }
    );

    // 当硬性要去必须是什么条件的时候用 eq
    db.collection('article').where({
      author: _.eq({
        name: "上观新闻",
        age: 18
      }),
    }).get().then(
      res => {
        console.log("只能是 name 和 age 不能有其他，没有数据");
        console.log(res);
      }
    );
  }

})
```

### command.lt 小于 command.lte 小于等于 command.gt 大于 command.gte 大于等于
```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandgtOrgteOrltOrlte();
  },
  // 大于  大于等于  小鱼 小于等于
  commandgtOrgteOrltOrlte: function() {
    db.collection('article').where({
      pub_date: _.lt(new Date("2019/7/26 11:00:00"))
    }).get().then(res => {
      console.log(res);
    })
  }
})
```
### command.in 查询筛选条件，表示字段的值需在给定的数组内  command.nin 查询筛选条件，表示字段的值需不在给定的数组内
```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandIn();
  },
  // in
  commandIn: function() {
    db.collection('article').where({
      author: _.in(['中国经济网'])
    }).get().then(res => {
      console.log("in 获取数据");
      console.log(res);
    });

    db.collection('article').where({
      tags: _.in(["教育", "国际"])
    }).get().then(res => {
      console.log("tags 获取数据");
      console.log(res);
    })
  }
})
```
### command.and  查询指令 逻辑与
```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandAnd();
  },
  // and
  commandAnd: function() {
    db.collection('article').where({
      pub_date: _.and(_.gt(new Date("2019/7/26 10:00:00")), _.lt(new Date("2019/7/26 11:00:00")))
    }).get().then(res => {
      console.log("and 操作");
      console.log(res);
    });

    // 变化
    db.collection('article').where({
      pub_date: _.gt(new Date("2019/7/26 10:00:00")).and(_.lt(new Date("2019/7/26 11:00:00")))
    }).get().then(res =>{
      console.log("and 操作 链接方式");
      console.log(res);
    });

    // 多个条件
    db.collection('article').where({
      pub_date: _.gt(new Date("2019/7/26 10:00:00")).and(_.lt(new Date("2019/7/26 11:00:00"))),
      author:_.eq("今日头条")
    }).get().then(res =>{
      console.log("and 操作 多个条件");
      console.log(res);
    })

  }
})
```
### command.or  查询指令，用于表示逻辑 "或" 的关系，表示需同时满足多个查询筛选条件。

1. 一是可以进行字段值的 “或” 操作
2. 也可以进行跨字段的 “或” 操作

```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandOr();
  },

  // or 多个条件
  commandOr: function() {
    db.collection('article').where({
      pub_date: _.or(_.gt(new Date("2019/7/26 14:00:00")), _.lt(new Date("2019/7/26 10:00:00")))
    }).get().then(
      res => {
        console.log("or 操作 多个条件");
        console.log(res);
      }
    );

    db.collection('article').where(_.or([{
        pub_date: _.or(_.gt(new Date("2019/7/26 14:00:00")), _.lt(new Date("2019/7/26 10:00:00")))
      },
      //  /今日/ 正则表达式
      {
        author:/今日/
      }
    ])).get().then(
      res =>{
        console.log("or 多个条件");
        console.log(res);
      }
    )
  }
})
```

### command.set 更新指令  用于设定字段等于指定值

> 这个set和命令里面的set有区别，注意哦
```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandUpdateOrSet();
  },  

  commandUpdateOrSet: function() {

    // db.collection('article').doc("890198e15d3a719202dbfac645f0c7cd").update({
    //   data: {
    //     author: {
    //       name: "三联生活周刊",
    //       city: "山西大同"
    //     }
    //   }
    // }).then(res => {
    //   console.log(res);
    // });

    // _.set
    db.collection('article').doc("890198e15d3a719202dbfac645f0c7cd").update({
      data: {
        author: _.set({
          name: "三联生活周刊",
          city: "山西大同"
        })
      }
    }).then(res => {
      console.log(res);
    })
  }
})
```
### command.remove()  更新指令。用于表示删除某个字段。

```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandRemove();
  },
  // 删除字段
  commandRemove:function(){
    db.collection("article").doc("face13585d3a717002ddc74d36910f87").update({
      data:{
        author:_.remove()
      }
    }).then(res =>{
      console.log(res);
    })
  }
})
```

### command.inc  更新指令。用于指示字段自增某个值，这是个原子操作，使用这个操作指令而不是先读数据、再加、再写回 command.mul 自乘指令，跟command.inc一样。

1. 原子性：多个用户同时写，对数据库来说都是将字段加一，不会有后来者覆写前者的情况。
2. 减少一次网络请求：不需先读再写。

```

// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandInc();
  },
  // command.inc 更新指令。用于指示字段自增某个值，这是个原子操作，使用这个操作指令而不是先读数据、再加、再写回
  commandInc:function(){
    // 添加数据
    // db.collection('article').add({
    //   data: {
    //     title: "重庆保时捷女子吐狂言，知情人：她丈夫是派出所所长，做过很多好事",
    //     author: " 辣新闻",
    //     pub_date: new Date(),
    //     content: "保时捷豪车、香艳美女、两记耳光。7月30日，发生在重庆渝北区龙盛街路口的一起普通的交通违章事故中含有这几个劲爆元素，引起社会强烈反响。更有甚者，事发后有网友曝出当事女子口吐狂言，称自己经常飙车，常闯红灯，打电话就能删除违章记录，从而引发舆论持续发酵。尽管官方至今仍未公布该女子丈夫的情况，但多个权威信源指出，他其实就是派出所所长。",
    //     tags: ["国际", "科技"],
    //     read_count:100
    //   }
    // }).then(res => {
    //   console.log("添加成功");
    //   console.log(res);
    // });
    db.collection('article').doc("25c59b425d42d0fa088fd6f315ecf933").update({
      data:{
        read_count:_.inc(1)
      }
    }).then(
      res =>{
        console.log(res);
      }
    )
  }
})
```
### command.push   command.pop  command.shift command.unshift
```
// pages/command/command.js
const db = wx.cloud.database();
const _ = db.command;
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
    this.commandPushPopShiftUnShift();
  },

 //更新指令，对一个值为数组的字段，往数组尾部添加一个或多个值。或字段原为空，则创建该字段并设数组为传入值。
  commandPushPopShiftUnShift: function() {
    db.collection('article').doc("25c59b425d42d0fa088fd6f315ecf933").update({
      // data: {
      //   tags: _.push(["盒子鱼"])
      // }
      // 更新指令，对一个值为数组的字段，将数组尾部元素删除。
      // data: {
      //   tags: _.pop(["盒子鱼"])
      // }
      // 更新指令，对一个值为数组的字段，将数组头部元素删除。
      // data: {
      //   tags: _.shift()
      // }

      // 更新指令，对一个值为数组的字段，往数组头部添加一个或多个值。或字段原为空，则创建该字段并设数组为传入值。
      data: {
        tags: _.unshift(["盒子鱼","国际","测试"])
      }
    }).then(res => {
      console.log(res);
    })
  }
})
```

## 高级查询  150~155

### collection.count  统计集合记录数或统计查询语句对应的结果记录数，注意这与集合权限设置有关，一个用户仅能统计其有读权限的记录数。

```
// pages/query/query.js
const db = wx.cloud.database();
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
    this.collectionCount();
  },

  collectionCount:function(){
    db.collection('article').where({
      title: /女/
    }).count().then(
      res => {
        console.log(res);
      }
    )
  }
})
```

### collectionOrderBy 方法接受一个必填字符串参数fieldName用于定义需要排序的字段，一个字符串参数order定义排序顺序。order只能取 asc或desc。

1. 如果需要对嵌套字段排序，需要用 "点表示法" 连接嵌套字段，比如author.age表示字段author里的嵌套字段age。
2. 同时也支持按多个字段排序，多次调用orderBy即可，多字段排序时的顺序会按照orderBy调用顺序先后对多个字段排序。

```
// pages/query/query.js
const db = wx.cloud.database();
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
    this.collectionOrderBy();
  },
  // 排序
  collectionOrderBy: function() {
    db.collection('article')
      .orderBy("pub_date", "desc")
      .orderBy("read_count","asc")
      .get().then(
        res => {
          console.log(res);
        }
      )
  }
})
```

### collection.limit

```
// pages/query/query.js
const db = wx.cloud.database();
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
    this.collectionLimit();
  },
  // 排序
  collectionLimit: function() {
    db.collection('article')
      .limit(5)
      .get().then(
        res => {
          console.log(res);
        }
      )
  }
})
```

### collection.skip  指定查询返回结果时从指定序列后的结果开始返回，常用于分页
```
// pages/query/query.js
const db = wx.cloud.database();
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
    this.collectionSkip();
  },

  // 跳过几条数据，用于翻页
  collectionSkip: function() {
    db.collection('article').skip(4).limit(4).get().then(
      res => {
        console.log(res);
      }
    )
  }
})
```

### collection.feild 指定返回结果中记录需返回的字段 节省流量
```
// pages/query/query.js
const db = wx.cloud.database();
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
    this.collectionField();
  },
  // 指定返回结果中记录需返回的字段。
  collectionField:function(){
    db.collection('article').field({
      title:true,
      author:true
    }).get().then(
      res =>{ 
        console.log(res);
      }
    )
  }
})
```
### 正则表达式

从基础库2.3.2开始（wx-server-sdk从0.0.23开始），数据库支持正则表达式查询，开发者可以在查询语句中使用 JavaScript原生正则对象或使用db.RegExp方法来构造正则对象然后进行字符串匹配。在查询条件中对一个字段进行正则匹配即要求该字段的值可以被给定的正则表达式匹配，注意正则表达式不可用于db.command内（如db.command.in）。

> 使用正则表达式匹配可以满足字符串匹配需求，但不适用于长文本 / 大数据量的文本匹配 / 搜索，因为会有性能问题，对此类场景应使用文本搜索引擎如 ElasticSearch 等实现。

> options 支持 i, m, s 这三个 flag，注意 JavaScript 原生正则对象构造时仅支持其中的 i, m 两个 flag，因此需要使用到 s 这个 flag 时必须使用 db.RegExp 构造器构造正则对象

1. i 大小写不敏感
2. m 跨行匹配；让开始匹配符 ^ 或结束匹配符 $ 时除了匹配字符串的开头和结尾外，还匹配行的开头和结尾
3. s 让 . 可以匹配包括换行符在内的所有字符
```
// pages/query/query.js
const db = wx.cloud.database();
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
    this.collectionRegex();
  },
  // 小程序正则表达式
  collectionRegex:function(){
    
    db.collection('article').where({
      title:/^重庆/i
    }).get().then(res =>{
      console.log(res);
    });

    console.log("RegExp -begin");

    db.collection('article').where({
      title:db.RegExp({
        regexp:"^重庆",
        options:"is"
      })
    }).get().then(res => {
      console.log(res);
    });
  }
})
```
## 156 文件操作

> 新建项目 filedemo

### 修改根目录
```
{
	"miniprogramRoot": "filedemo/",
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

### 文件上传

```
<!--filedemo/pages/index/index.wxml-->
<button bindtap="onSelectImage">上传图片</button>
<image src="{{imageUrl}}"/>

// filedemo/pages/index/index.js
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

    },

    onSelectImage: function(event) {
        var that = this;
        wx.chooseImage({
            count: '9', //最多可以选择的图片张数,
            success: res => {
                console.log(res);
                // 获取文件路径
                var filePath = res.tempFilePaths[0];
                const uploadtask = wx.cloud.uploadFile({
                    cloudPath: 'maoai_xianyu.png',
                    filePath: filePath, // 文件路径
                    success: res => {
                        console.log("上传成功");
                        console.log(res);
                        that.setData({
                            imageUrl: res.fileID
                        })
                    },
                    fail: err => {
                        console.log("上传失败");
                        console.log(res);
                    }
                })

                uploadtask.onProgressUpdate(
                    res => {
                        console.log(res);
                    }
                )

            }, //返回图片的本地文件路径列表 tempFilePaths,
        });
    }

})
```

## 157~161 云函数

### 搭建环境

* node环境搭建
1. 安装 nvm

> [Mac OS 下 NVM 的安装与使用](https://www.jianshu.com/p/622ad36ee020)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

安装完成后关闭终端，重新打开终端输入 nvm 验证一下是否安装成功，当出现“Node Version Manager”时，说明已安装成功。


source .bash_profile

```
2. 安装 node

```

nvm常用命令：

nvm install latest：安装最新版的node.js。nvm i == nvm install。
nvm install [version]：安装指定版本的node.js 。
nvm use [version]：使用某个版本的node。
nvm list：列出当前安装了哪些版本的node。
nvm uninstall [version]：卸载指定版本的node。
nvm node_mirror [url]：设置nvm的镜像。
nvm npm_mirror [url]：设置npm的镜像。

```

### 创建云函数

eg：
```
// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  console.log(event)
  console.log(context)

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

1. 在cloudfunctions文件夹上，右键->创建云函数，填入云函数的名称，然后点击确定即可创建好。然后就可以在相应的index.js文件中写代码了。

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const a = event.a;
  const b = event.b;
  const result = a + b;
  return {
    result
  }

}

2. 上传和部署：

在本地创建完云函数后，还只是在本地，所以还需要上传到服务器和部署。上传和部署非常简单，我们只需要在相应的函数的文件夹上，右键->上传并部署：云端安装依赖即可。

3. 调用

// funcdemo/pages/index/index.js
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

    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'login',
      // 传递给云函数的参数
      // data: {
      //   x: 1,
      //   y: 2,
      // },
      success: res => {
        console.log(res);
      },
      fail: err => {
        // handle error
        console.log(err);
      },
      complete: () => {
        // ...
        console.log("完成");
      }
    });

    wx.cloud.callFunction({
      name: "add",
      data: {
        a: 10,
        b: 20
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    })

  }
})
```

### 云函数操作数据库
```
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  return db.collection('article').where({
    title: /重庆保时捷女子吐/
  }).update({
    data: {
      tags: ["国内", "测查", "国际"]
    }
  });
}

// 调用

    wx.cloud.callFunction({
      name: "article",
      success: res => {
        console.log("获取云端数据");
        console.log(res);
      }
    })
```

### 云函数http请求  

joke 案例

> [got库](https://github.com/sindresorhus/got)

1. nvm use 8.9.0

> 切换到当前目录 joke 下进行http的下载

2. npm install got --save-dev

--save-dev  服务器部署的时候需要

```
{
  "name": "joke",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "wx-server-sdk": "latest"
  },
  "devDependencies": {
    "got": "^9.6.0"
  }
}



// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  const response = await got('http://v.juhe.cn/joke/content/list.php?key=7fa459ad3b865dedfb09dc07cb346564&page=2&pagesize=10&sort=asc&time=1418745237');
  // 需要将字符串转换成js对象
  const body = JSON.parse(response.body);
  const jokes = body.result.data;
  return jokes;
}


 // 4. 云函数调用http请求
    wx.cloud.callFunction({
      name: "joke",
      success: res => {
        console.log("获取云端http数据");
        console.log(res);
      }
    });

```

