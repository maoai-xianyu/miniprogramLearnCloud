// pages/query/query.js
const db = wx.cloud.database();
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
    // this.collectionCount();
    // this.collectionOrderBy();
    this.collectionLimit();
  },

  collectionCount: function() {
    db.collection('article').where({
      title: /女/
    }).count().then(
      res => {
        console.log(res);
      }
    )
  },
  // 排序
  collectionOrderBy: function() {
    db.collection('article')
      .orderBy("pub_date", "desc")
      .orderBy("read_count", "asc")
      .get().then(
        res => {
          console.log(res);
        }
      )
  },
  // 排序
  collectionLimit: function() {
    db.collection('article')
      .limit(5)
      .get().then(
        res => {
          console.log(res);
        }
      )
  }
})