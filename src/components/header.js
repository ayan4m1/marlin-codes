import { AppBar, Toolbar, Typography } from '@mui/material';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{data?.site?.siteMetadata?.title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};
