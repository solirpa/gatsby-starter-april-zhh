import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getConfig } from '@/utils/utils';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'absolute',
    top: '16rem',
    width: '20rem',
  },
  avatarCtn: {
    textAlign: 'center',
    margin: '1rem 0 0 0',
  },
  img: {
    cursor: 'pointer',
    border: '1px solid #e1e4e8',
    borderRadius: '50%',
    webkitTransition: '-webkit-transform 0.3s ease',
    // transition: '-webkit-transform 0.3s ease',
    // transition: 'transform 0.3s ease',
    transition: 'transform 0.3s ease, -webkit-transform 0.3s ease',

    '&:hover': {
      transform: 'rotate(360deg)',
      MsTransform: 'rotate(360deg)',
      /* IE 9 */
      MozTransform: 'rotate(360deg)',
      /* Firefox */
      WebkitTransform: 'rotate(360deg)',
      /* Safari and Chrome */
      OTransform: 'rotate(360deg)',
    }
  },
  slug: {
    textAlign: 'center',
  }
}));

const About = (_, ref) => {
  const config = getConfig();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [imgLoad, setImgLoad] = useState(true);
  const { gravatar } = useStaticQuery(query);

  useImperativeHandle(ref, () => ({
    toggle: () => {
      setOpen(!open);
    }
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={`${classes.modal}`}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Fade in={open}>
            <div className={classes.paper}>
              <div className={classes.avatarCtn}>
                {
                  imgLoad ? (
                    <img 
                      alt="avatar" 
                      src={gravatar.url} 
                      className={classes.img} 
                      onLoad={()=> setImgLoad(true)} 
                      onClick={()=> window.open(config.about.github)} 
                    />
                  ) : <CircularProgress />
                }
              </div>
              <div className={classes.slug}>
                <Typography variant="h6">
                  {config.about.title}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  {config.about.slug}
                </Typography>
              </div>
            </div>
          </Fade>
        </Slide>
      </Modal>
    </>
  )
}

export default forwardRef(About);

export const query = graphql`
  query getGravatar {
    gravatar {
      url
    }
  }
  
`;
