import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FilterContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.active ? 'white' : 'rgba(255,255,255,0.3)'};
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? 'black' : 'white'};
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }
`;

const filterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  }),
  exit: { opacity: 0, y: -20 }
};

const FilterAnimation = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <FilterContainer>
      <AnimatePresence mode="wait">
        {categories.map((category, i) => (
          <FilterButton
            key={category.id}
            active={activeFilter === category.id}
            onClick={() => onFilterChange(category.id)}
            as={motion.button}
            custom={i}
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </FilterButton>
        ))}
      </AnimatePresence>
    </FilterContainer>
  );
};

export default FilterAnimation; 