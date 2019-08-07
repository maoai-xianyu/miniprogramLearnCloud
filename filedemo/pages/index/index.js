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