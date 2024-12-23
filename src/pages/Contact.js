import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Globe, 
  Dribbble, 
  Mail 
} from 'lucide-react';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`;

const EmailSection = styled(motion.div)`
  margin: 2rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EmailLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SocialCard = styled(motion.a)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: white;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Contact = () => {
  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:parsaazari28@proton.me',
      icon: <Mail size={24} />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/parsaa74',
      icon: <Github size={24} />,
    },
    {
      name: 'Twitter',
      url: 'https://x.com/sighpaaa',
      icon: <Twitter size={24} />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/parsaazari/',
      icon: <Linkedin size={24} />,
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com/parsaa74',
      icon: <Dribbble size={24} />,
    },
    {
      name: 'BlueSky',
      url: 'https://bsky.app/profile/sighpaa.bsky.social',
      icon: <Globe size={24} />,
    },
    {
      name: 'Mastodon',
      url: 'https://mastodon.social/@parsaaz',
      icon: <Globe size={24} />,
    },
  ];

  return (
    <ContactContainer>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
      >
        Let's Connect
      </motion.h1>
      
      <EmailSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <EmailLink href="mailto:parsaazari28@proton.me">
          <Mail size={24} />
          parsaazari28@proton.me
        </EmailLink>
      </EmailSection>
      
      <SocialGrid>
        {socialLinks.map((link, index) => (
          <SocialCard
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {link.icon}
            <span>{link.name}</span>
          </SocialCard>
        ))}
      </SocialGrid>
    </ContactContainer>
  );
};

export default Contact; 