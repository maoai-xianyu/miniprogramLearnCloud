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

    // 1. 调用云函数
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

    // 2. 调用云函数,传参数
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
    });
    // 3. 云函数操作数据库
    wx.cloud.callFunction({
      name: "article",
      success: res => {
        console.log("获取云端数据");
        console.log(res);
      }
    });
    // 4. 云函数调用http请求
    wx.cloud.callFunction({
      name: "joke",
      success: res => {
        console.log("获取云端http数据");
        console.log(res);
      }
    });

    // 5.校验内容是否违规
    wx.cloud.callFunction({
      name: "msgCheck",
      data: {
        content: "特3456书yuuo莞6543李zxcz蒜7782法fgnv级"
      },
      success: res => {
        console.log("获取云端内容校验");
        console.log(res);
      },
      fail: err => {
        console.log("获取云端内容校验失败");
        console.error(err);
      }
    })

  }
})