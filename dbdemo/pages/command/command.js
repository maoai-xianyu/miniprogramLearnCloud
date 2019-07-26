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
    // this.commandEq();
    // this.commandgtOrgteOrltOrlte();
    // this.commandIn();
    // this.commandAnd();
    this.commandOr();
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
  },
  // 大于  大于等于  小鱼 小于等于
  commandgtOrgteOrltOrlte: function() {
    db.collection('article').where({
      pub_date: _.lt(new Date("2019/7/26 11:00:00"))
    }).get().then(res => {
      console.log("OrgteOrltOrlte 获取数据");
      console.log(res);
    })
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
    }).get().then(res => {
      console.log("and 操作 链接方式");
      console.log(res);
    });

    // 多个条件
    db.collection('article').where({
      pub_date: _.gt(new Date("2019/7/26 10:00:00")).and(_.lt(new Date("2019/7/26 11:00:00"))),
      author: _.eq("今日头条")
    }).get().then(res => {
      console.log("and 操作 多个条件");
      console.log(res);
    })
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