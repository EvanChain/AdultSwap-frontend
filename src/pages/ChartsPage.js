import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ChartsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChartsHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ChartsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ChartsDescription = styled.p`
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

const ChartCard = styled.div`
  background-color: var(--bg-light);
  border-radius: 24px;
  padding: 1.5rem;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto 2rem auto;
`;

const ChartTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
`;

const ChartTab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-tertiary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 0.5rem 1rem;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
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

const ChartContainer = styled.div`
  height: 300px;
  background-color: var(--bg-lighter);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
`;

const PriceChart = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1rem;
`;

const ChartLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const ChartBar = styled.div`
  flex: 1;
  background: ${props => props.type === 'price' 
    ? `linear-gradient(180deg, 
      ${props.value > props.prevValue ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'} 0%, 
      transparent 100%)`
    : props.value > 0 
      ? 'rgba(76, 175, 80, 0.7)' 
      : 'rgba(244, 67, 54, 0.7)'
  };
  height: ${props => `${props.height}%`};
  margin: 0 1px;
  position: relative;
  transition: height 0.3s ease;
  
  &:hover::after {
    content: '${props => props.tooltip}';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg-dark);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
  }
`;

const TokenSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TokenPair = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TokenLogos = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const TokenLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
`;

const TokenName = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TimeframeButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-tertiary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background-color: var(--bg-light);
  padding: 1rem;
  border-radius: 16px;
  width: 100%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.25rem;
`;

const AprCard = styled(ChartCard)`
  margin-top: 2rem;
`;

const AprTable = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 1.5rem;
`;

const AprTableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 1fr;
  background-color: var(--bg-secondary);
  padding: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const AprTableRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: var(--bg-secondary);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const PairCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AprCell = styled.div`
  font-weight: 500;
  color: ${props => props.highlight ? 'var(--primary)' : 'var(--text-primary)'};
`;

const AprBarContainer = styled.div`
  height: 6px;
  background-color: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.25rem;
  display: flex;
`;

const AprBar = styled.div`
  height: 100%;
  background-color: ${props => props.type === 'fee' ? 'var(--primary)' : 'var(--secondary)'};
  width: ${props => props.width}%;
`;

const AprChartContainer = styled.div`
  height: 250px;
  background-color: var(--bg-lighter);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  margin-top: 1.5rem;
  padding: 1rem;
`;

const AprChartLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const AprChartPoint = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
  transform: translate(-50%, 50%);
  bottom: ${props => props.y}%;
  left: ${props => props.x}%;
  
  &:hover::after {
    content: '${props => props.tooltip}';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg-dark);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
  }
`;

const AprChartPath = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AprChartGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.height}%;
  background: linear-gradient(180deg, rgba(255, 0, 122, 0.2) 0%, transparent 100%);
  border-radius: 16px 16px 0 0;
`;

const AprChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  color: var(--text-tertiary);
`;

const AprLegend = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const AprLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const AprLegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

const TransactionsCard = styled(ChartCard)`
  margin-top: 2rem;
`;

const TransactionsList = styled.div`
  padding: 1rem;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TransactionType = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${props => props.type === 'swap' ? 'var(--primary)' : props.type === 'add' ? 'var(--secondary)' : 'var(--text-tertiary)'}};
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TransactionPair = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const TransactionTime = styled.span`
  font-size: 0.75rem;
  color: var(--text-tertiary);
`;

const TransactionValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
`;

// Mock data for price chart
const mockPriceData = [
  { date: '2025-03-22', price: 1825.42, volume: 1.2 },
  { date: '2025-03-23', price: 1842.18, volume: 1.5 },
  { date: '2025-03-24', price: 1836.75, volume: 1.3 },
  { date: '2025-03-25', price: 1850.20, volume: 1.8 },
  { date: '2025-03-26', price: 1862.45, volume: 2.1 },
  { date: '2025-03-27', price: 1855.30, volume: 1.7 },
  { date: '2025-03-28', price: 1840.15, volume: 1.4 },
  { date: '2025-03-29', price: 1842.65, volume: 1.6 }
];

// Mock data for volume chart
const mockVolumeData = [
  { date: '2025-03-22', volume: 1.2 },
  { date: '2025-03-23', volume: 1.5 },
  { date: '2025-03-24', volume: 1.3 },
  { date: '2025-03-25', volume: 1.8 },
  { date: '2025-03-26', volume: 2.1 },
  { date: '2025-03-27', volume: 1.7 },
  { date: '2025-03-28', volume: 1.4 },
  { date: '2025-03-29', volume: 1.6 }
];

// Mock data for liquidity chart
const mockLiquidityData = [
  { date: '2025-03-22', liquidity: 4.3 },
  { date: '2025-03-23', liquidity: 4.4 },
  { date: '2025-03-24', liquidity: 4.5 },
  { date: '2025-03-25', liquidity: 4.6 },
  { date: '2025-03-26', liquidity: 4.7 },
  { date: '2025-03-27', liquidity: 4.8 },
  { date: '2025-03-28', liquidity: 4.8 },
  { date: '2025-03-29', liquidity: 4.8 }
];

// Mock data for transactions
const mockTransactions = [
  {
    id: 1,
    type: 'swap',
    pair: 'ETH → USDC',
    time: '10 mins ago',
    value: '$12,450',
    address: '0x1a2...3b4c'
  },
  {
    id: 2,
    type: 'add',
    pair: 'ETH / USDC',
    time: '25 mins ago',
    value: '$45,230',
    address: '0x5d6...7e8f'
  },
  {
    id: 3,
    type: 'remove',
    pair: 'ETH / USDC',
    time: '42 mins ago',
    value: '$8,120',
    address: '0x9a0...1b2c'
  },
  {
    id: 4,
    type: 'swap',
    pair: 'USDC → ETH',
    time: '1 hour ago',
    value: '$6,900',
    address: '0x3d4...5e6f'
  },
  {
    id: 5,
    type: 'swap',
    pair: 'ETH → USDC',
    time: '1 hour ago',
    value: '$4,200',
    address: '0x7g8...9h0i'
  }
];

// Mock token pairs
const mockTokenPairs = [
  { id: 1, token0: { symbol: 'ETH', color: '#627EEA' }, token1: { symbol: 'USDC', color: '#2775CA' } },
  { id: 2, token0: { symbol: 'ETH', color: '#627EEA' }, token1: { symbol: 'DAI', color: '#F5AC37' } },
  { id: 3, token0: { symbol: 'WBTC', color: '#F7931A' }, token1: { symbol: 'ETH', color: '#627EEA' } }
];

// Mock data for APR chart
const mockAprData = [
  { 
    pair: 'ETH / USDC',
    tokens: { token0: { symbol: 'ETH', color: '#627EEA' }, token1: { symbol: 'USDC', color: '#2775CA' } },
    feeApr: 12.4,
    yieldApr: 8.6,
    totalApr: 21.0,
    tvl: 1.8,
    volume24h: 0.9
  },
  { 
    pair: 'ETH / DAI',
    tokens: { token0: { symbol: 'ETH', color: '#627EEA' }, token1: { symbol: 'DAI', color: '#F5AC37' } },
    feeApr: 10.2,
    yieldApr: 7.8,
    totalApr: 18.0,
    tvl: 1.2,
    volume24h: 0.6
  },
  { 
    pair: 'WBTC / ETH',
    tokens: { token0: { symbol: 'WBTC', color: '#F7931A' }, token1: { symbol: 'ETH', color: '#627EEA' } },
    feeApr: 9.5,
    yieldApr: 6.9,
    totalApr: 16.4,
    tvl: 0.8,
    volume24h: 0.4
  },
  { 
    pair: 'USDC / DAI',
    tokens: { token0: { symbol: 'USDC', color: '#2775CA' }, token1: { symbol: 'DAI', color: '#F5AC37' } },
    feeApr: 4.2,
    yieldApr: 5.8,
    totalApr: 10.0,
    tvl: 2.2,
    volume24h: 1.1
  },
  { 
    pair: 'ETH / WBTC',
    tokens: { token0: { symbol: 'ETH', color: '#627EEA' }, token1: { symbol: 'WBTC', color: '#F7931A' } },
    feeApr: 8.8,
    yieldApr: 6.2,
    totalApr: 15.0,
    tvl: 1.0,
    volume24h: 0.5
  },
  { 
    pair: 'LINK / ETH',
    tokens: { token0: { symbol: 'LINK', color: '#2A5ADA' }, token1: { symbol: 'ETH', color: '#627EEA' } },
    feeApr: 14.2,
    yieldApr: 6.9,
    totalApr: 21.1,
    tvl: 0.6,
    volume24h: 0.3
  },
  { 
    pair: 'UNI / ETH',
    tokens: { token0: { symbol: 'UNI', color: '#FF007A' }, token1: { symbol: 'ETH', color: '#627EEA' } },
    feeApr: 11.3,
    yieldApr: 6.9,
    totalApr: 18.2,
    tvl: 0.5,
    volume24h: 0.25
  }
];

// Mock data for historical APR
const mockHistoricalApr = [
  { date: '2025-01-29', apr: 16.2 },
  { date: '2025-02-05', apr: 17.5 },
  { date: '2025-02-12', apr: 18.9 },
  { date: '2025-02-19', apr: 19.2 },
  { date: '2025-02-26', apr: 18.5 },
  { date: '2025-03-05', apr: 20.1 },
  { date: '2025-03-12', apr: 21.5 },
  { date: '2025-03-19', apr: 20.8 },
  { date: '2025-03-26', apr: 21.0 }
];

// Helper function to get max value from array
const getMaxValue = (data, key) => {
  return Math.max(...data.map(item => item[key]));
};

const ChartsPage = () => {
  const [activeTab, setActiveTab] = useState('price');
  const [activeTimeframe, setActiveTimeframe] = useState('1W');
  const [selectedPair, setSelectedPair] = useState(mockTokenPairs[0]);
  const [aprSortBy, setAprSortBy] = useState('totalApr');
  const [aprSortDirection, setAprSortDirection] = useState('desc');
  
  // Calculate max values for scaling
  const maxPrice = getMaxValue(mockPriceData, 'price');
  const maxVolume = getMaxValue(mockVolumeData, 'volume');
  const maxLiquidity = getMaxValue(mockLiquidityData, 'liquidity');
  const maxApr = getMaxValue(mockHistoricalApr, 'apr');
  
  // Sort APR data
  const sortedAprData = [...mockAprData].sort((a, b) => {
    return aprSortDirection === 'desc' 
      ? b[aprSortBy] - a[aprSortBy]
      : a[aprSortBy] - b[aprSortBy];
  });
  
  // Handle sort click
  const handleSortClick = (column) => {
    if (aprSortBy === column) {
      setAprSortDirection(aprSortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setAprSortBy(column);
      setAprSortDirection('desc');
    }
  };
  
  // Generate APR chart path
  const generateAprChartPath = () => {
    const points = mockHistoricalApr.map((point, index) => {
      const x = (index / (mockHistoricalApr.length - 1)) * 100;
      const y = (point.apr / maxApr) * 80;
      return `${x}% ${100 - y}%`;
    });
    
    return `M0 100% L${points.join(' L')} L100% 100% Z`;
  };
  
  // Render chart based on active tab
  const renderChart = () => {
    switch(activeTab) {
      case 'price':
        return (
          <PriceChart>
            <ChartLine>
              {mockPriceData.map((data, index) => (
                <ChartBar 
                  key={index}
                  type="price"
                  height={(data.price / maxPrice) * 80}
                  value={data.price}
                  prevValue={index > 0 ? mockPriceData[index - 1].price : data.price}
                  tooltip={`${data.date}: $${data.price}`}
                />
              ))}
            </ChartLine>
          </PriceChart>
        );
      case 'volume':
        return (
          <PriceChart>
            <ChartLine>
              {mockVolumeData.map((data, index) => (
                <ChartBar 
                  key={index}
                  height={(data.volume / maxVolume) * 80}
                  value={data.volume}
                  tooltip={`${data.date}: $${data.volume}B`}
                />
              ))}
            </ChartLine>
          </PriceChart>
        );
      case 'liquidity':
        return (
          <PriceChart>
            <ChartLine>
              {mockLiquidityData.map((data, index) => (
                <ChartBar 
                  key={index}
                  height={(data.liquidity / maxLiquidity) * 80}
                  value={data.liquidity}
                  tooltip={`${data.date}: $${data.liquidity}B`}
                />
              ))}
            </ChartLine>
          </PriceChart>
        );
      case 'transactions':
        return (
          <TransactionsList>
            {mockTransactions.slice(0, 3).map(tx => (
              <TransactionItem key={tx.id}>
                <TransactionInfo>
                  <TransactionType type={tx.type}>
                    {tx.type === 'swap' ? 'Swap' : tx.type === 'add' ? 'Add Liquidity' : 'Remove Liquidity'}
                  </TransactionType>
                  <TransactionDetails>
                    <TransactionPair>{tx.pair}</TransactionPair>
                    <TransactionTime>{tx.time} by {tx.address}</TransactionTime>
                  </TransactionDetails>
                </TransactionInfo>
                <TransactionValue>{tx.value}</TransactionValue>
              </TransactionItem>
            ))}
          </TransactionsList>
        );
      default:
        return null;
    }
  };
  
  return (
    <ChartsPageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ChartsHeader>
          <ChartsTitle>Analytics & Charts</ChartsTitle>
          <ChartsDescription>
            Track token prices, volume, liquidity, and market trends with our comprehensive analytics tools.
          </ChartsDescription>
          <AdultTagline>Only children do multiple-choice questions, I want them all!</AdultTagline>
        </ChartsHeader>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ChartCard>
          <ChartTabs>
            <ChartTab active={activeTab === 'price'} onClick={() => setActiveTab('price')}>Price</ChartTab>
            <ChartTab active={activeTab === 'volume'} onClick={() => setActiveTab('volume')}>Volume</ChartTab>
            <ChartTab active={activeTab === 'liquidity'} onClick={() => setActiveTab('liquidity')}>Liquidity</ChartTab>
            <ChartTab active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')}>Transactions</ChartTab>
          </ChartTabs>
          
          <TokenSelector>
            <TokenPair>
              <TokenLogos>
                <TokenLogo color={selectedPair.token0.color}>{selectedPair.token0.symbol.charAt(0)}</TokenLogo>
                <TokenLogo color={selectedPair.token1.color}>{selectedPair.token1.symbol.charAt(0)}</TokenLogo>
              </TokenLogos>
              <TokenName>{selectedPair.token0.symbol} / {selectedPair.token1.symbol}</TokenName>
            </TokenPair>
            
            <TimeframeSelector>
              <TimeframeButton active={activeTimeframe === '1H'} onClick={() => setActiveTimeframe('1H')}>1H</TimeframeButton>
              <TimeframeButton active={activeTimeframe === '1D'} onClick={() => setActiveTimeframe('1D')}>1D</TimeframeButton>
              <TimeframeButton active={activeTimeframe === '1W'} onClick={() => setActiveTimeframe('1W')}>1W</TimeframeButton>
              <TimeframeButton active={activeTimeframe === '1M'} onClick={() => setActiveTimeframe('1M')}>1M</TimeframeButton>
              <TimeframeButton active={activeTimeframe === '1Y'} onClick={() => setActiveTimeframe('1Y')}>1Y</TimeframeButton>
            </TimeframeSelector>
          </TokenSelector>
          
          <ChartContainer>
            {renderChart()}
          </ChartContainer>
          
          <StatsRow>
            <StatCard>
              <StatLabel>Current Price</StatLabel>
              <StatValue>$1,842.65</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>24h Change</StatLabel>
              <StatValue style={{ color: '#4caf50' }}>+2.4%</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>24h Volume</StatLabel>
              <StatValue>$1.6B</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>TVL</StatLabel>
              <StatValue>$4.8B</StatValue>
            </StatCard>
          </StatsRow>
        </ChartCard>
        
        <AprCard>
          <ChartTabs>
            <ChartTab active>APR Comparison</ChartTab>
            <ChartTab>Historical APR</ChartTab>
          </ChartTabs>
          
          <AprChartContainer>
            <AprChartGradient height={(mockHistoricalApr[mockHistoricalApr.length - 1].apr / maxApr) * 80} />
            <AprChartPath>
              <path 
                d={generateAprChartPath()} 
                fill="rgba(255, 0, 122, 0.2)" 
                stroke="var(--primary)" 
                strokeWidth="2"
              />
            </AprChartPath>
            
            {mockHistoricalApr.map((point, index) => {
              const x = (index / (mockHistoricalApr.length - 1)) * 100;
              const y = (point.apr / maxApr) * 80;
              return (
                <AprChartPoint 
                  key={index} 
                  x={x} 
                  y={y} 
                  tooltip={`${point.date}: ${point.apr}% APR`} 
                />
              );
            })}
          </AprChartContainer>
          
          <AprChartLabels>
            <span>Jan 29</span>
            <span>Feb 12</span>
            <span>Feb 26</span>
            <span>Mar 12</span>
            <span>Mar 26</span>
          </AprChartLabels>
          
          <AprLegend>
            <AprLegendItem>
              <AprLegendColor color="var(--primary)" />
              <span>Fee APR</span>
            </AprLegendItem>
            <AprLegendItem>
              <AprLegendColor color="var(--secondary)" />
              <span>Yield APR</span>
            </AprLegendItem>
            <AprLegendItem>
              <AprLegendColor color="#4caf50" />
              <span>Total APR</span>
            </AprLegendItem>
          </AprLegend>
          
          <AprTable>
            <AprTableHeader>
              <div>Pool</div>
              <AprCell 
                highlight={aprSortBy === 'feeApr'} 
                onClick={() => handleSortClick('feeApr')}
                style={{ cursor: 'pointer' }}
              >
                Fee APR {aprSortBy === 'feeApr' && (aprSortDirection === 'desc' ? '↓' : '↑')}
              </AprCell>
              <AprCell 
                highlight={aprSortBy === 'yieldApr'} 
                onClick={() => handleSortClick('yieldApr')}
                style={{ cursor: 'pointer' }}
              >
                Yield APR {aprSortBy === 'yieldApr' && (aprSortDirection === 'desc' ? '↓' : '↑')}
              </AprCell>
              <AprCell 
                highlight={aprSortBy === 'totalApr'} 
                onClick={() => handleSortClick('totalApr')}
                style={{ cursor: 'pointer' }}
              >
                Total APR {aprSortBy === 'totalApr' && (aprSortDirection === 'desc' ? '↓' : '↑')}
              </AprCell>
              <AprCell 
                highlight={aprSortBy === 'tvl'} 
                onClick={() => handleSortClick('tvl')}
                style={{ cursor: 'pointer' }}
              >
                TVL {aprSortBy === 'tvl' && (aprSortDirection === 'desc' ? '↓' : '↑')}
              </AprCell>
              <AprCell 
                highlight={aprSortBy === 'volume24h'} 
                onClick={() => handleSortClick('volume24h')}
                style={{ cursor: 'pointer' }}
              >
                Volume (24h) {aprSortBy === 'volume24h' && (aprSortDirection === 'desc' ? '↓' : '↑')}
              </AprCell>
            </AprTableHeader>
            
            {sortedAprData.map((pool, index) => (
              <AprTableRow key={index}>
                <PairCell>
                  <TokenLogos>
                    <TokenLogo color={pool.tokens.token0.color}>{pool.tokens.token0.symbol.charAt(0)}</TokenLogo>
                    <TokenLogo color={pool.tokens.token1.color}>{pool.tokens.token1.symbol.charAt(0)}</TokenLogo>
                  </TokenLogos>
                  <TokenName>{pool.pair}</TokenName>
                </PairCell>
                <AprCell>
                  {pool.feeApr}%
                  <AprBarContainer>
                    <AprBar type="fee" width={(pool.feeApr / 25) * 100} />
                  </AprBarContainer>
                </AprCell>
                <AprCell>
                  {pool.yieldApr}%
                  <AprBarContainer>
                    <AprBar type="yield" width={(pool.yieldApr / 25) * 100} />
                  </AprBarContainer>
                </AprCell>
                <AprCell style={{ color: '#4caf50', fontWeight: '600' }}>
                  {pool.totalApr}%
                  <AprBarContainer>
                    <AprBar type="fee" width={(pool.feeApr / pool.totalApr) * 100} />
                    <AprBar type="yield" width={(pool.yieldApr / pool.totalApr) * 100} />
                  </AprBarContainer>
                </AprCell>
                <AprCell>${pool.tvl}B</AprCell>
                <AprCell>${pool.volume24h}B</AprCell>
              </AprTableRow>
            ))}
          </AprTable>
        </AprCard>
        
        <TransactionsCard>
          <ChartTabs>
            <ChartTab active>Recent Transactions</ChartTab>
            <ChartTab>Top Traders</ChartTab>
            <ChartTab>Hot Pairs</ChartTab>
          </ChartTabs>
          
          <TransactionsList>
            {mockTransactions.map(tx => (
              <TransactionItem key={tx.id}>
                <TransactionInfo>
                  <TransactionType type={tx.type}>
                    {tx.type === 'swap' ? 'Swap' : tx.type === 'add' ? 'Add Liquidity' : 'Remove Liquidity'}
                  </TransactionType>
                  <TransactionDetails>
                    <TransactionPair>{tx.pair}</TransactionPair>
                    <TransactionTime>{tx.time} by {tx.address}</TransactionTime>
                  </TransactionDetails>
                </TransactionInfo>
                <TransactionValue>{tx.value}</TransactionValue>
              </TransactionItem>
            ))}
          </TransactionsList>
        </TransactionsCard>
      </motion.div>
    </ChartsPageContainer>
  );
};

export default ChartsPage;
