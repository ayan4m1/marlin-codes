require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Marlin Codes',
    description: 'Searchable database of Marlin G-code.',
    author: '@ayan4m1',
    siteUrl: 'https://marlincodes.org'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'gcode',
        path: `${__dirname}/docs/_gcode`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Marlin Codes',
        /* eslint-disable camelcase */
        short_name: 'MarlinCodes',
        start_url: '/',
        background_color: '#4582ec',
        theme_color: '#4582ec',
        /* eslint-enable camelcase */
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: true,
        anonymize: true
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-offline',
    'gatsby-plugin-eslint',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet'
  ]
};
