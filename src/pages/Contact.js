import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
`;

const ContactForm = styled(motion.form)`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 1px solid white;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background: white;
  color: black;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactContainer>
      <ContactForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Message</Label>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </Button>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact; 