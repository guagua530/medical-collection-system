import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import styled from 'styled-components';
import SanitizerIcon from '@mui/icons-material/Sanitizer';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const VideoContainer = styled(Box)`
  width: 100%;
  max-width: 500px;
  height: 300px;
  margin: 0 auto 24px;
  background-color: #e8f5e9;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const SanitizerIconStyled = styled(SanitizerIcon)`
  font-size: 80px;
  color: #2e7d32;
  animation: sanitize 2s infinite;
  
  @keyframes sanitize {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: translateY(-10px) rotate(10deg);
      opacity: 0.8;
    }
    100% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
  }
`;

const DisinfectingWaves = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background: linear-gradient(0deg, #4caf50 0%, transparent 70%);
  transform-origin: bottom;
  animation: wave 3s infinite ease-in-out;
  
  @keyframes wave {
    0%, 100% {
      transform: scaleY(0.5);
    }
    50% {
      transform: scaleY(1);
    }
  }
`;

interface DisinfectingProps {
  onNext: () => void;
}

const Disinfecting: React.FC<DisinfectingProps> = ({ onNext }) => {
  const [progress, setProgress] = useState<number>(0);
  
  // 模拟消毒进度
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onNext, 500); // 进度完成后自动进入下一步
          return 100;
        }
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [onNext]);
  
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        正在为您消毒
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
        系统正在进行手部消毒处理，请保持手部静止，稍等片刻
      </Typography>
      
      <VideoContainer>
        <DisinfectingWaves />
        <SanitizerIconStyled />
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 2, 
            color: '#2e7d32', 
            fontWeight: 'bold',
            zIndex: 2
          }}
        >
          正在消毒中
        </Typography>
      </VideoContainer>
      
      <Box sx={{ width: '80%', mx: 'auto', mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">消毒中</Typography>
          <Typography variant="body2" color="text.secondary">{progress}%</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 10, borderRadius: 5 }} 
          color="success"
        />
      </Box>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'success.main', 
          fontWeight: 'medium'
        }}
      >
        消毒过程将持续约10秒，请耐心等待
      </Typography>
    </StyledPaper>
  );
};

export default Disinfecting; 