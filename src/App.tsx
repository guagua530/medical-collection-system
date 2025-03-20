import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';

import Header from './components/Header';
import MedicalCardVerification from './components/MedicalCardVerification';
import FastingConfirmation from './components/FastingConfirmation';
import IdentityConfirmation from './components/IdentityConfirmation';
import HandInsertion from './components/HandInsertion';
import KeepStill from './components/KeepStill';
import Disinfecting from './components/Disinfecting';
import BloodCollection from './components/BloodCollection';
import Completed from './components/Completed';

// 定义应用主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

// 定义流程步骤
enum Step {
  MEDICAL_CARD_VERIFICATION = 0,
  FASTING_CONFIRMATION = 1,
  IDENTITY_CONFIRMATION = 2,
  HAND_INSERTION = 3,
  KEEP_STILL = 4,
  DISINFECTING = 5,
  BLOOD_COLLECTION = 6,
  COMPLETED = 7,
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.MEDICAL_CARD_VERIFICATION);

  // 处理下一步
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // 处理重新开始
  const handleReset = () => {
    setCurrentStep(Step.MEDICAL_CARD_VERIFICATION);
  };

  // 根据当前步骤渲染对应组件
  const renderStepContent = () => {
    switch (currentStep) {
      case Step.MEDICAL_CARD_VERIFICATION:
        return <MedicalCardVerification onNext={handleNext} />;
      case Step.FASTING_CONFIRMATION:
        return <FastingConfirmation onNext={handleNext} />;
      case Step.IDENTITY_CONFIRMATION:
        return <IdentityConfirmation onNext={handleNext} />;
      case Step.HAND_INSERTION:
        return <HandInsertion onNext={handleNext} />;
      case Step.KEEP_STILL:
        return <KeepStill onNext={handleNext} />;
      case Step.DISINFECTING:
        return <Disinfecting onNext={handleNext} />;
      case Step.BLOOD_COLLECTION:
        return <BloodCollection onNext={handleNext} />;
      case Step.COMPLETED:
        return <Completed onReset={handleReset} />;
      default:
        return <MedicalCardVerification onNext={handleNext} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <Header currentStep={currentStep} totalSteps={8} />
        <Container 
          maxWidth="md" 
          sx={{ 
            flex: 1, 
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {renderStepContent()}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 