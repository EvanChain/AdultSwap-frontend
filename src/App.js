import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SwapPage from './pages/SwapPage';
import PoolPage from './pages/PoolPage';
import ChartsPage from './pages/ChartsPage';
import VotePage from './pages/VotePage';
import AddPositionPage from './pages/AddPositionPage';
import RemovePositionPage from './pages/RemovePositionPage';
import { WalletProvider } from './context/WalletContext';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<SwapPage />} />
            <Route path="/pool" element={<PoolPage />} />
            <Route path="/add-position" element={<AddPositionPage />} />
            <Route path="/remove-position" element={<RemovePositionPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/vote" element={<VotePage />} />
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  );
}

export default App;
