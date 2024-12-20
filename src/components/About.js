import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Remove unused imports and styled components

const About = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    // Add your skill selection logic here
  };
  
  return (
    // ... your JSX ...
  );
};

export default About; 