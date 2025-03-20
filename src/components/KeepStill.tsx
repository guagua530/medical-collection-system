import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const VideoContainer = styled(Box)`
  width: 100%;
  max-width: 500px;
  height: 350px;
  margin: 0 auto 24px;
  background-color: #000;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const PulseCircle = styled(Box)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(0, 200, 83, 0.2);
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  
  @keyframes pulse-ring {
    0% {
      transform: scale(0.5);
    }
    80%, 100% {
      opacity: 0;
    }
    100% {
      transform: scale(1.8);
    }
  }
`;

const InnerCircle = styled(Box)`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(0, 200, 83, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeRemaining = styled(Typography)`
  font-size: 3rem;
  font-weight: bold;
  margin-top: 16px;
  color: #fff;
`;

interface KeepStillProps {
  onNext: () => void;
}

const KeepStill: React.FC<KeepStillProps> = ({ onNext }) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [progress, setProgress] = useState<number>(0);
  
  // 模拟5秒倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setTimeout(onNext, 500); // 倒计时结束后自动进入下一步
          return 0;
        }
        return prevCount - 1;
      });
      
      setProgress((prevProgress) => prevProgress + 20);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onNext]);
  
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        请保持不动
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
        系统正在进行扫描，请保持手部静止，倒计时结束后将自动进入下一步
      </Typography>
      
      <VideoContainer>
        <PulseCircle />
        <InnerCircle>
          <CircularProgress 
            variant="determinate" 
            value={progress} 
            size={60}
            thickness={5}
            sx={{ color: '#fff' }}
          />
        </InnerCircle>
        <TimeRemaining variant="h2">{countdown}</TimeRemaining>
      </VideoContainer>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'success.main', 
          fontWeight: 'medium',
          animation: 'blink 1.5s infinite',
          '@keyframes blink': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 }
          }
        }}
      >
        扫描正在进行中，请保持不动...
      </Typography>
    </StyledPaper>
  );
};

export default KeepStill; 