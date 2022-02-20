const { resolve } = require('path');

const createMarkdownPages = async ({ actions, graphql, reporter }) => {
  const component = resolve('src/components/tag.js');
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        nodes {
          id
          frontmatter {
            tag
            codes
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

  result.data.allMarkdownRemark.nodes.forEach((node) => {
    const {
      id,
      frontmatter: { tag, codes }
    } = node;

    counter++;

    if (!tag) {
      reporter.warn(`Did not find a tag in the frontmatter of ${id}`);
      return;
    }

    for (const code of codes) {
      reporter.info(`Creating page /code/${code}`);
      createPage({
        context: { tag },
        component,
        path: `/code/${code}`
      });
    }

    reporter.info(`Creating page /tag/${tag}`);
    createPage({
      context: { tag },
      component,
      path: `/tag/${tag}`
    });
  });

  reporter.info(`Parsed ${counter} markdown files!`);
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

const wrapArray = (arrayOrString, splitter) => {
  if (!arrayOrString) {
    return null;
  }

  if (Array.isArray(arrayOrString)) {
    return arrayOrString;
  }

  if (splitter) {
    return arrayOrString.split(splitter);
  } else {
    return [arrayOrString];
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: 'MarkdownRemarkFrontmatter',
      fields: {
        group: {
          type: '[String]',
          resolve: ({ group }) => wrapArray(group)
        },
        related: {
          type: '[String]',
          resolve: ({ related }) => wrapArray(related)
        },
        notes: {
          type: '[String]',
          resolve: ({ notes }) => wrapArray(notes, '\n')
        },
        contrib: {
          type: '[String]',
          resolve: ({ contrib }) => wrapArray(contrib, /,\s+/g)
        }
      }
    }),
    schema.buildObjectType({
      name: 'MarkdownRemarkFrontmatterExamples',
      fields: {
        pre: {
          type: '[String]',
          resolve: ({ pre }) => wrapArray(pre)
        },
        code: {
          type: '[String]',
          resolve: ({ code }) => wrapArray(code)
        }
      }
    }),
    schema.buildObjectType({
      name: 'MarkdownRemarkFrontmatterParametersValues',
      fields: {
        tag: {
          type: 'String',
          resolve: ({ tag }) => (Number.isInteger(tag) ? `${tag}` : tag)
        }
      }
    })
  ];

  createTypes(typeDefs);
};
