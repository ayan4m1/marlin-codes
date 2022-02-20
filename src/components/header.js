import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import { useStaticQuery, graphql, Link as NavLink } from 'gatsby';
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
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Link color="inherit" component={NavLink} to="/">
          <Typography variant="h6">
            {data?.site?.siteMetadata?.title}
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};
