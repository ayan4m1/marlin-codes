const { resolve } = require('path');

const createMarkdownPages = async ({ actions, graphql, reporter }) => {
  const component = resolve('src/components/markdownPage.js');
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              tag
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL markdown query.');
    return;
  }

  let counter = 0;

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      frontmatter: { tag }
    } = node;

    if (!tag) {
      reporter.warn(`Did not find a tag in the frontmatter of ${tag}`);
      return;
    }

    counter++;
    createPage({
      context: { tag },
      component,
      path: `/code/${tag}`
    });
  });

  reporter.info(`Created ${counter} markdown pages!`);
};

exports.createPages = async (options) => {
  await createMarkdownPages(options);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic'
    }
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~components': resolve(__dirname, 'src/components'),
        '~pages': resolve(__dirname, 'src/pages')
      }
    }
  });
};
