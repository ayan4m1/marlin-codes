import { Grid, Typography } from '@mui/material';

import Layout from '~components/layout';

export default function IndexPage() {
  return (
    <Layout seoProps={{ title: 'Home' }}>
      <Grid container item xs={12}>
        <Typography variant="h4">Enter a G-code</Typography>
        <Typography variant="h3">Or</Typography>
        <Typography variant="h4">Enter a description</Typography>
      </Grid>
    </Layout>
  );
}
