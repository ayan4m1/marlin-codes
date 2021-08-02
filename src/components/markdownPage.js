import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import NotFoundPage from '~pages/404';
import Layout from '~components/layout';

export default function MarkdownPage({ data }) {
  if (!data || !data.markdownRemark) {
    return <NotFoundPage />;
  }

  const {
    markdownRemark: {
      html,
      frontmatter: { title, brief }
    }
  } = data;

  return (
    <Layout seoProps={{ title, description: brief }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

MarkdownPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.arrayOf(PropTypes.object)
  })
};

export const pageQuery = graphql`
  query ($tag: String!) {
    markdownRemark(frontmatter: { tag: { eq: $tag } }) {
      html
      frontmatter {
        brief
        title
      }
    }
  }
`;
