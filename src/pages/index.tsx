import React, { FC, useState } from "react";
import { graphql } from "gatsby";

import dayjs from "dayjs";
import Carousel from "nuka-carousel";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import NoSsr from "@material-ui/core/NoSsr";

import Layout from "@/components/Layout/layout";
import Introduce from "@/components/About/introduce";
import PostRectCard from "@/components/Card/postRect";
import SEO from "@/components/Seo/seo";

import useConfig from '@/components/Config';
import { getRandom } from "@/utils/utils"

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
  image: {
    height: '100vh',
    width: '100%',
    objectFit: 'cover'
  },
  downIconCtn: {
    height: "3rem",
    width: "100%",
    position: "absolute",
    top: "90vh",
    // zIndex: theme.zIndex.drawer + 1,
    textAlign: "center",
    cursor: "pointer",
  },
  downIcon: {
    height: '3rem',
    width: '3rem',
    background: '#80808052',
    fontSize: "3rem",
    color: "#fff",
  },
  contentContainer: {
    position: "relative",
    height: `${postLimit * 19.2}rem`,

    [theme.breakpoints.up("md")]: {
      height: `${postLimit * 16.5}rem`,
    },
  },
  content: {
    borderRadius: "0",
    width: "100%",
    paddingTop: "3.5rem",
    position: "absolute",
    top: "-3.5rem",
  },
}))

interface ScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: ScrollProps) {
  const classes = useStyles();
  const { children } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      "#content"
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Zoom in={true}>
      <div onClick={handleClick} role="presentation">
        {children}
      </div>
    </Zoom>
  )
}

// ScrollTop.propTypes = {
//   children: PropTypes.element.isRequired,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// }

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: any,
      }[]
    }
  }
}

const IndexPage: FC<IndexPageProps> = (props) => {
  const classes = useStyles();
  const [slideIndex, setSlideIndex] = useState(2);
  const { getHomeImg, getDefaultImg } = useConfig();
  const imgs = getHomeImg().sort(() => Math.random() > .5 ? -1 : 1);

  const { data } = props;
  const { edges } = data.allMarkdownRemark;

  const onArrowClick = (direction: string) => {
    return () => {
      let index = 1;
      if (direction === 'right') {
        index = slideIndex - 1;

        if (index < 0) {
          index = 0;
        }
      }

      if (direction === 'left') {
        index = slideIndex + 1;

        if (index === imgs.length) {
          index = imgs.length - 1;
        }
      }

      setSlideIndex(index);
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <NoSsr>
        <Box className={classes.homeImgCtn}>
          <div className={classes.homeImg}>
            <Carousel
              withoutControls={true}
              slideIndex={slideIndex}
              swiping={false}
            >
              {
                imgs.map((item, index) => (
                  <img key={`home_${index}`} className={classes.image} src={item} alt={`home_${index}`} />
                ))
              }
            </Carousel>
          </div>
        </Box>
        <Introduce
          disableArrow={(() => {
            if (slideIndex === 0) return 'right';
            if (slideIndex === imgs.length - 1) return 'left';
            return '';
          })()}
          onArrowLeftClick={onArrowClick("left")}
          onArrowRightClick={onArrowClick("right")}
        />
        <div className={`${classes.downIconCtn}`}>
          <ScrollTop {...props} >
            <IconButton size="medium" className={`${classes.downIcon} arrow-jump`}>
              <KeyboardArrowDownIcon />
            </IconButton>
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

export default IndexPage;

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
