import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Zoom from '@material-ui/core/Zoom';

import Layout from "@/components/Layout/layout";
import SEO from "@/components/Seo/seo";

import './index.less';

const useStyles = makeStyles((theme) => ({
  homeimg: {
    height: '100vh',
    background: `url(http://static.april-zhh.cn/longmao.png) center`,
  },
  downIconCtn: {
    height: '3rem',
    width: '100%',
    position: 'absolute',
    bottom: '1.5rem',
    zIndex: theme.zIndex.drawer + 1,
    textAlign: 'center',
    cursor: 'pointer',
  },
  downIcon: {
    fontSize: '3rem',
    color: '#fff',
  },
  content: {
    height: '75rem',
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

  return (
    <Layout>
      <SEO title="Home" />
      <div className={classes.homeimg} />
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
