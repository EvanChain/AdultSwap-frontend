import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useWallet } from '../../context/WalletContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--bg-dark);
  border-bottom: 1px solid var(--border-color);
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTagline = styled.div`
  font-size: 0.6rem;
  color: var(--text-tertiary);
  font-weight: 400;
  margin-top: -2px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
  
  &:hover, &.active {
    color: var(--text-primary);
  }
  
  &.active::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
  }
`;

const ConnectButton = styled.button`
  background-color: ${props => props.connected ? 'var(--bg-lighter)' : 'var(--primary)'};
  color: white;
  border: none;
  border-radius: 16px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.connected ? 'var(--bg-lighter)' : 'var(--primary-hover)'};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const WalletIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NetworkIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.isCorrectNetwork ? '#4caf50' : '#f44336'};
  margin-right: 4px;
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  max-width: 300px;
  background-color: var(--bg-light);
  padding: 2rem;
  z-index: 100;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MobileNavLink = styled(Link)`
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 1.2rem;
  
  &:hover, &.active {
    color: var(--text-primary);
  }
`;

const MobileConnectButton = styled(ConnectButton)`
  display: block;
  width: 100%;
  margin-top: 1rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { 
    isConnected, 
    account, 
    connectWallet, 
    disconnectWallet, 
    formatAccount,
    isCorrectNetwork,
    balance,
    isLoading
  } = useWallet();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleWalletClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <NavbarContainer>
        <Logo>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#FF007A"/>
            <path d="M12 6.5C9.51 6.5 7.5 8.51 7.5 11C7.5 13.49 9.51 15.5 12 15.5C14.49 15.5 16.5 13.49 16.5 11C16.5 8.51 14.49 6.5 12 6.5ZM12 13.5C10.62 13.5 9.5 12.38 9.5 11C9.5 9.62 10.62 8.5 12 8.5C13.38 8.5 14.5 9.62 14.5 11C14.5 12.38 13.38 13.5 12 13.5Z" fill="#FF007A"/>
          </svg>
          <LogoText>
            AdultSwap
            <LogoTagline>Only children do multiple-choice questions, I want them all!</LogoTagline>
          </LogoText>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" className={isActive('/') ? 'active' : ''}>Swap</NavLink>
          <NavLink to="/pool" className={isActive('/pool') ? 'active' : ''}>Pool</NavLink>
          <NavLink to="/charts" className={isActive('/charts') ? 'active' : ''}>Charts</NavLink>
          <NavLink to="/vote" className={isActive('/vote') ? 'active' : ''}>Vote</NavLink>
        </NavLinks>
        
        <ConnectButton onClick={handleWalletClick} connected={isConnected} disabled={isLoading}>
          {isLoading ? (
            'Connecting...'
          ) : isConnected ? (
            <>
              <NetworkIndicator isCorrectNetwork={isCorrectNetwork} />
              {formatAccount(account)}
              {balance && ` (${parseFloat(balance).toFixed(4)} ETH)`}
            </>
          ) : (
            <>
              <WalletIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 15C16.5523 15 17 14.5523 17 14C17 13.4477 16.5523 13 16 13C15.4477 13 15 13.4477 15 14C15 14.5523 15.4477 15 16 15Z" fill="currentColor"/>
                </svg>
              </WalletIcon>
              Connect Wallet
            </>
          )}
        </ConnectButton>
        
        <MobileMenuButton onClick={toggleMenu}>
          <Bars3Icon width={24} height={24} />
        </MobileMenuButton>
      </NavbarContainer>
      
      <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
      
      <MobileMenu isOpen={isMenuOpen}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MobileMenuButton onClick={toggleMenu}>
            <XMarkIcon width={24} height={24} />
          </MobileMenuButton>
        </div>
        
        <MobileNavLink to="/" className={isActive('/') ? 'active' : ''} onClick={toggleMenu}>Swap</MobileNavLink>
        <MobileNavLink to="/pool" className={isActive('/pool') ? 'active' : ''} onClick={toggleMenu}>Pool</MobileNavLink>
        <MobileNavLink to="/charts" className={isActive('/charts') ? 'active' : ''} onClick={toggleMenu}>Charts</MobileNavLink>
        <MobileNavLink to="/vote" className={isActive('/vote') ? 'active' : ''} onClick={toggleMenu}>Vote</MobileNavLink>
        
        <MobileConnectButton onClick={handleWalletClick} connected={isConnected} disabled={isLoading}>
          {isLoading ? (
            'Connecting...'
          ) : isConnected ? (
            <>
              <NetworkIndicator isCorrectNetwork={isCorrectNetwork} />
              {formatAccount(account)}
              {balance && ` (${parseFloat(balance).toFixed(4)} ETH)`}
            </>
          ) : (
            <>
              <WalletIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 15C16.5523 15 17 14.5523 17 14C17 13.4477 16.5523 13 16 13C15.4477 13 15 13.4477 15 14C15 14.5523 15.4477 15 16 15Z" fill="currentColor"/>
                </svg>
              </WalletIcon>
              Connect Wallet
            </>
          )}
        </MobileConnectButton>
      </MobileMenu>
    </>
  );
};

export default Navbar;
