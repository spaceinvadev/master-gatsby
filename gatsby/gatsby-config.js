require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
}),
  (module.exports = {
    siteMetadata: {
      siteUrl: `https://gatsby.pizza`,
      title: `Slick's Slices`,
      description: `The best pizza place in the world!`,
    },
    plugins: [
      'gatsby-plugin-styled-components',
      {
        resolve: 'gatsby-source-sanity',
        options: {
          projectId: 'yhyrbu9d',
          dataset: 'production',
          watchMode: true,
          token: process.env.SANITY_ACCESS_TOKEN,
        },
      },
    ],
  });
