import * as crypto from "crypto";
import * as iconv from "iconv-lite";

/**
 *
 * @param params  签名参数
 * @param privateKey 签名私钥
 * @param RSA_TYPE 签名类型 RSA-SHA256 | RSA-SHA1
 * @returns
 */
export function sign(params, privateKey, RSA_TYPE) {
  const signStr = toQueryString(params);
  console.log(params, privateKey, signStr);
  // 计算签名
  const sign = crypto
    .createSign(RSA_TYPE)
    .update(signStr, "utf8")
    .sign(privateKey, "base64");
  return sign;
}

export function verifySign(params, signature, publicKey, RSA_TYPE) {
  if (!params || !signature) return false;
  const signStr = toQueryString(params);
  const verifier = crypto
    .createVerify(RSA_TYPE)
    .update(signStr, "utf8")
    .verify(publicKey, signature, "base64");

  return verifier;
}

function toQueryString(params) {
  const filter = (key) => key !== "signature" && params[key];

  return Object.keys(params)
    .filter((key) => filter(key))
    .sort()
    .map((key) => {
      let data = params[key];
      if (Array.prototype.toString.call(data) !== "[object String]") {
        data = JSON.stringify(data);
      }
      return `${key}=${iconv.encode(data, "utf-8")}`;
    })
    .join("&");
}
