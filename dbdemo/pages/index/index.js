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
    this.selectActicle();
    //this.addActicle();
  },
  // 获取数据
  selectActicle: function() {
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
  },
  // 添加数据
  addActicle: function() {
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