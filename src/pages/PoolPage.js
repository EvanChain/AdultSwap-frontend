import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PlusIcon, InformationCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const PoolPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const PoolHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const PoolTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--secondary), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PoolDescription = styled.p`
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const AdultTagline = styled.p`
  color: var(--primary);
  font-style: italic;
  font-weight: 500;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;

const PoolCard = styled.div`
  background-color: var(--bg-light);
  border-radius: 24px;
  padding: 1.5rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const PoolCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const PoolCardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
`;

const CreatePoolButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  transition: background-color 0.2s;
  text-decoration: none;
  
  &:hover {
    background-color: var(--primary-hover);
  }
`;

const EmptyPoolMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-tertiary);
`;

const PoolList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PoolItem = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PoolItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PoolItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const PoolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TokenPair = styled.div`
  position: relative;
  width: 48px;
  height: 24px;
`;

const TokenLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color || '#ff007a'};
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 10px;
  
  &:first-child {
    left: 0;
    z-index: 2;
  }
  
  &:last-child {
    right: 0;
  }
`;

const PoolDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PoolName = styled.span`
  font-weight: 500;
  color: var(--text-primary);
`;

const PoolStats = styled.span`
  font-size: 0.875rem;
  color: var(--text-tertiary);
`;

const PoolValue = styled.div`
  text-align: right;
`;

const PoolValueAmount = styled.div`
  font-weight: 500;
  color: var(--text-primary);
`;

const PoolValueChange = styled.div`
  font-size: 0.875rem;
  color: ${props => props.isPositive ? '#4caf50' : '#f44336'};
`;

const YieldInfo = styled.div`
  background-color: rgba(33, 114, 229, 0.1);
  border-radius: 12px;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const YieldIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.protocol === 'aave' ? '#B6509E' : '#8C77DF'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 10px;
`;

const YieldProtocol = styled.span`
  font-weight: 600;
  color: ${props => props.protocol === 'aave' ? '#B6509E' : '#8C77DF'};
`;

const YieldRate = styled.span`
  margin-left: auto;
  font-weight: 600;
  color: var(--text-primary);
`;

const PoolTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PoolTab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-tertiary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 0.5rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    opacity: ${props => props.active ? '1' : '0'};
  }
  
  &:hover {
    color: var(--text-primary);
  }
`;

const InfoTooltip = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  
  &:hover .tooltip-content {
    display: block;
  }
`;

const TooltipContent = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--bg-dark);
  color: var(--text-secondary);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: var(--bg-dark) transparent transparent transparent;
  }
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${props => props.variant === 'remove' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
  color: ${props => props.variant === 'remove' ? '#f44336' : '#4caf50'};
  border: none;
  border-radius: 12px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.variant === 'remove' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(76, 175, 80, 0.2)'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// Mock pool data
const pools = [
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

const PoolPage = () => {
  const [activeTab, setActiveTab] = useState('your');
  
  return (
    <PoolPageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PoolHeader>
          <PoolTitle>Dive Into Our Liquidity Pools</PoolTitle>
          <PoolDescription>
            Provide liquidity to earn fees and rewards. Add your tokens to a pool and receive LP tokens representing your position.
          </PoolDescription>
          <AdultTagline>Only children do multiple-choice questions, I want them all!</AdultTagline>
        </PoolHeader>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <PoolCard>
          <PoolCardHeader>
            <PoolCardTitle>Liquidity Positions</PoolCardTitle>
            <CreatePoolButton to="/add-position">
              <PlusIcon width={16} height={16} />
              New Position
            </CreatePoolButton>
          </PoolCardHeader>
          
          <PoolTabs>
            <PoolTab 
              active={activeTab === 'your'} 
              onClick={() => setActiveTab('your')}
            >
              Your Positions
            </PoolTab>
            <PoolTab 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
            >
              All Pools
            </PoolTab>
          </PoolTabs>
          
          {pools.length > 0 ? (
            <PoolList>
              {pools.map(pool => (
                <PoolItem key={pool.id}>
                  <PoolItemHeader>
                    <PoolInfo>
                      <TokenPair>
                        <TokenLogo color={pool.token0.color}>{pool.token0.symbol.charAt(0)}</TokenLogo>
                        <TokenLogo color={pool.token1.color}>{pool.token1.symbol.charAt(0)}</TokenLogo>
                      </TokenPair>
                      <PoolDetails>
                        <PoolName>{pool.name}</PoolName>
                        <PoolStats>{pool.fee} Fee</PoolStats>
                      </PoolDetails>
                    </PoolInfo>
                    <PoolValue>
                      <PoolValueAmount>{pool.value}</PoolValueAmount>
                      <PoolValueChange isPositive={pool.isPositive}>{pool.change}</PoolValueChange>
                    </PoolValue>
                  </PoolItemHeader>
                  
                  <YieldInfo>
                    <YieldIcon protocol={pool.yieldInfo.protocol}>
                      {pool.yieldInfo.protocol === 'aave' ? 'A' : 'M'}
                    </YieldIcon>
                    <span>
                      <YieldProtocol protocol={pool.yieldInfo.protocol}>
                        {pool.yieldInfo.protocol === 'aave' ? 'AAVE' : 'Morpho'}
                      </YieldProtocol>
                      {' '}{pool.yieldInfo.percentage} of funds earning yield
                    </span>
                    <YieldRate>+{pool.yieldInfo.apy} APY</YieldRate>
                    <InfoTooltip>
                      <InformationCircleIcon width={16} height={16} />
                      <TooltipContent className="tooltip-content">
                        AdultSwap automatically allocates idle liquidity to lending protocols to generate additional yield for liquidity providers.
                      </TooltipContent>
                    </InfoTooltip>
                  </YieldInfo>
                  
                  <PoolItemActions>
                    <ActionButton to={`/add-position?id=${pool.id}`} variant="add">
                      <PlusIcon />
                      Add Liquidity
                    </ActionButton>
                    <ActionButton to={`/remove-position?id=${pool.id}`} variant="remove">
                      <MinusCircleIcon />
                      Remove
                    </ActionButton>
                  </PoolItemActions>
                </PoolItem>
              ))}
            </PoolList>
          ) : (
            <EmptyPoolMessage>
              <p>You don't have any active liquidity positions.</p>
              <p>Add liquidity to start earning fees.</p>
            </EmptyPoolMessage>
          )}
        </PoolCard>
      </motion.div>
    </PoolPageContainer>
  );
};

export default PoolPage;
