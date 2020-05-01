import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

import { getConfig, getLinkImg } from '@/utils/utils';

import './about.less';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '27rem',
    margin: 'auto',
    position: 'relative',
    top: '-30rem',
    background: 'rgba(0,0,0,.5)',
    height: '5rem',
    borderRadius: '0.5rem',

    [theme.breakpoints.down('xs')]: {
      width: '23rem',
    },
  },
  slug: {
    color: 'white',
    margin: 'auto',
    textAlign: 'center',
    paddingTop: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bolder',
  },
  arrow: {
    textAlign: 'center',
    top: '1.75rem',
    fontSize: '1rem',
    position: 'relative',
    color: 'rgb(18, 150, 219)',
    cursor: 'pointer',
    '&:hover': {
      color: '#ff8f00',
    }
  },
  button: {
    background: 'transparent',
    border: 0,
  },
  link: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  icon: {
    width: '1rem',
    cursor: 'pointer',
  }
}));

const Introduce = ({ onArrowLeftClick, onArrowRightClick }) => {
  const classes = useStyles();
  const config = getConfig();



  const openLink = (type) => {
    console.log(type);

    if (type === 'mail') {
      const mail = 'mailto:' + config.link.mail;
      window.open(mail)
      return;
    }

    window.open(config.link[type]);
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item sm={1} className={`${classes.arrow} arrow-scale`}>
          <ArrowBackIosOutlinedIcon onClick={() => onArrowLeftClick()} />
        </Grid>
        <Grid item sm={10}>
          <Typography variant="subtitle1" component="p" className={classes.slug}>
            <FormatQuoteIcon />{config.about.slug}<FormatQuoteIcon />
          </Typography>
          <div className={classes.link}>
            {
              Object.keys(config.link).map(item => (
                <Box key={item} className={classes.button} component="button" onClick={() => openLink(item)}>
                  <img
                    alt={item}
                    className={classes.icon}
                    src={getLinkImg(item)}
                  />
                </Box>
              ))
            }
          </div>
        </Grid>
        <Grid item sm={1} className={`${classes.arrow} arrow-scale`}>
          <ArrowForwardIosOutlinedIcon onClick={() => onArrowRightClick()} />
        </Grid>
      </Grid>
    </>
  )
}

Introduce.propTypes = {
  onArrowLeftClick: PropTypes.func,
  onArrowRightClick: PropTypes.func,
}

export default Introduce;
