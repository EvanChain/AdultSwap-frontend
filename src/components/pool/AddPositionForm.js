import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowDownIcon, ArrowLeftIcon, InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
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

const FeeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FeeOption = styled.button`
  background-color: ${props => props.selected ? 'var(--primary)' : 'var(--bg-lighter)'};
  color: ${props => props.selected ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 16px;
  padding: 0.75rem 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const FeeValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const FeeDescription = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
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
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  button {
    background: none;
    border: none;
    color: var(--primary);
    padding: 0;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
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

const PlusButton = styled.div`
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
`;

const PriceRangeSection = styled.div`
  margin: 1.5rem 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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

const InfoIcon = styled(InformationCircleIcon)`
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
`;

const AiSuggestButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--secondary-hover);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const RangeSelector = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
`;

const RangeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const RangeOption = styled.button`
  background-color: ${props => props.selected ? 'var(--primary)' : 'var(--bg-dark)'};
  color: ${props => props.selected ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 12px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const RangeInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const RangeInput = styled.div`
  background-color: var(--bg-dark);
  border-radius: 12px;
  padding: 0.75rem;
`;

const RangeInputLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
`;

const RangeInputValue = styled.input`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  outline: none;
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const CurrentPrice = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  
  span {
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const SubmitButton = styled.button`
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

const DepositSummary = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
  margin-top: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const SummaryValue = styled.span`
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
`;

const AiSuggestionModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: var(--bg-light);
  border-radius: 24px;
  padding: 1.5rem;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const SuggestionContent = styled.div`
  margin-bottom: 1.5rem;
`;

const SuggestionText = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const SuggestionCard = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const SuggestionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
`;

const SuggestionDescription = styled.p`
  color: var(--text-tertiary);
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
`;

const SuggestionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const SuggestionRange = styled.span`
  color: var(--text-secondary);
`;

const SuggestionAPR = styled.span`
  color: var(--primary);
  font-weight: 500;
`;

const ApplyButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 0.75rem;
  font-weight: 600;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--primary-hover);
  }
