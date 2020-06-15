import React, { FC, useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import useConfig from '@/components/Config';
import { getRandom } from '@/utils/utils';

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

interface BackGroundProps { 
  image?: string;
  type?: string;
}

const BackGround: FC<BackGroundProps> = ({ image = '', type }) => {
  const classes = useStyles();
  const { getDefaultImg, getHomeImg } = useConfig();
  const [showImage, setShowImage] = useState(image);

  useEffect(() => {
    if (!image) {
      let getImg = getDefaultImg;

      if (type === 'home') getImg = getHomeImg;
  
      setShowImage(getRandom(getImg()));
    }
  }, [type]);

  return (
    <Box className={classes.backImgCtn}>
      <div className={classes.backgroundiv} style={{ backgroundImage: showImage && `url(${showImage})` }} />
    </Box>
  )
}

export default BackGround;
