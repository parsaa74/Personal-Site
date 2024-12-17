import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Text = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const SkillsList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const Skill = styled(motion.span)`
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 20px;
`;

const About = () => {
  const skills = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'UI/UX Design'];

  return (
    <AboutContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </Title>
        <Text
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I'm a creative developer passionate about building unique digital experiences. 
          I combine code and design to create engaging interactive websites.
        </Text>
        <SkillsList
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {skills.map((skill, index) => (
            <Skill
              key={skill}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {skill}
            </Skill>
          ))}
        </SkillsList>
      </Content>
    </AboutContainer>
  );
};

export default About; 