 import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Footer from './Footer';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding-top: 80px; // Account for fixed navigation
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

const Layout = ({ children, language, onLanguageChange }) => {
  return (
    <PageWrapper>
      <Navigation language={language} onLanguageChange={onLanguageChange} />
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;