`;

// Mock token data
const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '1.2', color: '#627EEA' },
  { symbol: 'USDC', name: 'USD Coin', balance: '2500.00', color: '#2775CA' },
  { symbol: 'USDT', name: 'Tether', balance: '1000.00', color: '#26A17B' },
  { symbol: 'DAI', name: 'Dai', balance: '500.00', color: '#F5AC37' },
  { symbol: 'UNI', name: 'Uniswap', balance: '150.00', color: '#FF007A' },
];

const AddPositionForm = ({ onBack }) => {
  const [selectedFee, setSelectedFee] = useState(0.3);
  const [token0, setToken0] = useState(tokens[0]);
  const [token1, setToken1] = useState(tokens[1]);
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');
  const [rangeType, setRangeType] = useState('full');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  
  const handleAmount0Change = (e) => {
    const value = e.target.value;
    setAmount0(value);
    // Mock price calculation
    if (value && !isNaN(value)) {
      const mockRate = 1800; // 1 ETH = 1800 USDC
      setAmount1((parseFloat(value) * mockRate).toFixed(2));
    } else {
      setAmount1('');
    }
  };
  
  const handleAmount1Change = (e) => {
    const value = e.target.value;
    setAmount1(value);
    // Reverse calculation
    if (value && !isNaN(value)) {
      const mockRate = 1800;
      setAmount0((parseFloat(value) / mockRate).toFixed(6));
    } else {
      setAmount0('');
    }
  };
  
  const handleMaxAmount0 = () => {
    setAmount0(token0.balance);
    const mockRate = 1800;
    setAmount1((parseFloat(token0.balance) * mockRate).toFixed(2));
  };
  
  const handleMaxAmount1 = () => {
    setAmount1(token1.balance);
    const mockRate = 1800;
    setAmount0((parseFloat(token1.balance) / mockRate).toFixed(6));
  };
  
  const handleRangeTypeChange = (type) => {
    setRangeType(type);
    if (type === 'full') {
      setMinPrice('0');
      setMaxPrice('∞');
    } else if (type === 'safe') {
      // Set a "safe" range of ±20% from current price
      const currentPrice = 1800;
      setMinPrice((currentPrice * 0.8).toFixed(2));
      setMaxPrice((currentPrice * 1.2).toFixed(2));
    } else {
      setMinPrice('');
      setMaxPrice('');
    }
  };
  
  const openAiSuggestions = () => {
    setShowAiModal(true);
    setIsAiLoading(true);
    
    // Simulate AI loading and generating suggestions
    setTimeout(() => {
      setIsAiLoading(false);
      setAiSuggestions([
        {
          id: 1,
          title: 'Conservative Strategy',
          description: 'Lower risk, stable returns for the ETH/USDC pair',
          minPrice: '1620.00',
          maxPrice: '1980.00',
          apr: '5.8% - 8.2%'
        },
        {
          id: 2,
          title: 'Balanced Strategy',
          description: 'Medium risk-reward ratio based on recent volatility',
          minPrice: '1440.00',
          maxPrice: '2160.00',
          apr: '8.4% - 12.6%'
        },
        {
          id: 3,
          title: 'Aggressive Strategy',
          description: 'Higher risk with potential for greater returns',
          minPrice: '1260.00',
          maxPrice: '2340.00',
          apr: '10.5% - 18.2%'
        }
      ]);
    }, 1500);
  };
  
  const closeAiModal = () => {
    setShowAiModal(false);
  };
  
  const applySuggestion = (suggestion) => {
    setRangeType('custom');
    setMinPrice(suggestion.minPrice);
    setMaxPrice(suggestion.maxPrice);
    setShowAiModal(false);
  };
  
  const isFormValid = () => {
    return (
      amount0 && 
      amount1 && 
      parseFloat(amount0) > 0 && 
      parseFloat(amount1) > 0 &&
      ((rangeType === 'custom' && minPrice && maxPrice) || rangeType !== 'custom')
    );
  };
  
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
          <FormTitle>Add Liquidity</FormTitle>
          <div style={{ width: '20px' }}></div> {/* Spacer for alignment */}
        </FormHeader>
        
        <FeeSelector>
          <FeeOption 
            selected={selectedFee === 0.05} 
            onClick={() => setSelectedFee(0.05)}
          >
            <FeeValue>0.05%</FeeValue>
            <FeeDescription>Best for stable pairs</FeeDescription>
          </FeeOption>
          <FeeOption 
            selected={selectedFee === 0.3} 
            onClick={() => setSelectedFee(0.3)}
          >
            <FeeValue>0.3%</FeeValue>
            <FeeDescription>Most pairs</FeeDescription>
          </FeeOption>
          <FeeOption 
            selected={selectedFee === 1} 
            onClick={() => setSelectedFee(1)}
          >
            <FeeValue>1%</FeeValue>
            <FeeDescription>Exotic pairs</FeeDescription>
          </FeeOption>
        </FeeSelector>
        
        <TokenInput>
          <TokenInputHeader>
            <TokenLabel>Token 1</TokenLabel>
            <TokenBalance>
              Balance: {token0.balance}
              <button onClick={handleMaxAmount0}>MAX</button>
            </TokenBalance>
          </TokenInputHeader>
          <TokenInputContent>
            <TokenAmount 
              type="number" 
              placeholder="0.0" 
              value={amount0} 
              onChange={handleAmount0Change}
            />
            <TokenSelector>
              <TokenLogo color={token0.color}>{token0.symbol.charAt(0)}</TokenLogo>
              {token0.symbol}
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TokenSelector>
          </TokenInputContent>
        </TokenInput>
        
        <PlusButton>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.33301 8H12.6663" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PlusButton>
        
        <TokenInput>
          <TokenInputHeader>
            <TokenLabel>Token 2</TokenLabel>
            <TokenBalance>
              Balance: {token1.balance}
              <button onClick={handleMaxAmount1}>MAX</button>
            </TokenBalance>
          </TokenInputHeader>
          <TokenInputContent>
            <TokenAmount 
              type="number" 
              placeholder="0.0" 
              value={amount1} 
              onChange={handleAmount1Change}
            />
            <TokenSelector>
              <TokenLogo color={token1.color}>{token1.symbol.charAt(0)}</TokenLogo>
              {token1.symbol}
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TokenSelector>
          </TokenInputContent>
        </TokenInput>
        
        <PriceRangeSection>
          <SectionHeader>
            <SectionTitle>
              Set Price Range
              <InfoIcon />
            </SectionTitle>
            <AiSuggestButton onClick={openAiSuggestions}>
              <SparklesIcon />
              AI Suggestions
            </AiSuggestButton>
          </SectionHeader>
          
          <RangeSelector>
            <RangeOptions>
              <RangeOption 
                selected={rangeType === 'full'} 
                onClick={() => handleRangeTypeChange('full')}
              >
                Full Range
              </RangeOption>
              <RangeOption 
                selected={rangeType === 'safe'} 
                onClick={() => handleRangeTypeChange('safe')}
              >
                Safe
              </RangeOption>
              <RangeOption 
                selected={rangeType === 'custom'} 
                onClick={() => handleRangeTypeChange('custom')}
              >
                Custom
              </RangeOption>
            </RangeOptions>
            
            <CurrentPrice>
              Current Price: <span>1 ETH = 1,800 USDC</span>
            </CurrentPrice>
            
            {rangeType === 'custom' && (
              <RangeInputs>
                <RangeInput>
                  <RangeInputLabel>Min Price</RangeInputLabel>
                  <RangeInputValue 
                    type="number" 
                    placeholder="0.0" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </RangeInput>
                <RangeInput>
                  <RangeInputLabel>Max Price</RangeInputLabel>
                  <RangeInputValue 
                    type="number" 
                    placeholder="∞" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </RangeInput>
              </RangeInputs>
            )}
          </RangeSelector>
        </PriceRangeSection>
        
        <DepositSummary>
          <SummaryRow>
            <SummaryLabel>Fee Tier</SummaryLabel>
            <SummaryValue>{selectedFee}%</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Price Range</SummaryLabel>
            <SummaryValue>
              {rangeType === 'full' ? 'Full Range' : `${minPrice} - ${maxPrice}`}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Estimated APR</SummaryLabel>
            <SummaryValue>8.2% - 12.5%</SummaryValue>
          </SummaryRow>
        </DepositSummary>
        
        <SubmitButton disabled={!isFormValid()}>
          {!isFormValid() ? 'Enter an amount' : 'Add Liquidity'}
        </SubmitButton>
      </FormContainer>
      
      {showAiModal && (
        <AiSuggestionModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                <SparklesIcon width={20} height={20} />
                AI Position Suggestions
              </ModalTitle>
              <CloseButton onClick={closeAiModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </CloseButton>
            </ModalHeader>
            
            <SuggestionContent>
              {isAiLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                    <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                    <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                    <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                    <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                  </svg>
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Analyzing market data and generating optimal position suggestions...
                  </p>
                </div>
              ) : (
                <>
                  <SuggestionText>
                    Based on current market conditions, historical volatility, and liquidity distribution for the ETH/USDC pair, here are personalized position strategies:
                  </SuggestionText>
                  
                  {aiSuggestions.map(suggestion => (
                    <SuggestionCard 
                      key={suggestion.id}
                      onClick={() => applySuggestion(suggestion)}
                    >
                      <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                      <SuggestionDescription>{suggestion.description}</SuggestionDescription>
                      <SuggestionDetails>
                        <SuggestionRange>Range: {suggestion.minPrice} - {suggestion.maxPrice} USDC</SuggestionRange>
                        <SuggestionAPR>Est. APR: {suggestion.apr}</SuggestionAPR>
                      </SuggestionDetails>
                    </SuggestionCard>
                  ))}
                </>
              )}
            </SuggestionContent>
            
            {!isAiLoading && (
              <ApplyButton onClick={closeAiModal}>
                Close
              </ApplyButton>
            )}
          </ModalContent>
        </AiSuggestionModal>
      )}
    </motion.div>
  );
};

export default AddPositionForm;
