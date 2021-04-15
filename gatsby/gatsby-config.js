require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
}),
  (module.exports = {
    siteMetadata: {
      title: `Slick's Slices`,
      siteUrl: `https://gatsby.pizza`,
      description: `The best pizza place in the world!`,
      twitter: '@slicksSlices',
    },
    plugins: [
      'gatsby-plugin-react-helmet',
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
