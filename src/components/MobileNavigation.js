import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, User, Briefcase, Mail, Beaker } from 'lucide-react';

const MobileNavContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
`;

const NavToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  
  @media (max-width: 480px) {
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(0, 0, 0, 0.9);
  }
`;

const MobileNavOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const NavItem = styled(motion.div)`
  margin: 1rem 0;
  width: 100%;
  max-width: 300px;
`;

const NavButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-family: 'Moderat';
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    transform: scale(0.98);
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  
  @media (max-width: 480px) {
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/work', label: 'Work', icon: Briefcase },
    { path: '/experiments', label: 'Experiments', icon: Beaker },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <MobileNavContainer>
      <NavToggle onClick={toggleNav}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </NavToggle>

      <AnimatePresence>
        {isOpen && (
          <MobileNavOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={toggleNav}>
              <X size={24} />
            </CloseButton>

            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavItem
                  key={item.path}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <NavButton
                    onClick={() => handleNavigation(item.path)}
                    className={isActive ? 'active' : ''}
                  >
                    <IconComponent size={20} />
                    {item.label}
                  </NavButton>
                </NavItem>
              );
            })}
          </MobileNavOverlay>
        )}
      </AnimatePresence>
    </MobileNavContainer>
  );
};

export default MobileNavigation; 