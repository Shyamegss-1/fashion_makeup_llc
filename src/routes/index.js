import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import configureRoutes from './routes';
import PrivateLayout from './private-layout';
import PublicLayout from './public-layout';
import ScrollToTop from './toScrollTop';
import BorderExample from '../layout/loader';
import CurrencyContext from '../context/currencyContext';

const MainRoutes = () => {
  const routes = configureRoutes();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<BorderExample />}>
          <CurrencyContext>
            <Routes>
              {routes.map((route) => {
                if (route.type === 'private') {
                  return <Route key={route.path} path={route.path} element={<PrivateLayout {...route} />} />;
                }
                if (route.type === 'public') {
                  return <Route key={route.path} path={route.path} element={<PublicLayout {...route} />} />;
                }
              })}
            </Routes>
          </CurrencyContext>
        </Suspense>
        <ScrollToTop />
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
