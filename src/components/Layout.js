import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Footer from './Footer';
import { useLocation, Outlet } from 'react-router-dom';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding-top: 80px;
  background: ${props => props.isHome ? 'transparent' : 'rgba(0, 0, 0, 0.3)'};
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <PageWrapper isHome={isHome}>
      <Navigation />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;