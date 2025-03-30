import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const FormContainer = styled.div`
  background-color: var(--bg-light);
  border-radius: 24px;
  padding: 1.5rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const FormTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
`;

const PositionInfo = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const PositionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
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

const PositionName = styled.div`
  font-weight: 500;
  color: var(--text-primary);
  font-size: 1.1rem;
`;

const PositionDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: var(--text-tertiary);
`;

const DetailValue = styled.span`
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
`;

const YieldSection = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const YieldCard = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const YieldHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  width: 100%;
`;

const YieldProtocol = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProtocolLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.protocol === 'aave' ? '#B6509E' : '#8C77DF'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 12px;
`;

const ProtocolName = styled.span`
  font-weight: 500;
  color: ${props => props.protocol === 'aave' ? '#B6509E' : '#8C77DF'};
`;

const YieldAmount = styled.div`
  font-weight: 600;
  color: var(--text-primary);
`;

const YieldDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
`;

const YieldDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const YieldLabel = styled.span`
  font-size: 0.75rem;
  color: var(--text-tertiary);
`;

const YieldValue = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const RemoveOptions = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const PercentageButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const PercentButton = styled.button`
  background-color: ${props => props.selected ? 'var(--primary)' : 'var(--bg-lighter)'};
  color: ${props => props.selected ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 12px;
  padding: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const SliderContainer = styled.div`
  padding: 0 0.5rem;
  width: 100%;
`;

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--bg-dark);
  outline: none;
  margin: 1rem 0;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
  }
`;

const TokenAmounts = styled.div`
  margin-top: 1.5rem;
  width: 100%;
`;

const TokenAmount = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SingleTokenLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color || '#ff007a'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 12px;
`;

const TokenSymbol = styled.span`
  font-weight: 500;
  color: var(--text-primary);
`;

const TokenValue = styled.span`
  font-weight: 500;
  color: var(--text-primary);
