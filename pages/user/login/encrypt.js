const CryptoJS = require('../../../utils/aes');
//AES-128-CBC加密模式，key需要为16位，key和iv可以一样
function getAesString(data, key0, iv0) {//加密
  key0 = key0.replace(/(^\s+)|(\s+$)/g, "");
  var key = CryptoJS.enc.Utf8.parse(key0);
  var iv = CryptoJS.enc.Utf8.parse(iv0);
  var encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();    //返回的是base64格式的密文
}

function encryptAES(data, aesKey) { //加密
  if (!aesKey) {
    return data;
  }
  var encrypted = getAesString(randomString(64) + data, aesKey, randomString(16)); //密文
  return encrypted;
}

var $aes_chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
var aes_chars_len = $aes_chars.length;
function randomString(len) {
  var retStr = '';
  for (let i = 0; i < len; i++) {
    retStr += $aes_chars.charAt(Math.floor(Math.random() * aes_chars_len));
  }
  return retStr;
}

module.exports = encryptAES;