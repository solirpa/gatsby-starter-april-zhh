import crypto from "crypto";

export const isDebug = () => {
  return process.env.NODE_ENV !== "production";
};

export const openExtendLink = (link: string) => {
  return `${link}-${crypto.createHash("md5").update(link).digest("hex")}`;
};

export const getRandom: (arr: any[]) => string = (arr) => {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
};

export const getBrowser = () => {
  const userAgent = typeof navigator !== `undefined` ? navigator.userAgent : ""; //取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera";
  }//判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 &&
    !isOpera
  ) {
    return "IE";
  }//判断是否IE浏览器
};
