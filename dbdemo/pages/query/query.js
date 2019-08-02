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
    // this.collectionLimit();
    // this.collectionSkip();
    this.collectionField();
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
  },
  // 跳过几条数据，用于翻页
  collectionSkip: function() {
    db.collection('article').skip(4).limit(4).get().then(
      res => {
        console.log(res);
      }
    )
  },
  // 指定返回结果中记录需返回的字段。
  collectionField:function(){
    db.collection('article').field({
      title:true,
      author:true
    }).get().then(
      res =>{ 
        console.log(res);
      }
    )
  }
})