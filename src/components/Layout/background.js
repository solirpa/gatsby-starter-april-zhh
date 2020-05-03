import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { getDefaultImg, getHomeImg, getOtherImg, getRandom } from '@/utils/utils';

const useStyles = makeStyles(theme => ({
  backImgCtn: {
    '&::before': {
      content: "''",
      backgroundImage: `url(${getOtherImg('dot')})`,
      position: 'absolute',
      width: '100%',
      height: '50vh',
      backgroundAttachment: 'fixed',
    },
    '&::after': {
      position: 'absolute',
      content: "''",
      width: '100%',
      height: '50vh',
      top: 0,
      left: 0,
      boxShadow: `0 -10px 10px 0 ${theme.palette.background.default} inset`,
    }
  },
  backgroundiv: {
    height: '50vh',
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
