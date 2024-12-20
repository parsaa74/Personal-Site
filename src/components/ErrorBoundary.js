import React, { Component } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  background: #1a1a1a;
  color: white;
`;

const ErrorTitle = styled(motion.h1)`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.7;
`;

const RetryButton = styled(motion.button)`
  padding: 1rem 2rem;
  border: 2px solid white;
  background: transparent;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`;

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Oops! Something went wrong
          </ErrorTitle>
          <ErrorMessage
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          <RetryButton
            onClick={this.handleRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 