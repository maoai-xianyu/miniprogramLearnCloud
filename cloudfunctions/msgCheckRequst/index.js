// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
const rp = require('request-promise')

cloud.init()

const APPID = "wx08e3282a7dda50dd";
const APPSECRET = "f845ab27fa9ee4792fe86026667bf4fc";

const tokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET;

let checkUrl = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=";

// 云函数入口函数
exports.main = async (event, context) => {
  const tokenResponesGot = await got(tokenUrl);
  console.log("tokenResponesGot ------");
  console.log(tokenResponesGot);
  console.log(tokenResponesGot.body);
  console.log("tokenResponesGot ------");

  const content = event.content;

  const tokenRespones = await rp(tokenUrl);
  console.log("tokenRespones ------");
  console.log(tokenRespones);

  console.log("tokenRespones ------");

  const ACCESS_TOKEN = JSON.parse(tokenRespones).access_token;
  console.log("ACCESS_TOKEN ------" + ACCESS_TOKEN);

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