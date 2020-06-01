import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import dayjs from "dayjs"

import { makeStyles } from "@material-ui/core/styles"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import Zoom from "@material-ui/core/Zoom"
import Box from "@material-ui/core/Box"
// import Grow from "@material-ui/core/Grow"
import Slide from "@material-ui/core/Slide"
import NoSsr from "@material-ui/core/NoSsr"

import Layout from "@/components/Layout/layout"
import Introduce from "@/components/About/introduce"
import PostRectCard from "@/components/Card/postRect"
import SEO from "@/components/Seo/seo"

import { getHomeImg, getDefaultImg, getRandom } from "@/utils/utils"

import "./index.less"

const postLimit = 10

const useStyles = makeStyles(theme => ({
  homeImgCtn: {
    // '&::before': {
    //   content: "''",
    //   backgroundImage: `url(${getOtherImg('dot')})`,
    //   position: 'absolute',
    //   width: '100%',
    //   height: '100vh',
    //   backgroundAttachment: 'fixed',
    // }
  },
  homeImg: {
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    MozBackgroundSize: "100%",
  },
  downIconCtn: {
    height: "3rem",
    width: "100%",
    position: "absolute",
    top: "90vh",
    zIndex: theme.zIndex.drawer + 1,
    textAlign: "center",
    cursor: "pointer",
  },
  downIcon: {
    fontSize: "3rem",
    color: "#fff",
  },
  contentContainer: {
    position: "relative",
    height: `${postLimit * 19}rem`,

    [theme.breakpoints.up("md")]: {
      height: `${postLimit * 16.5}rem`,
    },
  },
  content: {
    borderRadius: "0",
    width: "100%",
    paddingTop: "1.5rem",
    position: "absolute",
    top: "-3.5rem",
  },
}))

function ScrollTop(props) {
  const { children } = props
  const classes = useStyles()

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#content"
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Zoom in={true}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

const IndexPage = props => {
  const classes = useStyles()
  const [imgShow, setImgShow] = useState(true)
  const [direction, setDirection] = useState("right")
  const { data } = props
  const { edges } = data.allMarkdownRemark
  const imgs = getHomeImg()
  const [homeImg, setHomeImg] = useState(getRandom(imgs))

  const onArrowClick = direction => {
    return () => {
      let img = getRandom(imgs)

      setImgShow(!imgShow)
      setDirection(direction)

      while (img === homeImg) {
        img = getRandom(imgs)
      }

      setTimeout(() => {
        setDirection(direction === "left" ? "right" : "left")
        setImgShow(true)
        setHomeImg(img)
      }, 300)
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <NoSsr>
        {/* <Grow
        in={imgShow}
        style={{ transformOrigin: `center ${direction}` }}
      > */}
        <Slide
          direction={
            direction === "down"
              ? direction
              : direction === "left"
              ? "right"
              : "left"
          }
          in={imgShow}
          style={{ transformOrigin: `center ${direction}` }}
        >
          <Box className={classes.homeImgCtn}>
            <div
              style={{
                backgroundImage: `url(${homeImg ||
                  getRandom(getDefaultImg())})`,
              }}
              className={classes.homeImg}
            />
          </Box>
        </Slide>
        {/* </Grow> */}
        <Introduce
          onArrowLeftClick={onArrowClick("left")}
          onArrowRightClick={onArrowClick("right")}
        />
        <div className={`${classes.downIconCtn}`}>
          <ScrollTop {...props}>
            <KeyboardArrowDownIcon
              size="large"
              className={`${classes.downIcon} arrow-jump`}
            />
          </ScrollTop>
        </div>

        <div className={classes.contentContainer}>
          <div id="content" className={classes.content}>
            {edges.map(({ node }, index) => {
              const {
                frontmatter,
                fields: { path },
              } = node
              const image = frontmatter.image || getRandom(getDefaultImg())
              const formatDate = dayjs(frontmatter.date).format("YYYY-MM-DD")
              const { title, description, tags, categories } = frontmatter

              return (
                <React.Fragment key={path}>
                  <Slide
                    direction="left"
                    in={true}
                    mountOnEnter
                    unmountOnExit
                    timeout={800}
                  >
                    <Box>
                      <PostRectCard
                        direction={index % 2 === 0 ? "right" : "left"}
                        path={path}
                        image={image}
                        date={formatDate}
                        title={title}
                        description={description}
                        tags={tags}
                        categories={categories}
                      />
                    </Box>
                  </Slide>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </NoSsr>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query getAllPost {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: 10
    ) {
      edges {
        node {
          id
          fields {
            path
          }
          frontmatter {
            title
            date
            tags
            categories
            description
            image
          }
        }
      }
    }
  }
`
