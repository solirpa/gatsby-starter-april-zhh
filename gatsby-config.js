const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config/config.json').toString());

module.exports = {
  siteMetadata: {
    siteUrl: config.url,
    title: config.meta.title,
    description: config.meta.description,
    author: config.about.name,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/`,
        name: `content-pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-images`,
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          },
          {
            resolve: 'gatsby-remark-external-links',
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-less`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `${config.meta.title}`,
        short_name: `${config.about.name}`,
        start_url: `/`,
        background_color: '#ededed',
        theme_color: `#3f51b5`,
        display: `minimal-ui`,
        icon: `src/images/favicons.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          "@": `src/`,
        }
      }
    },
    {
      resolve: `gatsby-source-gravatar`,
      options: {
        emails: [ { email: `aprilyzl0405@gmail.com`, query: `?s=128` } ],
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-140673471-1",
        // this option places the tracking script into the head of the DOM
        head: true,
        // other options
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Sans SC', 'Noto Serif SC']
        }
      }
    },
    `gatsby-plugin-zopfli`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/`,
        name: `config`,
      },
    },
  ],
}
