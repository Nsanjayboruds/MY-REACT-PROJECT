import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function Layout() {
  const location = useLocation();
  const hideFooterOn = ['/viewproject']; // pages where footer should be hidden

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      {/* Conditionally render Footer */}
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </>
  );
}
