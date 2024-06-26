import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';


const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
