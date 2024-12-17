import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Button = styled(motion.button)`
  display: none;
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Line = styled(motion.span)`
  display: block;
  width: 100%;
  height: 2px;
  background: white;
  margin: 6px 0;
  transform-origin: center;
`;

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <Button onClick={toggleMenu}>
      <Line
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <Line
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <Line
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </Button>
  );
};

export default HamburgerMenu; 