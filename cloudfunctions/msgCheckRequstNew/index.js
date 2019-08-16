// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

const APPID = "wx08e3282a7dda50dd";
const APPSECRET = "f845ab27fa9ee4792fe86026667bf4fc";

const tokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET;

let checkUrl = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=";


// 云函数入口函数
exports.main = async(event, context) => {

  const msg = event.content;

  const tokenStr = await rp(tokenUrl);

  console.log("tokenStr---- ");
  console.log(tokenStr);
  console.log("tokenStr---- ");

  const accessToken = JSON.parse(tokenStr).access_token;

  var options = {
    method: 'POST',
    uri: checkUrl + accessToken,
    body: {
      content: msg
    },
    json: true // Automatically stringifies the body to JSON
  };

  const checkResponse = await rp(options);

  console.log("checkResponse----");
  console.log(checkResponse);
  console.log("checkResponse----");

  const errorCode = checkResponse.errcode;
  if (errorCode == 0) {
    return true;
  } else {
    return false;
  }
}