import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: linear-gradient(
    135deg,
    #1a1a1a 0%,
    #2d2d2d 50%,
    #1a1a1a 100%
  );
  pointer-events: none;
`;

const GradientBackground = () => {
  return <Background />;
};

export default GradientBackground; 