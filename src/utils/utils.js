import crypto from 'crypto';

import config from '../../config';

export const getConfig = ()=> {
  return config;
}

export const isDebug = ()=> {
  return process.env.NODE_ENV !== 'production';
}

export const openExtendLink = (link)=> {
  return `${link}-${crypto.createHash('md5').update(link).digest("hex")}`;
}

export const getHomeImg = ()=> {
  const img = isDebug() ? 
    config.img.debug : 
    config.img.home.map(item=> `${config.cdn}/website/home${item}`);

  return img;
}

export const getDefaultImg = ()=> {
  const img = isDebug() ? 
  config.img.default : 
  config.img.default.map(item=> `${config.cdn}/website/home${item}`);

  return img;
}

export const getOtherImg = (type)=> {
  const img = isDebug() ? 
  `${config.img.other[type]}` : 
  `${config.cdn}/website/other${config.img.other[type]}`

  return img;
}

export const getRandom = (arr)=> {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
}

export const getLinkImg = (type)=> {
  const img = isDebug() ? 
  `${config.img.link[type]}` : 
  `${config.cdn}/website/link${config.img.link[type]}`

  return img;
}

