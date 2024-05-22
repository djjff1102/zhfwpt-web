// 加密和解密
import CryptoJS from "crypto-js";

var secretKey = "dazong-dongjiang-66"; // 密钥应该是一个复杂的字符串，长度至少是32个字符

// 加密函数
export function encryptData(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// 解密函数
export function decryptData(ciphertext) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
