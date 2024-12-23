import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Globe, Dribbble, Mail } from 'lucide-react';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  color: white;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const EmailLink = styled(SocialLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <EmailLink 
          href="mailto:parsaazari28@proton.me"
          whileHover={{ scale: 1.1 }}
        >
          <Mail size={20} />
          <span>parsaazari28@proton.me</span>
        </EmailLink>
        <SocialLinks>
          <SocialLink 
            href="https://github.com/parsaa74"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <Github size={20} />
          </SocialLink>
          <SocialLink 
            href="https://x.com/sighpaaa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <Twitter size={20} />
          </SocialLink>
          <SocialLink 
            href="https://www.linkedin.com/in/parsaazari/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <Linkedin size={20} />
          </SocialLink>
          <SocialLink 
            href="https://dribbble.com/parsaa74"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <Dribbble size={20} />
          </SocialLink>
          <SocialLink 
            href="https://bsky.app/profile/sighpaa.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <Globe size={20} />
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 