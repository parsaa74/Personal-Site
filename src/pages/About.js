import React from 'react';
import styled from 'styled-components';
import { StaggerAnimation, SlideIn } from '../components/AnimatedElements';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`;

const ContentSection = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const About = () => {
  return (
    <AboutContainer>
      <StaggerAnimation>
        <Title>About Me</Title>
        <ContentSection>
          <Text>
            I'm a creative developer passionate about building immersive digital experiences.
          </Text>
          <Text>
            With expertise in modern web technologies and a keen eye for design,
            I create engaging and performant applications.
          </Text>
          <Text>
            Let's work together to bring your ideas to life.
          </Text>
        </ContentSection>
      </StaggerAnimation>
    </AboutContainer>
  );
};

export default About; 