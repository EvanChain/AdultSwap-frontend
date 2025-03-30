import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowDownIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const SwapContainer = styled.div`
  background-color: var(--bg-light);
  border-radius: 24px;
  padding: 1rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const SwapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SwapTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  color: var(--text-tertiary);
  transition: color 0.2s;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const TokenInput = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.5rem;
`;

const TokenInputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const TokenLabel = styled.span`
  color: var(--text-tertiary);
  font-size: 0.875rem;
`;

const TokenBalance = styled.span`
  color: var(--text-tertiary);
  font-size: 0.875rem;
`;

const TokenInputContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TokenAmount = styled.input`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 500;
  outline: none;
  width: 100%;
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const TokenSelector = styled.button`
  display: flex;
  align-items: center;
  background-color: var(--bg-dark);
  border: none;
  border-radius: 16px;
  padding: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
  gap: 0.5rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TokenLogo = styled.div`
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

const SwitchButton = styled.button`
  background-color: var(--bg-lighter);
  border: 4px solid var(--bg-light);
  border-radius: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  margin: -8px auto;
  z-index: 2;
  position: relative;
  transition: transform 0.2s;
  
  &:hover {
    transform: rotate(180deg);
    color: var(--text-primary);
  }
`;

const SwapButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
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

const SwapInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  background-color: var(--bg-lighter);
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const SwapInfoLabel = styled.span`
  color: var(--text-tertiary);
`;

const SwapInfoValue = styled.span`
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '1.2', color: '#627EEA' },
  { symbol: 'USDC', name: 'USD Coin', balance: '2500.00', color: '#2775CA' },
  { symbol: 'USDT', name: 'Tether', balance: '1000.00', color: '#26A17B' },
  { symbol: 'DAI', name: 'Dai', balance: '500.00', color: '#F5AC37' },
  { symbol: 'UNI', name: 'Uniswap', balance: '150.00', color: '#FF007A' },
];

const SwapCard = () => {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  
  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    // Mock price calculation (in a real app, this would come from an API or smart contract)
    if (value && !isNaN(value)) {
      const mockRate = 1800; // 1 ETH = 1800 USDC
      setToAmount((parseFloat(value) * mockRate).toFixed(2));
    } else {
      setToAmount('');
    }
  };
  
  const handleToAmountChange = (e) => {
    const value = e.target.value;
    setToAmount(value);
    // Reverse calculation
    if (value && !isNaN(value)) {
      const mockRate = 1800;
      setFromAmount((parseFloat(value) / mockRate).toFixed(6));
    } else {
      setFromAmount('');
    }
  };
  
  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };
  
  const isSwapDisabled = !fromAmount || !toAmount || fromAmount <= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SwapContainer>
        <SwapHeader>
          <SwapTitle>Swap</SwapTitle>
          <SettingsButton>
            <Cog6ToothIcon width={20} height={20} />
          </SettingsButton>
        </SwapHeader>
        
        <TokenInput>
          <TokenInputHeader>
            <TokenLabel>From</TokenLabel>
            <TokenBalance>Balance: {fromToken.balance} {fromToken.symbol}</TokenBalance>
          </TokenInputHeader>
          <TokenInputContent>
            <TokenAmount 
              type="number" 
              placeholder="0.0" 
              value={fromAmount} 
              onChange={handleFromAmountChange}
            />
            <TokenSelector>
              <TokenLogo color={fromToken.color}>{fromToken.symbol.charAt(0)}</TokenLogo>
              {fromToken.symbol}
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TokenSelector>
          </TokenInputContent>
        </TokenInput>
        
        <SwitchButton onClick={switchTokens}>
          <ArrowDownIcon width={16} height={16} />
        </SwitchButton>
        
        <TokenInput>
          <TokenInputHeader>
            <TokenLabel>To</TokenLabel>
            <TokenBalance>Balance: {toToken.balance} {toToken.symbol}</TokenBalance>
          </TokenInputHeader>
          <TokenInputContent>
            <TokenAmount 
              type="number" 
              placeholder="0.0" 
              value={toAmount} 
              onChange={handleToAmountChange}
            />
            <TokenSelector>
              <TokenLogo color={toToken.color}>{toToken.symbol.charAt(0)}</TokenLogo>
              {toToken.symbol}
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TokenSelector>
          </TokenInputContent>
        </TokenInput>
        
        {fromAmount && toAmount && (
          <SwapInfo>
            <SwapInfoLabel>1 {fromToken.symbol} ≈</SwapInfoLabel>
            <SwapInfoValue>
              {(toAmount / fromAmount).toFixed(6)} {toToken.symbol}
            </SwapInfoValue>
          </SwapInfo>
        )}
        
        <SwapButton disabled={isSwapDisabled}>
          {isSwapDisabled ? 'Enter an amount' : 'Swap'}
        </SwapButton>
      </SwapContainer>
    </motion.div>
  );
};

export default SwapCard;
