import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const Nav = styled.nav`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  z-index: 900;
  padding: 6rem 2rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <>
      <Nav>
        <NavList>
          <NavItem><NavLink to="/">Home</NavLink></NavItem>
          <NavItem><NavLink to="/projects">Projects</NavLink></NavItem>
          <NavItem><NavLink to="/about">About</NavLink></NavItem>
          <NavItem><NavLink to="/contact">Contact</NavLink></NavItem>
        </NavList>
      </Nav>

      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      
      <AnimatePresence>
        {isOpen && (
          <MobileNav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <NavList>
              <NavItem>
                <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
              </NavItem>
            </NavList>
          </MobileNav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 