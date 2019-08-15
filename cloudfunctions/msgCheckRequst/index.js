// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
const rp = require('request-promise')

cloud.init()

const APPID = "wx08e3282a7dda50dd";
const APPSECRET = "35294d1b8df38f595ced5084e4dfc1ff";

const tokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET;

let checkUrl = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=";

// 云函数入口函数
exports.main = async (event, context) => {

  const content = event.content;

  const tokenRespones = await got(tokenUrl);

  const ACCESS_TOKEN = JSON.parse(tokenRespones.body).access_token;

  const checkResponse = await rp.post({
    uri: checkUrl + ACCESS_TOKEN,
    method:"POST",
    body:{
      content: content
    },
    json:true
  });

  console.log("checkResponse ------");
  console.log(checkResponse);
  console.log("checkResponse ------");
  return checkResponse;
}