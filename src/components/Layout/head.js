// <meta name="theme-color" content={config.meta.theme_color} />

import React from 'react';
import { Helmet } from 'react-helmet';

import { useTheme } from '@material-ui/core/styles';


const Head = (props) => {
  const theme = useTheme();

  return (
    <Helmet defaultTitle="April5's Fairyland">
      <meta charSet="utf-8" />
      {/*<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={config.meta.description} />
      <meta name="keyword" content={config.meta.keyword} /> */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={theme.palette.primary.main} />
      <meta
        name="msapplication-navbutton-color"
        content={theme.palette.primary.main}
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content={theme.palette.primary.main}
      />
    </Helmet >
  )
}

export default Head;
