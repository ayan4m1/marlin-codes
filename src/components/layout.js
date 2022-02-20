import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme
} from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';

import { Fragment } from 'react';
import PropTypes from 'prop-types';

import Footer from '~components/footer';
import Header from '~components/header';
import SEO from '~components/seo';

const theme = createTheme();

export default function Layout({ children, seoProps = {} }) {
  return (
    <Fragment>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SEO {...seoProps} />
          <Header />
          <Container>
            <main>{children}</main>
          </Container>
          <Footer />
        </ThemeProvider>
      </StyledEngineProvider>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seoProps: PropTypes.object
};
