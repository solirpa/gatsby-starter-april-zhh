import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  footer: {
    top: 'auto',
    bottom: 0,
    textAlign: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        <Typography className={classes.root}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              window.open("https://www.gatsbyjs.org")
            }}
          >
            Gatsby
        </Link>
          <br />
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              window.open("http://beian.miit.gov.cn")
            }}
          >
            粤ICP备18064138号
        </Link>
        </Typography>
      </footer>
    </>
  )
}

export default Footer;
