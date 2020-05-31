import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// import { isDebug } from '@/utils/utils';

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
          {/* {
            !isDebug() ? (
              <>
                <span id="busuanzi_container_site_pv" style={{ display: 'block' }}>本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
                <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
                <br />
              </>
            ) : null
          } */}
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
