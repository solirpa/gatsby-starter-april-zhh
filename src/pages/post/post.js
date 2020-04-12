import React, { useEffect } from "react";
import { graphql } from "gatsby";

import "katex/dist/katex.min.css";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as tocbot from 'tocbot';
import "tocbot/dist/styles.css";
import "tocbot/dist/tocbot.css";

import Layout from "@/components/Layout/layout";
import "./post.less";

import backgroundimg from "@/images/longmao.png";
// import backgroundmp4 from "@/images/longmao.mp4";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  top: {
    position: 'relative',
    marginTop: '-3rem',
  },
  toc: {
    marginTop: '4rem',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
    '& .toc-header': {
      marginBottom: '.5rem',
      fontWeight: 500,
      lineHeight: '.5rem',
      '&, & > i': {
        fontSize: '1.25rem'
      },
    },
    '& #tocbot': {
      maxHeight: '100%',
      overflowY: 'auto',
      overflow: '-moz-scrollbars-none',
      MsOverflowStyle: 'none',
      '& ol': {
        listStyle: 'none',
        paddingInlineStart: '1rem'
      },
      '& &::-webkit-scrollbar' :{
        display: 'none',
      }
    },
    '& .tocbot-list': {
      position: 'sticky',
      top: '2rem',
      maxHeight: '80%',
      listStyle: 'none',
      paddingLeft: '1rem',
      marginLeft: 0,
      '& li': {
        marginBottom: 'calc(1.45rem / 3)',
      },
      '& a': {
        fontSize: '0.95rem'
      },
      '& .toc-link::before': {
        background: 'transparent',
      }
    },
    '& .tocbot-link': {
      color: 'gray',
    },
    '& .tocbot-active-link': {
      fontWeight: 'bold',
      color: '$tocbot-link-active-color',
    },
    '& .tocbot-is-collapsed': {
      maxHeight: 0,
    },
    '& .tocbot-is-collapsible': {
      overflow: 'hidden',
      transition: 'all 300ms ease-in-out',
      marginTop: 'calc(1.45rem / 4)',
    }
  },
  paper: {
    padding: theme.spacing(2),
    // color: theme.palette.text.secondary,
    '& .katex-html': {
      overflow: 'auto',
    },
    borderRadius: '0px',
    [theme.breakpoints.up('md')]: {
      borderRadius: '4px',
    },
  },
  blogPostContainer: {
    overflow: 'auto',
  },
  blogPostContent: {
    '& .line-numbers-rows': {
      paddingTop: '1rem',
      paddingLeft: '0.5rem',
    }
  },
  backgroundiv: {
    height: '50vh', 
    overflow: 'hidden',
    background: `URL(${backgroundimg}) center`,
    backgroundPositionY: '-25rem',
    // boxShadow: '8px 10px 20px 10px rgba(19, 19, 0, 0.5), -3px 5px 10px 1px rgba(255,255,255,0.5)'
  },
  backgroundimg: {
    // top: '-10rem',
    // position: 'relative',
    // [theme.breakpoints.up('lg')]: {
    //   top: '-25rem',
    // },
    // [theme.breakpoints.down('xs')]: {
    //   height: 'inherit',
    //   position: 'unset',
    // },
  }
}));

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const classes = useStyles();
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  useEffect(()=> {
    const offsetTop = 0 - document.getElementById('postoc').offsetTop;

    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '#postoc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '#post',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      // hasInnerContainers: true,
      // scrollContainer: '#postoc',
      scrollSmooth: true,
      // linkClass: 'tocbot-link',
      activeLinkClass: 'tocbot-active-link',
      listClass: 'tocbot-list',
      isCollapsedClass: 'tocbot-is-collapsed',
      collapsibleClass: 'tocbot-is-collapsible',
      collapseDepth: 2,
      headingsOffset: offsetTop,
      //orderedList: false,
    });
    const tocListItem = document.getElementsByClassName('.toc-list-item');
    if (tocListItem.length > 0) {
      const toc = document.getElementById('toc');
      toc.style.visibility = 'visible';
    }

    return ()=> {
      tocbot.destroy();
    }
  }, []);

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.backgroundiv}>
          {/* <img alt="backgroundimg" src={backgroundimg} className={classes.backgroundimg} />
          <video  className={classes.backgroundimg} autoplay="autoplay" loop="loop">
            <source src={backgroundmp4} type="video/mp4" />
          </video> */}
        </div>
        <Grid container className={classes.top}>
          <Grid item md={3} />
          <Grid item lg={6} md={12}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.blogPostContainer}>
                <div className="blog-post">
                  <h1>{frontmatter.title}</h1>
                  <h2>{frontmatter.date}</h2>

                  {/* <div dangerouslySetInnerHTML={{ __html: tableOfContents }}/> */}

                  <div
                    id="post"
                    className={classes.blogPostContent}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item md={3} id="postoc" className={classes.toc}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
      </div>
    </Layout >
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      tableOfContents(heading: "", maxDepth: 10, pathToSlugField: "", absolute: false)
      html
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