`;

const RemoveButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem;
  font-weight: 600;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--primary-hover);
  }
  
  &:disabled {
    background-color: var(--bg-lighter);
    color: var(--text-tertiary);
    cursor: not-allowed;
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

const RemovePositionForm = ({ onBack, position }) => {
  const [removePercentage, setRemovePercentage] = useState(100);
  
  // Calculate token amounts based on percentage
  const token0Amount = (parseFloat(position.token0.balance) * removePercentage / 100).toFixed(6);
  const token1Amount = (parseFloat(position.token1.balance) * removePercentage / 100).toFixed(2);
  
  // Calculate yield amounts based on percentage
  const yieldAmount = (parseFloat(position.yieldInfo.totalEarned) * removePercentage / 100).toFixed(2);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormContainer>
        <FormHeader>
          <BackButton onClick={onBack}>
            <ArrowLeftIcon width={16} height={16} />
            Back
          </BackButton>
          <FormTitle>Remove Liquidity</FormTitle>
          <div style={{ width: '20px' }}></div> {/* Spacer for alignment */}
        </FormHeader>
        
        <PositionInfo>
          <PositionHeader>
            <TokenPair>
              <TokenLogo color={position.token0.color}>{position.token0.symbol.charAt(0)}</TokenLogo>
              <TokenLogo color={position.token1.color}>{position.token1.symbol.charAt(0)}</TokenLogo>
            </TokenPair>
            <PositionName>{position.name}</PositionName>
          </PositionHeader>
          
          <PositionDetails>
            <DetailItem>
              <DetailLabel>Liquidity Value</DetailLabel>
              <DetailValue>{position.value}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Fee Tier</DetailLabel>
              <DetailValue>{position.fee}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{position.token0.symbol} Amount</DetailLabel>
              <DetailValue>{position.token0.balance}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{position.token1.symbol} Amount</DetailLabel>
              <DetailValue>{position.token1.balance}</DetailValue>
            </DetailItem>
          </PositionDetails>
        </PositionInfo>
        
        <YieldSection>
          <SectionTitle>
            Yield Earnings
            <InfoTooltip>
              <InformationCircleIcon width={16} height={16} />
              <TooltipContent className="tooltip-content">
                AdultSwap automatically allocates idle liquidity to lending protocols to generate additional yield for liquidity providers.
              </TooltipContent>
            </InfoTooltip>
          </SectionTitle>
          
          <YieldCard>
            <YieldHeader>
              <YieldProtocol>
                <ProtocolLogo protocol={position.yieldInfo.protocol}>
                  {position.yieldInfo.protocol === 'aave' ? 'A' : 'M'}
                </ProtocolLogo>
                <ProtocolName protocol={position.yieldInfo.protocol}>
                  {position.yieldInfo.protocol === 'aave' ? 'AAVE' : 'Morpho'}
                </ProtocolName>
              </YieldProtocol>
              <YieldAmount>+${position.yieldInfo.totalEarned}</YieldAmount>
            </YieldHeader>
            
            <YieldDetails>
              <YieldDetail>
                <YieldLabel>Allocation</YieldLabel>
                <YieldValue>{position.yieldInfo.percentage} of funds</YieldValue>
              </YieldDetail>
              <YieldDetail>
                <YieldLabel>Current APY</YieldLabel>
                <YieldValue>{position.yieldInfo.apy}</YieldValue>
              </YieldDetail>
              <YieldDetail>
                <YieldLabel>Time Deployed</YieldLabel>
                <YieldValue>{position.yieldInfo.timeDeployed}</YieldValue>
              </YieldDetail>
              <YieldDetail>
                <YieldLabel>Earnings</YieldLabel>
                <YieldValue style={{ color: '#4caf50' }}>+${position.yieldInfo.totalEarned}</YieldValue>
              </YieldDetail>
            </YieldDetails>
          </YieldCard>
        </YieldSection>
        
        <RemoveOptions>
          <SectionTitle>Amount to Remove</SectionTitle>
          
          <PercentageButtons>
            <PercentButton 
              selected={removePercentage === 25} 
              onClick={() => setRemovePercentage(25)}
            >
              25%
            </PercentButton>
            <PercentButton 
              selected={removePercentage === 50} 
              onClick={() => setRemovePercentage(50)}
            >
              50%
            </PercentButton>
            <PercentButton 
              selected={removePercentage === 75} 
              onClick={() => setRemovePercentage(75)}
            >
              75%
            </PercentButton>
            <PercentButton 
              selected={removePercentage === 100} 
              onClick={() => setRemovePercentage(100)}
            >
              100%
            </PercentButton>
          </PercentageButtons>
          
          <SliderContainer>
            <Slider 
              type="range" 
              min="1" 
              max="100" 
              value={removePercentage} 
              onChange={(e) => setRemovePercentage(parseInt(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>0%</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: '500' }}>{removePercentage}%</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>100%</span>
            </div>
          </SliderContainer>
        </RemoveOptions>
        
        <TokenAmounts>
          <SectionTitle>You Will Receive</SectionTitle>
          
          <TokenAmount>
            <TokenInfo>
              <SingleTokenLogo color={position.token0.color}>
                {position.token0.symbol.charAt(0)}
              </SingleTokenLogo>
              <TokenSymbol>{position.token0.symbol}</TokenSymbol>
            </TokenInfo>
            <TokenValue>{token0Amount}</TokenValue>
          </TokenAmount>
          
          <TokenAmount>
            <TokenInfo>
              <SingleTokenLogo color={position.token1.color}>
                {position.token1.symbol.charAt(0)}
              </SingleTokenLogo>
              <TokenSymbol>{position.token1.symbol}</TokenSymbol>
            </TokenInfo>
            <TokenValue>{token1Amount}</TokenValue>
          </TokenAmount>
          
          <TokenAmount>
            <TokenInfo>
              <SingleTokenLogo color={position.yieldInfo.protocol === 'aave' ? '#B6509E' : '#8C77DF'}>
                $
              </SingleTokenLogo>
              <TokenSymbol>Yield Earnings</TokenSymbol>
            </TokenInfo>
            <TokenValue style={{ color: '#4caf50' }}>+${yieldAmount}</TokenValue>
          </TokenAmount>
        </TokenAmounts>
        
        <RemoveButton>
          Remove Liquidity
        </RemoveButton>
      </FormContainer>
    </motion.div>
  );
};

export default RemovePositionForm;
