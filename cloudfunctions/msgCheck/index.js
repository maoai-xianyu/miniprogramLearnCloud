// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

const APPID = "wx08e3282a7dda50dd";
const APPSECRET = "35294d1b8df38f595ced5084e4dfc1ff";

const tokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET;

let checkUrl = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=";

// 云函数入口函数
exports.main = async(event, context) => {

  const content = event.content;

  const tokenRespones = await got(tokenUrl);

  const ACCESS_TOKEN = JSON.parse(tokenRespones.body).access_token;

  checkUrl = checkUrl + ACCESS_TOKEN;

  console.log("checkUrl   " + checkUrl);

  const checkResponse = await got.post(checkUrl, {
    // 对象转字符串
    body: JSON.stringify({
      content: content
    })
  });
  return checkResponse.body;
}