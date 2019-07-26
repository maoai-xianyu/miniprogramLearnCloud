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
    //this.selectArticle();
    //this.seleceArticleById();
    //this.selectArticleWhere();
    //this.addArticle();
    //this.removeArticle();
    //this.updateArticleById();
    this.updateArticleAllSet();
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
    }).get().then(res => {
      console.log("查询数据 where");
      console.log(res);
    })
  },
  // 添加数据
  addArticle: function() {
    db.collection('article').add({
      data: {
        title: "我国单身人口规模已达2.4亿，你以为单身只是影响了父母抱孙子？",
        author: "三联生活周刊",
        pub_date: new Date(),
        content: "靠外卖吃饭，住小而美的居所，囤购喜欢的物品，通过网上交友相亲，从旅行健身取乐，与宠物为伴，遵从自己内心的需求，敢于提前透支消费能力，单身群体的生活状态折射着社会发展和生活方式的变化。",
        tags: ["国际", "科技"]
      }
    }).then(res => {
      console.log("添加成功");
      console.log(res);
    })
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