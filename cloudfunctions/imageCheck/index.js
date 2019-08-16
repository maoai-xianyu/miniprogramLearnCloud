// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口文件
const {
  ImageClient
} = require("image-node-sdk");

let AppId = '1252364497'; // 腾讯云 AppId
let SecretId = 'AKIDlINF3b4yLYWyEKynBNOAnEbjeMBT6WmD'; // 腾讯云 SecretId
let SecretKey = 'OYTR5cyFBsKZYLzUkxvhDUVLzOgiW5Po'; // 腾讯云 SecretKey

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const imageUrl = event.imageUrl;
  console.log("imageUrl  --  " + imageUrl);

  let imgClient = new ImageClient({
    AppId,
    SecretId,
    SecretKey
  });
  try {
    return await imgClient.imgPornDetect({
      data: {
        url_list: [imageUrl]
      }
    })
  } catch (e) {
    console.log(e)
  }
}