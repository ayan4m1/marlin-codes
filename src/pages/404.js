import { Grid, Typography } from '@mui/material';

import Layout from '~components/layout';

export default function NotFoundPage() {
  return (
    <Layout seoProps={{ title: 'Not Found' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2">Not Found</Typography>
          <Typography paragraph>Sorry, this URL is not valid.</Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
