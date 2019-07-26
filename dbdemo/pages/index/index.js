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
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})