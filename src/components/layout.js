import { Fragment } from 'react';
import PropTypes from 'prop-types';

import Footer from '~components/footer';
import Header from '~components/header';
import SEO from '~components/seo';

export default function Layout({ children, seoProps = {} }) {
  return (
    <Fragment>
      <SEO {...seoProps} />
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seoProps: PropTypes.object
};
