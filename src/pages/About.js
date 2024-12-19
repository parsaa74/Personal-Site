import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Section = styled.div`
  position: relative;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TitleDecoration = styled(motion.span)`
  display: inline-block;
  width: 40px;
  height: 2px;
  background: white;
`;

const InteractiveText = styled(motion.span)`
  display: inline-block;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
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

const SkillCategory = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const CategoryHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ExpandButton = styled(motion.button)`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SkillGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const ProgressBar = styled(motion.div)`
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: white;
  transform-origin: left;
`;

const Bio = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.8;
  position: relative;
`;

const BioHighlight = styled(motion.span)`
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: white;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const FloatingCard = styled(motion.div)`
  position: fixed;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  pointer-events: none;
  z-index: 1000;
`;

const About = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredHighlight, setHoveredHighlight] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const skills = {
    design: [
      { name: 'UI/UX Design', level: 90, description: 'Creating intuitive and engaging user interfaces' },
      { name: 'Motion Design', level: 85, description: 'Crafting smooth animations and transitions' },
      { name: 'Visual Design', level: 88, description: 'Developing cohesive visual systems' },
    ],
    technical: [
      { name: 'React', level: 92, description: 'Building interactive web applications' },
      { name: 'Three.js', level: 80, description: '3D graphics and animations' },
      { name: 'JavaScript', level: 90, description: 'Frontend development and interactivity' },
    ],
    performance: [
      { name: 'Live Art', level: 85, description: 'Creating immersive experiences' },
      { name: 'Digital Performance', level: 88, description: 'Merging technology with performance' },
      { name: 'Interactive Installation', level: 82, description: 'Building responsive art pieces' },
    ],
  };

  const bioHighlights = [
    { text: 'multidisciplinary creative', detail: 'Combining design, code, and performance art' },
    { text: 'immersive experiences', detail: 'Creating engaging digital and physical installations' },
    { text: 'bridging technology and art', detail: 'Using code as a creative medium' },
  ];

  return (
    <AboutContainer>
      <ContentGrid>
        <Section>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TitleDecoration
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            About Me
          </Title>
          
          <Bio
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm a{' '}
            {bioHighlights.map((highlight, index) => (
              <React.Fragment key={index}>
                <BioHighlight
                  onMouseEnter={() => setHoveredHighlight(highlight)}
                  onMouseLeave={() => setHoveredHighlight(null)}
                >
                  {highlight.text}
                </BioHighlight>
                {index < bioHighlights.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </Bio>

          {Object.entries(skills).map(([category, skillList], index) => (
            <SkillCategory
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <CategoryHeader>
                <h3 style={{ textTransform: 'uppercase' }}>{category}</h3>
                <ExpandButton
                  onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {expandedCategory === category ? '-' : '+'}
                </ExpandButton>
              </CategoryHeader>

              <AnimatePresence>
                {(expandedCategory === category || expandedCategory === null) && (
                  <SkillGrid
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skillList.map((skill) => (
                      <SkillItem
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSkill(skill)}
                      >
                        <h4>{skill.name}</h4>
                        <ProgressBar>
                          <ProgressFill
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: skill.level / 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </ProgressBar>
                      </SkillItem>
                    ))}
                  </SkillGrid>
                )}
              </AnimatePresence>
            </SkillCategory>
          ))}
        </Section>

        <AnimatePresence>
          {hoveredHighlight && (
            <FloatingCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                left: mousePosition.x + 20,
                top: mousePosition.y + 20,
              }}
            >
              {hoveredHighlight.detail}
            </FloatingCard>
          )}
        </AnimatePresence>
      </ContentGrid>
    </AboutContainer>
  );
};

export default About; 