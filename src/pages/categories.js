import React from 'react';
import { graphql } from 'gatsby';

// import { makeStyles } from '@material-ui/core/styles';


import Layout from '@/components/Layout/layout';

const CategoryPage = (props)=> {

  return (
    <Layout>

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
