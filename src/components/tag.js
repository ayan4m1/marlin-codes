import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import NotFoundPage from '~pages/404';
import Layout from '~components/layout';
import { Grid, Paper, Typography } from '@mui/material';

export default function MarkdownPage({ data }) {
  if (!data || !data.markdownRemark) {
    return <NotFoundPage />;
  }

  const {
    markdownRemark: {
      html,
      frontmatter: { title, brief, codes }
    }
  } = data;

  return (
    <Layout seoProps={{ title, description: brief }}>
      <Typography variant="h3">{title}</Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Grid container>
        {Boolean(codes) &&
          codes.map((code) => (
            <Grid item xs={12} key={code}>
              <Paper>{code}</Paper>
            </Grid>
          ))}
      </Grid>
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
        codes
      }
    }
  }
`;
