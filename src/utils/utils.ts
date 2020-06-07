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
