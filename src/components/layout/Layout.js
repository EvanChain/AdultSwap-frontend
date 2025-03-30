import React from 'react';
import styled from 'styled-components';
import Navbar from '../nav/Navbar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <Main>
        <div className="container">
          {children}
        </div>
      </Main>
    </LayoutContainer>
  );
};

export default Layout;
