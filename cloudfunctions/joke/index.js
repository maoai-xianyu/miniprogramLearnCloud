// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  const response = await got('http://v.juhe.cn/joke/content/list.php?key=7fa459ad3b865dedfb09dc07cb346564&page=2&pagesize=10&sort=asc&time=1418745237');
  // 需要将字符串转换成js对象
  const body = JSON.parse(response.body);
  const jokes = body.result.data;
  return jokes;
}