import { useState } from 'react';
import { useStaticQuery, graphql } from "gatsby"

import { isDebug, getBrowser } from '@/utils/utils';

export type LinkTypes = 'github' | 'mail' | 'rss' | 'weibo' | 'zhihu';
export type OtherTypes = 'dot' | 'scroll';

export interface Config {
  repo: string;
  url: string;
  wordings: string[];
  cdn: string;
  meta: {
    title: string;
    description: string;
    gaTrackId: string;
  };
  about: {
    email: string;
    github: string;
    name: string;
    slug: string;
    title: string;
  };
  link: {
    [key in LinkTypes]: string;
  };
  img: {
    default: string[];
    home: string[];
    link: {
      [key in LinkTypes]: string;
    };
    other: {
      [key in OtherTypes]: string;
    }
  };
}

const useConfig = () => {
  const data: { config: Config } = useStaticQuery(graphql`
    {
      config {
        repo
        url
        wordings
        cdn
        meta {
          title
          description
          gaTrackId
        }
        about {
          email
          github
          name
          slug
          title
        }
        link {
          github
          mail
          zhihu
          weibo
          rss
        },
        img {
          default
          home
          link {
            github
            mail
            rss
            weibo
            zhihu
          }
          other {
            dot
            scroll
          }
        }
      }
    }
  `);
  const config = data.config;
  const isSafari = getBrowser() === "Safari";

  const getConfig: ()=> any = () => {
    return config;
  };

  const getHomeImg = () => {
    const img = isDebug()
      ? config.img.default.map((item) => `/default${item}`)
      : config.img.home.map((item) => `${config.cdn}/website/home${isSafari ? "" : "/webp"}${item}${isSafari ? "" : ".webp"}`);
  
    return img;
  };
  
  const getDefaultImg = () => {
    const img = isDebug()
      ? config.img.default.map((item) => `/default${item}`)
      : config.img.default.map((item) => `${config.cdn}/website/home${isSafari ? "" : "/webp"}${item}${isSafari ? "" : ".webp"}`);
  
    return img;
  };
  
  const getOtherImg = (type: OtherTypes) => {
    const img = isDebug()
      ? `${config.img.other[type]}`
      : `${config.cdn}/website/other${config.img.other[type]}`;
  
    return img;
  };
  
  const getLinkImg = (type: LinkTypes) => {
    const img = isDebug()
      ? `${config.img.link[type]}`
      : `${config.cdn}/website/link${config.img.link[type]}`;
  
    return img;
  };
  

  const [configHook] = useState({
    config,
    getConfig,
    getHomeImg,
    getDefaultImg,
    getLinkImg,
    getOtherImg,
  });

  return configHook;
}

export default useConfig;
