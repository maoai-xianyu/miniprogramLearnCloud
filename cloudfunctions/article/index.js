// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  return db.collection('article').where({
    title: /重庆保时捷女子吐/
  }).update({
    data: {
      tags: ["国内", "测查", "国际"]
    }
  });
}