import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const NavItem = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.9);
  pointer-events: auto;
  cursor: pointer;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  font-family: 'Moderat';
  font-size: 1.2rem;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: ${props => props.isActive ? 1 : 0.6};
  transform: scale(${props => props.isActive ? 1.1 : 1});

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const sections = [
  { id: 'work', label: 'WORK', position: { top: '15%', right: '10%' } },
  { id: 'about', label: 'ABOUT', position: { bottom: '15%', left: '10%' } },
  { id: 'experiments', label: 'EXPERIMENTS', position: { bottom: '15%', right: '10%' } },
  { id: 'contact', label: 'CONTACT', position: { top: '50%', right: '10%' } }
];

const CreativeNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <NavContainer>
      {sections.map((section) => (
        <NavItem
          key={section.id}
          onClick={() => {
            if (section.id === 'experiments') {
              // Navigate to home and trigger experiments section (custom handling needed)
              navigate('/');
              // Optionally, trigger a custom event or callback here
            } else {
              navigate(`/${section.id}`);
            }
          }}
          onMouseEnter={() => setHoveredItem(section.id)}
          onMouseLeave={() => setHoveredItem(null)}
          style={section.position}
          isActive={location.pathname === `/${section.id}` || hoveredItem === section.id}
        >
          {section.label}
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default CreativeNavigation; 