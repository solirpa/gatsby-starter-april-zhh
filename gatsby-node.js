/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config/config.json').toString());
const { createFilePath } = require(`gatsby-source-filesystem`);

const dayjs = require('dayjs');
const crypto = require('crypto');

// gatsby-node.js
exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
    // turn off source-maps
    actions.setWebpackConfig({
      devtool: false
    })
  }
};

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  const CONFIG_NODE_TYPE = 'config';

  createNode({
    ...config,
    id: createNodeId(`${CONFIG_NODE_TYPE}`),
    parent: null,
    children: [],
    internal: {
      type: CONFIG_NODE_TYPE,
      // content: JSON.stringify(config),
      contentDigest: createContentDigest(config),
    },
  })
  return
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    const { frontmatter } = node;
    const { date } = frontmatter;

    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "data/",
    });

    // Creates new query'able field with name of 'path'
    createNodeField({
      node,
      name: "path",
      value: `/${dayjs(date).format('YYYY/MM/DD')}${relativeFilePath}`,
    });
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              path
            }
            frontmatter {
              tags
              categories
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return;
  }

  const tagSet = new Set();
  const tagMap = new Map();

  const categorySet = new Set();
  const categoryMap = new Map();

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { fields, frontmatter } = node;
    const { tags, categories } = frontmatter;

    // 读取标签
    if (tags) {
      tags.forEach(item => {
        tagSet.add(item);

        if (tagMap.has(item)) {
          tagMap.set(item, tagMap.get(item) + 1);
        } else {
          tagMap.set(item, 1);
        }
      });
    }

    // 读取分类
    if (categories) {
      categories.forEach(item => {
        item = item.toLowerCase();
        categorySet.add(item);

        if (categoryMap.has(item)) {
          categoryMap.set(item, categoryMap.get(item) + 1);
        } else {
          categoryMap.set(item, 1);
        }
      });
    }

    createPage({
      path: fields.path,
      component: path.resolve(`src/templates/post/post.tsx`),
      context: {}, // additional data can be passed via context
    });
  });

  tagSet.forEach(tag => {

    createPage({
      path: `/tags/${tag}-${crypto.createHash('md5').update(tag).digest("hex")}/`,
      component: path.resolve('src/templates/tag/tag.tsx'),
      context: {
        tag,
        tags: Array.from(tagMap.keys()).map(tag => {
          return {
            text: tag,
            value: tagMap.get(tag)
          }
        })
      },
    });
  });

  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${category}-${crypto.createHash('md5').update(category).digest("hex")}/`,
      component: path.resolve('src/templates/category/category.tsx'),
      context: {
        category,
        categories: Array.from(categoryMap.keys()).map(category => ({
          text: category,
          value: categoryMap.get(category)
        }))
      },
    });
  });
}
