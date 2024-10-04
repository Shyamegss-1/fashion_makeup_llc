import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const PublicRoute = ({ ...rest }) => {
  return (
    <>
      <Header />
      {rest.element}
      <Footer />
    </>
  );
};
export default PublicRoute;
