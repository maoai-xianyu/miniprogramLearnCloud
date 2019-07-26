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
    //this.commandEq();
    this.commandgtOrgteOrltOrlte();
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
      console.log(res);
    })
  }
})