import React, { FC } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import useConfig, { LinkTypes } from '@/components/Config';

import "./about.less";

const useStyles = makeStyles(theme => ({
  root: {
    width: "27rem",
    margin: "auto",
    position: "relative",
    bottom: "60vh",
    background: "rgba(0,0,0,.5)",
    height: "5rem",
    borderRadius: "0.5rem",

    [theme.breakpoints.down("xs")]: {
      width: "23rem",
    },
  },
  slug: {
    color: "white",
    textShadow: "0 0 5px #c3c3c3",
    margin: "auto",
    textAlign: "center",
    paddingTop: "0.5rem",
    fontSize: "1.1rem",
    fontWeight: "bolder",
  },
  arrow: {
    textAlign: "center",
    top: "1.75rem",
    fontSize: "1rem",
    position: "relative",
    color: "rgb(18, 150, 219)",
    cursor: "pointer",
    "&:hover": {
      color: "#ff8f00",
    },
  },
  button: {
    background: "transparent",
    border: 0,
  },
  link: {
    display: "flex",
    justifyContent: "space-around",
  },
  icon: {
    width: "1rem",
    cursor: "pointer",
    top: "0.3rem",
    position: "relative",
  },
}))

interface IntroduceProps {
  disableArrow: string;
  onArrowLeftClick: ()=> void;
  onArrowRightClick: ()=> void;
}

const Introduce: FC<IntroduceProps> = ({ disableArrow, onArrowLeftClick, onArrowRightClick }) => {
  const classes = useStyles();
  const { config, getLinkImg } = useConfig();

  const openLink = (type: LinkTypes) => {

    if (type === "mail") {
      const mail = "mailto:" + config.link.mail
      window.open(mail)
      return
    }

    window.open(config.link[type]);
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item sm={1} className={`${classes.arrow} arrow-scale`}>
          <ArrowBackIosOutlinedIcon
            style={{ 
              color: disableArrow === "left" ? "gray" : "unset",
              cursor: disableArrow === "left" ? "not-allowed" : "pointer",
            }}
            onClick={
              disableArrow === "left" ? _ => {} : () => onArrowLeftClick()
            }
          />
        </Grid>
        <Grid item sm={10}>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.slug}
          >
            <FormatQuoteIcon />
            {config.about.slug}
            <FormatQuoteIcon />
          </Typography>
          <div className={classes.link}>
            {Object.keys(config.link).map((item: any) => (
              <Box
                key={item}
                className={classes.button}
                component="button"
                onClick={() => openLink(item)}
              >
                <img
                  alt={item}
                  className={classes.icon}
                  src={getLinkImg(item)}
                />
              </Box>
            ))}
          </div>
        </Grid>
        <Grid item sm={1} className={`${classes.arrow} arrow-scale`}>
          <ArrowForwardIosOutlinedIcon
            style={{ 
              color: disableArrow === "right" ? "gray" : "unset",
              cursor: disableArrow === "right" ? "not-allowed" : "pointer",
            }}
            onClick={
              disableArrow === "right" ? _ => {} : () => onArrowRightClick()
            }
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Introduce;
