import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  min-width: 8rem;
  background-color: #2a2a2a;
  border-radius: 0.5rem;
  padding: 0.5rem;
  z-index: 50;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: white;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownContainer>
      {React.Children.map(children, (child) => {
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
          });
        }
        if (child.type === DropdownMenuContent) {
          return isOpen ? React.cloneElement(child) : null;
        }
        return child;
      })}
    </DropdownContainer>
  );
};

export const DropdownMenuTrigger = ({ children, ...props }) => {
  return React.cloneElement(children, props);
};

export const DropdownMenuContent = ({ children }) => {
  return (
    <AnimatePresence>
      <DropdownContent
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </DropdownContent>
    </AnimatePresence>
  );
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return <MenuItem onClick={onClick}>{children}</MenuItem>;
}; 