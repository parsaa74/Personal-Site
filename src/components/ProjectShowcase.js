import React, { useState } from 'react';
import styled from 'styled-components';

const ShowcaseContainer = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  padding: 2rem;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const projects = [
  {
    title: "Interactive Experiences",
    description: "Web-based artistic experiments",
    link: "#experiments"
  },
  // Add more projects
]; 