import { Link } from 'gatsby';
import { Grid, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <h5>Resources</h5>
        <ul>
          <li>
            <Link to="/">Search</Link>
          </li>
        </ul>
      </Grid>
      <Grid item xs={6}>
        <h5>About</h5>
        <ul>
          <li>
            <Link to="/about" className="text-muted">
              About the site
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/ayan4m1/marlin-codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Typography paragraph>
          Data taken from{' '}
          <a
            href="https://github.com/MarlinFirmware/MarlinDocumentation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marlin Documentation
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
}
