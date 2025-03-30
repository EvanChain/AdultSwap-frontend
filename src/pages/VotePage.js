import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const VotePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const VoteHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const VoteTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #9c42f5, #6c7ee1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const VoteDescription = styled.p`
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const VoteCard = styled.div`
  background-color: var(--bg-light);
  border-radius: 24px;
  padding: 1.5rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const VoteTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
`;

const VoteTab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-tertiary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 0.5rem 1rem;
  position: relative;
  
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

const ProposalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProposalItem = styled.div`
  background-color: var(--bg-lighter);
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ProposalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProposalTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
`;

const ProposalStatus = styled.span`
  background-color: ${props => {
    switch(props.status) {
      case 'active': return 'rgba(76, 175, 80, 0.1)';
      case 'passed': return 'rgba(33, 150, 243, 0.1)';
      case 'defeated': return 'rgba(244, 67, 54, 0.1)';
      default: return 'rgba(158, 158, 158, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#4caf50';
      case 'passed': return '#2196f3';
      case 'defeated': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ProposalDescription = styled.p`
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
`;

const ProposalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--text-tertiary);
`;

const ProposalAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
`;

const ProposalStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const VoteProgress = styled.div`
  margin-top: 1rem;
`;

const VoteProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const VoteProgressLabel = styled.span`
  color: var(--text-secondary);
`;

const VoteProgressValue = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: var(--bg-dark);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => props.color || 'var(--primary)'};
  border-radius: 4px;
`;

// Mock proposal data
const proposals = [
  {
    id: 1,
    title: 'Increase fee distribution to liquidity providers',
    description: 'This proposal aims to increase the percentage of fees distributed to liquidity providers from 0.25% to 0.3% to incentivize more liquidity in the protocol.',
    status: 'active',
    author: '0x1a2...3b4c',
    createdAt: '2 days ago',
    endTime: 'Ends in 3 days',
    votes: {
      for: 65,
      against: 35
    }
  },
  {
    id: 2,
    title: 'Add support for new token listings',
    description: 'Proposal to add support for new tokens including LINK, AAVE, and COMP to expand the trading options available on the platform.',
    status: 'passed',
    author: '0x5d6...7e8f',
    createdAt: '1 week ago',
    endTime: 'Ended 2 days ago',
    votes: {
      for: 82,
      against: 18
    }
  },
  {
    id: 3,
    title: 'Implement protocol fee switch',
    description: 'Enable a 0.05% protocol fee that will be directed to the treasury to fund future development and ecosystem growth initiatives.',
    status: 'defeated',
    author: '0x9a0...b1c2',
    createdAt: '2 weeks ago',
    endTime: 'Ended 1 week ago',
    votes: {
      for: 42,
      against: 58
    }
  }
];

const VotePage = () => {
  return (
    <VotePageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VoteHeader>
          <VoteTitle>Governance</VoteTitle>
          <VoteDescription>
            UniClone is governed by its community. Participate in discussions and vote on proposals to shape the future of the protocol.
          </VoteDescription>
        </VoteHeader>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <VoteCard>
          <VoteTabs>
            <VoteTab active>All Proposals</VoteTab>
            <VoteTab>Active</VoteTab>
            <VoteTab>Passed</VoteTab>
            <VoteTab>Defeated</VoteTab>
          </VoteTabs>
          
          <ProposalList>
            {proposals.map(proposal => (
              <ProposalItem key={proposal.id}>
                <ProposalHeader>
                  <ProposalTitle>{proposal.title}</ProposalTitle>
                  <ProposalStatus status={proposal.status}>
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </ProposalStatus>
                </ProposalHeader>
                
                <ProposalDescription>{proposal.description}</ProposalDescription>
                
                <VoteProgress>
                  <VoteProgressHeader>
                    <VoteProgressLabel>For</VoteProgressLabel>
                    <VoteProgressValue>{proposal.votes.for}%</VoteProgressValue>
                  </VoteProgressHeader>
                  <ProgressBar>
                    <ProgressFill percentage={proposal.votes.for} color="#4caf50" />
                  </ProgressBar>
                </VoteProgress>
                
                <VoteProgress>
                  <VoteProgressHeader>
                    <VoteProgressLabel>Against</VoteProgressLabel>
                    <VoteProgressValue>{proposal.votes.against}%</VoteProgressValue>
                  </VoteProgressHeader>
                  <ProgressBar>
                    <ProgressFill percentage={proposal.votes.against} color="#f44336" />
                  </ProgressBar>
                </VoteProgress>
                
                <ProposalFooter>
                  <ProposalAuthor>
                    <AuthorAvatar>A</AuthorAvatar>
                    {proposal.author}
                  </ProposalAuthor>
                  
                  <ProposalStats>
                    <span>Created {proposal.createdAt}</span>
                    <span>•</span>
                    <span>{proposal.endTime}</span>
                  </ProposalStats>
                </ProposalFooter>
              </ProposalItem>
            ))}
          </ProposalList>
        </VoteCard>
      </motion.div>
    </VotePageContainer>
  );
};

export default VotePage;
