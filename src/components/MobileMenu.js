import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MenuItem = styled(motion(Link))`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  margin: 1rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const MenuButton = styled(motion.button)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 12px;

  span {
    width: 100%;
    height: 2px;
    background: white;
    transition: transform 0.3s ease;
  }

  &.active {
    span:first-child {
      transform: translateY(8px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
`;

const MobileMenu = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <MenuButton
        className={isOpen ? 'active' : ''}
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
      >
        <span />
        <span />
        <span />
      </MenuButton>

      <AnimatePresence>
        {isOpen && (
          <MenuOverlay
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.path}
                to={item.path}
                onClick={toggleMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu; 