import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Zoom from '@material-ui/core/Zoom';
import Box from '@material-ui/core/Box';

import Layout from "@/components/Layout/layout";
import SEO from "@/components/Seo/seo";

import { getHomeImg, getOtherImg, getRandom } from "@/utils/utils";

import './index.less';

const useStyles = makeStyles((theme) => ({
  homeImgCtn: {
    '&::before': {
      content: "''",
      backgroundImage: `url(${getOtherImg('dot')})`,
      position: 'absolute',
      width: '100%',
      height: '100vh',
      backgroundAttachment: 'fixed',
    }
  },
  homeImg: {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    MozBackgroundSize: '100%',
  },
  downIconCtn: {
    height: '3rem',
    width: '100%',
    position: 'relative',
    bottom: '4.5rem',
    zIndex: theme.zIndex.drawer + 1,
    textAlign: 'center',
    cursor: 'pointer',
  },
  downIcon: {
    fontSize: '3rem',
    color: '#fff',
  },
  content: {
    height: '10rem',
    borderRadius: '0',
  }
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#content');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Zoom in={true}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const IndexPage = (props) => {
  const classes = useStyles();
  const imgs = getHomeImg();
  const [ homeImg, setHomeImg ] = useState(getRandom(imgs));

  return (
    <Layout>
      <SEO title="Home" />
      <Box className={classes.homeImgCtn}>
        <div style={{ backgroundImage: `url(${homeImg})` }} className={classes.homeImg} />
      </Box>
      <div className={`${classes.downIconCtn}`}>
        <ScrollTop {...props}>
          <KeyboardArrowDownIcon size="large" className={`${classes.downIcon} arrow-jump`} />
        </ScrollTop>
      </div>

      <div id="content" className={classes.content}>
      </div>
    </Layout>
  )
}

export default IndexPage
