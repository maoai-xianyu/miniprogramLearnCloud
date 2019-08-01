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
    // this.commandOr();
    // this.commandUpdateOrSet();
    // this.commandRemove();
    this.commandInc();
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
        author: /今日/
      }
    ])).get().then(
      res => {
        console.log("or 多个条件");
        console.log(res);
      }
    )
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