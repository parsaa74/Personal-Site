import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: 'Moderat';
`;

const DropdownContent = styled(motion.div)`