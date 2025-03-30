import React from 'react';
import styled from 'styled-components';
import SwapCard from '../components/swap/SwapCard';
import { motion } from 'framer-motion';

const SwapPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const SwapHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SwapTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SwapDescription = styled.p`
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const AdultTagline = styled.p`
  color: var(--primary);
  font-style: italic;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const SwapPage = () => {
  return (
    <SwapPageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SwapHeader>
          <SwapTitle>Swap with no limits</SwapTitle>
          <SwapDescription>
            Trade tokens instantly with our decentralized exchange platform.
            No registration, no restrictions, just connect your wallet and start trading.
          </SwapDescription>
          <AdultTagline>Only children do multiple-choice questions, I want them all!</AdultTagline>
        </SwapHeader>
      </motion.div>
      
      <SwapCard />
    </SwapPageContainer>
  );
};

export default SwapPage;
