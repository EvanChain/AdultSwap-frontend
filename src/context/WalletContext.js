import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

// Create context
export const WalletContext = createContext();

const providerOptions = {
  // You can add other wallet providers here if needed
};

const web3Modal = new Web3Modal({
  network: "mainnet", // Can be "mainnet", "rinkeby", etc.
  cacheProvider: true,
  providerOptions
});

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Connect to the wallet
      const instance = await web3Modal.connect();
      
      // Create ethers provider
      const provider = new ethers.providers.Web3Provider(instance);
      setProvider(provider);
      
      // Get signer
      const signer = provider.getSigner();
      setSigner(signer);
      
      // Get account
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        setAccount(account);
        
        // Get balance
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
        
        setIsConnected(true);
      }
      
      // Get network
      const network = await provider.getNetwork();
      setChainId(network.chainId);
      
      // Setup event listeners
      instance.on("accountsChanged", handleAccountsChanged);
      instance.on("chainChanged", handleChainChanged);
      instance.on("disconnect", handleDisconnect);
      
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setError("Failed to connect to wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const disconnectWallet = useCallback(async () => {
    try {
      await web3Modal.clearCachedProvider();
      setProvider(null);
      setSigner(null);
      setAccount(null);
      setChainId(null);
      setIsConnected(false);
      setBalance(null);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      setError("Failed to disconnect wallet. Please try again.");
    }
  }, []);
  
  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      updateBalance(accounts[0]);
    } else {
      // No accounts found - user has disconnected
      disconnectWallet();
    }
  };
  
  const handleChainChanged = (chainId) => {
    // Need to convert from hex to decimal
    const newChainId = parseInt(chainId, 16);
    setChainId(newChainId);
    
    // Reload the page as recommended by MetaMask
    window.location.reload();
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
  };
  
  const updateBalance = async (address) => {
    if (provider && address) {
      try {
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };
  
  // Auto connect if cached provider exists
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);
  
  // Update balance when account changes
  useEffect(() => {
    if (account) {
      updateBalance(account);
    }
  }, [account, provider]);
  
  // Format account address for display
  const formatAccount = (account) => {
    if (!account) return '';
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
  };
  
  // Check if connected to the correct network
  const isCorrectNetwork = chainId === 1; // Ethereum Mainnet
  
  // Switch network function
  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }], // Ethereum Mainnet
      });
    } catch (error) {
      console.error("Error switching network:", error);
      setError("Failed to switch network. Please try manually in your wallet.");
    }
  };
  
  return (
    <WalletContext.Provider
      value={{
        provider,
        signer,
        account,
        chainId,
        isConnected,
        balance,
        error,
        isLoading,
        isCorrectNetwork,
        connectWallet,
        disconnectWallet,
        formatAccount,
        switchNetwork
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = () => {
  const context = React.useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
