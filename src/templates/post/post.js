import React, { useEffect, useMemo } from "react"
import { graphql } from "gatsby"

import dayjs from "dayjs"

import "katex/dist/katex.min.css"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"

import EventNoteOutlined from "@material-ui/icons/EventNoteOutlined"

import * as tocbot from "tocbot"
import "tocbot/dist/styles.css"
import "tocbot/dist/tocbot.css"

// import { getOtherImg } from "@/utils/utils"

import Layout from "@/components/Layout/layout"
import BackGround from "@/components/Layout/background"
import "./post.less"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  top: {
    position: "relative",
    marginTop: "-3rem",
    overflow: "auto",
  },
  toc: {
    marginTop: "4rem",
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
    "& .toc-header": {
      marginBottom: ".5rem",
      fontWeight: 500,
      lineHeight: ".5rem",
      "&, & > i": {
        fontSize: "1.25rem",
      },
    },
    "& #tocbot": {
      maxHeight: "100%",
      overflowY: "auto",
      overflow: "-moz-scrollbars-none",
      MsOverflowStyle: "none",
      "& ol": {
        listStyle: "none",
        paddingInlineStart: "1rem",
      },
      "& &::-webkit-scrollbar": {
        display: "none",
      },
    },
    "& .tocbot-list": {
      position: "sticky",
      top: "2rem",
      maxHeight: "80%",
      listStyle: "none",
      paddingLeft: "1rem",
      marginLeft: 0,
      "& li": {
        marginBottom: "calc(1.45rem / 3)",
      },
      "& a": {
        fontSize: "0.95rem",
      },
      "& .toc-link::before": {
        background: "transparent",
      },
    },
    "& .tocbot-link": {
      color: "gray",
    },
    "& .tocbot-active-link": {
      fontWeight: "bold",
      color: "$tocbot-link-active-color",
    },
    "& .tocbot-is-collapsed": {
      maxHeight: 0,
    },
    "& .tocbot-is-collapsible": {
      overflow: "hidden",
      transition: "all 300ms ease-in-out",
      marginTop: "calc(1.45rem / 4)",
    },
  },
  paper: {
    padding: theme.spacing(2),
    // color: theme.palette.text.secondary,
    "& .katex-html": {
      overflow: "auto",
    },
    borderRadius: "0px",
    [theme.breakpoints.up("md")]: {
      borderRadius: "4px",
    },
  },
  blogPostContainer: {
    overflow: "auto",

    "& h1,h2,h3": {
      fontFamily: "Noto Serif SC",
    },
  },
  blogPostContent: {
    marginTop: '3rem',

    "& .line-numbers-rows": {
      paddingTop: "1rem",
      paddingLeft: "0.5rem",
    },
  },
  backImgCtn: {
    // "&::before": {
    //   content: "''",
    //   backgroundImage: `url(${getOtherImg("dot")})`,
    //   position: "absolute",
    //   width: "100%",
    //   height: "50vh",
    //   backgroundAttachment: "fixed",
    // },
  },
  backgroundiv: {
    height: "50vh",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPositionY: "-10rem",
    // boxShadow: '8px 10px 20px 10px rgba(19, 19, 0, 0.5), -3px 5px 10px 1px rgba(255,255,255,0.5)'
  },
  title: {
    fontSize: '1.5rem',
    [theme.breakpoints.up('md')]: {
      textAlign: "center",
    },
  },
  date: {
    display: "flex",

    [theme.breakpoints.up('md')]: {
      justifyContent: "center",
      textAlign: "center",
    },
  },
  divider: {
    marginTop: '5px'
  }
}))

export default function PostPage(props) {
  const classes = useStyles()
  const { data, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window() : undefined,
    threshold: 390,
  })
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const _html = useMemo(()=> {
    return html.replace(/<\/h3>/g, '</h4>').replace(/<h3/g, '<h4').replace(/<\/h2>/g, '</h3>').replace(/<h2/g, '<h3').replace(/<\/h1>/g, '</h2>').replace(/<h1/g, '<h2');
  }, [html]);

  useEffect(() => {
    const offsetTop = 0 - document.getElementById("postoc").offsetTop

    tocbot.init({
      // Where to render the table of contents.
      tocSelector: "#postoc",
      // Where to grab the headings to build the table of contents.
      contentSelector: "#post",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h2, h3, h4",
      // For headings inside relative or absolute positioned containers within content.
      // hasInnerContainers: true,
      // scrollContainer: '#postoc',
      scrollSmooth: true,
      // linkClass: 'tocbot-link',
      activeLinkClass: "tocbot-active-link",
      listClass: "tocbot-list",
      isCollapsedClass: "tocbot-is-collapsed",
      collapsibleClass: "tocbot-is-collapsible",
      collapseDepth: 1,
      headingsOffset: offsetTop,
      //orderedList: false,
    })
    const tocListItem = document.getElementsByClassName(".toc-list-item")
    if (tocListItem.length > 0) {
      const toc = document.getElementById("toc")
      toc.style.visibility = "visible"
    }

    return () => {
      tocbot.destroy()
    }
  }, [])

  return (
    <Layout>
      <div className={classes.root}>
        <BackGround image={frontmatter.image} />
        <Grid container className={classes.top}>
          <Grid item md={3} />
          <Grid item lg={6} md={12}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.blogPostContainer}>
                <div className="blog-post">
                  <h1 className={classes.title}>{frontmatter.title}</h1>
                  <Box className={classes.date}>
                    <EventNoteOutlined
                      fontSize="small"
                      style={{ marginRight: "7px" }}
                    />
                    <span>{dayjs(frontmatter.date).format("YYYY-MM-DD")}</span>
                  </Box>

                  <Divider variant="middle" className={classes.divider} />
                  {/* <div dangerouslySetInnerHTML={{ __html: tableOfContents }}/> */}

                  <div
                    id="post"
                    className={classes.blogPostContent}
                    dangerouslySetInnerHTML={{ 
                      __html: _html
                    }}
                  />
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item md={3} className={classes.toc}>
            <div
              id="postoc"
              style={{
                // position: 'sticky',
                position: trigger ? "fixed" : "sticky",
                top: "4rem",
              }}
            ></div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      tableOfContents(
        heading: ""
        maxDepth: 10
        pathToSlugField: ""
        absolute: false
      )
      html
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        image
      }
    }
  }
`
