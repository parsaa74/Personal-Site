import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Moderat';

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: none;
    ring: 2px solid rgba(255, 255, 255, 0.2);
  }
`;

export const Button = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button'; 