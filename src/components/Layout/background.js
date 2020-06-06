import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { getDefaultImg, getHomeImg, getRandom } from '@/utils/utils';

const useStyles = makeStyles(theme => ({
  backImgCtn: {
    // '&::before': {
    //   content: "''",
    //   backgroundImage: `url(${getOtherImg('dot')})`,
    //   position: 'absolute',
    //   width: '100%',
    //   height: '75vh',
    //   backgroundAttachment: 'fixed',
    // },
    '&::after': {
      position: 'absolute',
      content: "''",
      width: '100%',
      height: '10vh',
      top: '75vh',
      left: 0,
      boxShadow: `0 -20px 10px 10px ${theme.palette.background.default}`,
    }
  },
  backgroundiv: {
    height: '75vh',
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // backgroundPositionY: '-10rem',
    // [theme.breakpoints.down('md')]: {
    //   backgroundPositionY: 0,
    // },
    [theme.breakpoints.down('xs')]: {
      // backgroundPositionX: '-8rem',
      backgroundPosition: 'center',
    },
  },
}));

const BackGround = ({ image, type }) => {
  const classes = useStyles();
  const [showImage, setShowImage] = useState(image || null);

  useEffect(()=> {
    let getImg = getDefaultImg;

    if (type === 'home') getImg = getHomeImg;

    setShowImage(getRandom(getImg()));
  }, [type]);

  return (
    <Box className={classes.backImgCtn}>
      <div className={classes.backgroundiv} style={{ backgroundImage: showImage && `url(${showImage})` }} />
    </Box>
  )
}


BackGround.propTypes = {
  image: PropTypes.string,
  type: PropTypes.string,
}

export default BackGround;
