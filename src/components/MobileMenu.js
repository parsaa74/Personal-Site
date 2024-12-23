import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const MenuButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuItem = styled(motion.div)`
  margin: 1rem 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  
  &:hover {
    color: #ccc;
  }
`;

const MobileMenu = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <MenuButton onClick={toggleMenu}>
        {isOpen ? '×' : '☰'}
      </MenuButton>
      <AnimatePresence>
        {isOpen && (
          <MenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MenuItem
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StyledLink to="/" onClick={toggleMenu}>Home</StyledLink>
            </MenuItem>
            <MenuItem
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StyledLink to="/about" onClick={toggleMenu}>About</StyledLink>
            </MenuItem>
            <MenuItem
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StyledLink to="/projects" onClick={toggleMenu}>Projects</StyledLink>
            </MenuItem>
            <MenuItem
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StyledLink to="/contact" onClick={toggleMenu}>Contact</StyledLink>
            </MenuItem>
          </MenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu; 