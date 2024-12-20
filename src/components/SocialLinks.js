import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SocialContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
`;

const SocialLink = styled(motion.a)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const socialLinks = [
  { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: '𝕏' },
  { name: 'Mastodon', url: 'https://mastodon.social/@yourusername', icon: '𝕄' },
  { name: 'BlueSky', url: 'https://bsky.app/profile/yourusername', icon: '☁️' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '💼' },
  { name: 'Dribbble', url: 'https://dribbble.com/yourusername', icon: '🏀' },
  { name: 'Email', url: 'mailto:your@email.com', icon: '✉️' },
];

const SocialLinks = () => {
  return (
    <SocialContainer>
      {socialLinks.map((link, index) => (
        <SocialLink
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {link.icon}
        </SocialLink>
      ))}
    </SocialContainer>
  );
};

export default SocialLinks; 