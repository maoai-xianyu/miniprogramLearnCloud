// funcdemo/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    content: "特3456书yuuo莞6543李zxcz蒜7782法fgnv级"

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
    });


    // 6.校验内容是否违规 request
    wx.cloud.callFunction({
      name: "msgCheckRequst",
      data: {
        content: "特3456书yuuo莞6543李zxcz蒜7782法fgnv级"
      },
      success: res => {
        console.log("获取云端内容校验request");
        console.log(res);
      },
      fail: err => {
        console.log("获取云端内容校验失败request");
        console.error(err);
      }
    });

    // 7.校验内容是否违规 request
    wx.cloud.callFunction({
      name: "msgCheckRequstNew",
      data: {
        content: "特3456书yuuo莞6543李zxcz蒜7782法fgnv级"
      },
      success: res => {
        console.log("获取云端内容校验request ----- new ");
        console.log(res);
      },
      fail: err => {
        console.log("获取云端内容校验失败request ---- new");
        console.error(err);
      }
    });


  },

  selectImageTap: function(event) {
    var that = this;
    // 1. 选择图片
    wx.chooseImage({
      count: 1,
      success: res => {
        const tempPath = res.tempFilePaths[0];
        console.log(res);
        console.log("图片的本地临时文件路径列表" + tempPath);
        console.log("图片的本地临时文件列表" + res.tempFiles[0].path);

        // 2. 上传图片
        wx.cloud.uploadFile({
          cloudPath: "pretty_girl.jpeg",
          filePath: tempPath,
          success: res => {
            console.log("获取上传路径");
            console.log(res);
            const fileID = res.fileID;
            // 3. 用云文件id换取真实链接
            wx.cloud.getTempFileURL({
              fileList: [fileID],
              success: res => {
                const tempFileURL = res.fileList[0].tempFileURL;
                console.log(res);
                console.log("tempFileURL---  " + tempFileURL)
                wx.cloud.callFunction({
                  name: "imageCheck",
                  data: {
                    imageUrl: tempFileURL
                  },
                  success: res => {
                    console.log("图片鉴黄结果返回");
                    console.log(res);
                    const body = JSON.parse(res.result.body);
                    console.log("图片鉴黄body返回");
                    console.log(body);
                  },
                  fail: err => {
                    console.log(err);
                  }
                })
              }

            })
          },
          fail: err => {
            console.error(err);
          }
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})