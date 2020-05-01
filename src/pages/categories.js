import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';

import { getHomeImg, getRandom } from '@/utils/utils';

import Layout from '@/components/Layout/layout';
import BackGround from "@/components/Layout/background";
import Categories from '@/components/Categories';

const useStyles = makeStyles(theme => ({
  categoryCtn: {
    // display: 'flex',
    display: '-webkit-flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paper: {
    padding: '1rem',
    position: 'relative',
    top: '-3rem',
  },
  paperTop: {
    marginBottom: '3rem',
  }
}));

const CategoryPage = ({ data }) => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryMap = new Map();
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { categories = [] } = node.frontmatter;

      categories && categories.forEach((name) => {
        if (categoryMap.has(name)) {
          categoryMap.set(name, categoryMap.get(name) + 1);
        } else {
          categoryMap.set(name, 1);
        }
      });
    });

    const t = Array.from(categoryMap.keys()).map(category => ({
      text: category,
      value: categoryMap.get(category)
    }));

    setCategories([...t]);
  }, [data]);

  return (
    <Layout>
      <BackGround image={getRandom(getHomeImg())} />
      <Container>
        <NoSsr>
          <Paper elevation={3} className={`${classes.paper} ${classes.paperTop} ${classes.categoryCtn}`}>
            <Categories categories={categories} type="wall" />
          </Paper>
          <Paper elevation={3} className={classes.paper}>
            <Categories categories={categories} type="radar" />
          </Paper>
        </NoSsr>
      </Container>
    </Layout>
  )
}

export default CategoryPage;

export const pageQuery = graphql`
  query getAllCategories {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            categories
          }
        }
      }
    }
  }
`;
