import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { Fragment } from 'react';
import PropTypes from 'prop-types';

import Footer from '~components/footer';
import Header from '~components/header';
import SEO from '~components/seo';

const theme = createMuiTheme();

export default function Layout({ children, seoProps = {} }) {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SEO {...seoProps} />
        <Header />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seoProps: PropTypes.object
};
