import React from 'react';
import { graphql } from 'gatsby';

import dayjs from 'dayjs';

import { useSearchParam } from 'react-use';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';

import { getHomeImg, getDefaultImg, getRandom } from '@/utils/utils';

import Layout from '@/components/Layout/layout';
import BackGround from "@/components/Layout/background";
import Categories from '@/components/Categories';
import PostCard from '@/components/Card/post';

const useStyles = makeStyles(theme => ({
  backgroundiv: {
    height: '50vh',
    overflow: 'hidden',
    backgroundPositionY: '-25rem',
  },
  paper: {
    padding: '1rem',
    position: 'relative',
    top: '-3rem',
  },
  categoryCtn: {
    display: '-webkit-flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

const CategoryPage = ({ data, pageContext }) => {
  const classes = useStyles();
  const { edges } = data.allMarkdownRemark;
  const { category, categories } = pageContext;

  return (
    <Layout>
      <BackGround image={getRandom(getHomeImg())} />
      <NoSsr>
        <Container>

          <Paper elevation={3} className={`${classes.paper} ${classes.paperTop} ${classes.categoryCtn}`}>
            <Categories categories={categories} select={category} type={useSearchParam("t")} />
          </Paper>
          <div className="col-xl-10 col-lg-7 col-md-12 col-xs-12 order-2">
            <div
              className="col-12"
              style={{
                fontSize: 20,
                margin: 15,
              }}
            >
              {edges.length}
              &nbsp;Articles in&nbsp;
              {category}
            </div>
            <Grid container spacing={2}>
              {
                edges.map(({ node }) => {
                  const { frontmatter, fields: { path } } = node;
                  const image = frontmatter.image || getRandom(getDefaultImg());
                  const formatDate = dayjs(frontmatter.date).format('YYYY-MM-DD');
                  const { title, description, tags, categories } = frontmatter;

                  return (
                    <Grid item xs={12} sm={6} md={4} key={title}>

                      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={800}>
                        <Box>
                          <PostCard
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
                    </Grid>
                  )
                })
              }
            </Grid>

          </div>
          <div className="col-xl-2 col-lg-1 order-3" />
        </Container>
      </NoSsr>
    </Layout>
  )
}

export default CategoryPage;

export const pageQuery = graphql`
  query categoryQuery($category: [String!]) {
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {categories: {in: $category}}}) {
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
      totalCount
    }
  }`
