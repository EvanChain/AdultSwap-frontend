import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import RemovePositionForm from '../components/pool/RemovePositionForm';
import { motion } from 'framer-motion';

const RemovePositionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Mock position data with yield information
const mockPositions = [
  {
    id: 1,
    token0: { symbol: 'ETH', color: '#627EEA', balance: '0.5432' },
    token1: { symbol: 'USDC', color: '#2775CA', balance: '978.45' },
    name: 'ETH / USDC',
    fee: '0.3%',
    value: '$2,450.75',
    change: '+2.4%',
    isPositive: true,
    yieldInfo: {
      protocol: 'aave',
      percentage: '75%',
      apy: '3.2%',
      timeDeployed: '32 days',
      totalEarned: '42.18'
    }
  },
  {
    id: 2,
    token0: { symbol: 'ETH', color: '#627EEA', balance: '0.2765' },
    token1: { symbol: 'DAI', color: '#F5AC37', balance: '492.30' },
    name: 'ETH / DAI',
    fee: '0.3%',
    value: '$1,230.50',
    change: '-0.8%',
    isPositive: false,
    yieldInfo: {
      protocol: 'morpho',
      percentage: '82%',
      apy: '4.1%',
      timeDeployed: '21 days',
      totalEarned: '28.75'
    }
  },
  {
    id: 3,
    token0: { symbol: 'UNI', color: '#FF007A', balance: '125.75' },
    token1: { symbol: 'ETH', color: '#627EEA', balance: '0.1245' },
    name: 'UNI / ETH',
    fee: '0.3%',
    value: '$580.25',
    change: '+1.2%',
    isPositive: true,
    yieldInfo: {
      protocol: 'aave',
      percentage: '68%',
      apy: '2.8%',
      timeDeployed: '14 days',
      totalEarned: '12.35'
    }
  }
];

const RemovePositionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const positionId = new URLSearchParams(location.search).get('id');
  
  // Find the position by ID
  const position = mockPositions.find(p => p.id === parseInt(positionId)) || mockPositions[0];
  
  const handleBack = () => {
    navigate('/pool');
  };
  
  return (
    <RemovePositionPageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RemovePositionForm onBack={handleBack} position={position} />
      </motion.div>
    </RemovePositionPageContainer>
  );
};

export default RemovePositionPage;
