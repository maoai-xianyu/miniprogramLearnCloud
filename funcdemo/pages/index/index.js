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