import { Grid } from '@mui/material';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import Layout from '~components/layout';

export default function CodesPage({ data }) {
  const {
    allMarkdownRemark: { nodes }
  } = data;

  const codes = useMemo(() => {
    const result = nodes.reduce(
      (prev, curr) => [...prev, ...curr.frontmatter.codes],
      []
    );

    result.sort();
    return result;
  }, [nodes]);

  return (
    <Layout seoProps={{ title: 'Codes' }}>
      <Grid container>
        {codes.map((code) => (
          <Grid item xs={3} key={code}>
            <Link to={`/code/${code}`}>{code}</Link>
          </Grid>
        ))}
        {/* {nodes.map((node) => (
          <Grid item xs={12} key={node.id}>
            <Paper>
              <Typography paragraph>{node.frontmatter.title}</Typography>
              <Grid container>
                {node.frontmatter.codes.map((code) => (
                  <Grid item xs={3} key={code}>
                    <Paper variant="outlined">{code}</Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))} */}
      </Grid>
    </Layout>
  );
}

CodesPage.propTypes = {
  data: PropTypes.object
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          codes
          brief
        }
      }
    }
  }
`;
