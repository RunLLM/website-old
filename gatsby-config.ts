import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `website-gatsby`,
    siteUrl: `https://www.yourdomain.tld`,
    description: 'An open-source platform to deploy and manage machine learning models.'
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'static/favicon.ico'
      },
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: 'ENZMZUKB',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-gist",
          },
          {
            resolve: 'gatsby-remark-prismjs',
          }
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'team',
        path: `${__dirname}/src/content/team`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/content/blog`,
      },
    },
  ],
}

export default config;