import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@/components/Layout/layout';

const CategoryPage = ({ data, pageContext }) => {

  return (
    <Layout>

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
