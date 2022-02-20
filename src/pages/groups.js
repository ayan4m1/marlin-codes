import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import Layout from '~components/layout';

export default function GroupsPage({ data }) {
  const {
    allMarkdownRemark: { nodes }
  } = data;

  const groups = useMemo(() => {
    const result = new Set();

    for (const node of nodes) {
      if (Array.isArray(node.frontmatter.group)) {
        for (const group of node.frontmatter.group) {
          result.add(group);
        }
      }
    }

    return Array.from(result);
  }, [nodes]);

  return (
    <Layout seoProps={{ title: 'Codes' }}>
      <Grid container>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel id="group-label">Group</InputLabel>
            <Select labelId="group-label" id="group" value={null} label="Group">
              {groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Layout>
  );
}

GroupsPage.propTypes = {
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
          group
        }
      }
    }
  }
`;
