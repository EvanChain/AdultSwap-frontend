import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AddPositionForm from '../components/pool/AddPositionForm';
import { motion } from 'framer-motion';

const AddPositionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const AddPositionPage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/pool');
  };
  
  return (
    <AddPositionPageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AddPositionForm onBack={handleBack} />
      </motion.div>
    </AddPositionPageContainer>
  );
};

export default AddPositionPage;
