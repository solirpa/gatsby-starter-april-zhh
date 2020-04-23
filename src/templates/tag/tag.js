import React from 'react';
import { graphql } from 'gatsby';

import dayjs from 'dayjs';

import { useSearchParam } from 'react-use';

import { makeStyles } from '@material-ui/core/styles';

import Layout from '@/components/Layout/layout';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';

import Tags from '@/components/Tags';
import PostCard from '@/components/Card/post';

const useStyles = makeStyles(theme => ({
  backgroundiv: {
    height: '50vh',
    overflow: 'hidden',
    background: `/url(/longmao.png) center`,
    backgroundPositionY: '-25rem',
  },
  paper: {
    padding: '1rem',
    position: 'relative',
    top: '-3rem',
  },
  tagCtn: {
    display: '-webkit-flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

// eslint-disable-next-line react/prop-types
const TagPage = ({ data, pageContext }) => {
  const classes = useStyles();
  const { edges } = data.allMarkdownRemark;
  const { tag, tags } = pageContext;

  return (
    <Layout>
      <div className={classes.backgroundiv} />
      <Container>

        <Paper elevation={3} className={`${classes.paper} ${classes.paperTop} ${classes.tagCtn}`}>
          <Tags tags={tags} select={tag} type={useSearchParam("t")} />
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
              {tag}
          </div>
          <Grid container spacing={2}>
            {
              edges.map(({ node }) => {
                const { frontmatter, fields: { path } } = node;
                const image = frontmatter.image || 'http://static.blinkfox.com/20190302.png';
                const formatDate = dayjs(frontmatter.date).format('YYYY-MM-DD');
                const { title, description, categories } = frontmatter;

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
                          tagShow={false}
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
    </Layout>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query tagQuery($tag: [String!]) {
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {tags: {in: $tag}}}) {
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

