import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import styled from 'styled-components';
import WarningIcon from '@mui/icons-material/Warning';

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
  background-color: #fdf2f1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid #ffccbc;
`;

const BloodDropAnimation = styled(Box)`
  width: 20px;
  height: 20px;
  background-color: #f44336;
  border-radius: 50% 50% 50% 0;
  position: absolute;
  transform: rotate(-45deg);
  animation: drip 2s infinite;
  
  @keyframes drip {
    0% {
      top: 20%;
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      top: 70%;
      opacity: 0;
    }
  }
`;

const BloodCollectionTube = styled(Box)`
  width: 50px;
  height: 120px;
  background: linear-gradient(to top, #f44336 var(--fill-level), transparent var(--fill-level));
  border: 2px solid #9e9e9e;
  border-radius: 0 0 20px 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 0;
    right: 0;
    height: 15px;
    background-color: #9e9e9e;
    border-radius: 5px 5px 0 0;
  }
`;

interface BloodCollectionProps {
  onNext: () => void;
}

const BloodCollection: React.FC<BloodCollectionProps> = ({ onNext }) => {
  const [progress, setProgress] = useState<number>(0);
  const [fillLevel, setFillLevel] = useState<number>(0);
  
  // 模拟采血进度
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onNext, 1000); // 进度完成后自动进入下一步
          return 100;
        }
        return newProgress;
      });
      
      setFillLevel((prevLevel) => {
        const newLevel = prevLevel + 1;
        return newLevel > 80 ? 80 : newLevel;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, [onNext]);
  
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
        正在进行采血
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
        系统正在进行采血过程，请保持手部静止，全程不要移动
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <WarningIcon color="warning" sx={{ mr: 1 }} />
        <Typography variant="body2" color="warning.main" fontWeight="medium">
          采血过程中移动手部可能导致采血失败
        </Typography>
      </Box>
      
      <VideoContainer>
        <BloodDropAnimation />
        <BloodCollectionTube 
          style={{ 
            '--fill-level': `${fillLevel}%` 
          } as React.CSSProperties} 
        />
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 3, 
            color: '#c62828', 
            fontWeight: 'bold'
          }}
        >
          正在采集，请保持不动
        </Typography>
      </VideoContainer>
      
      <Box sx={{ width: '80%', mx: 'auto', mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">采血进度</Typography>
          <Typography variant="body2" color="text.secondary">{progress}%</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#c62828'
            }
          }} 
          color="error"
        />
      </Box>
      
      <Typography 
        variant="body1" 
        sx={{ 
          animation: 'blink 1.5s infinite',
          '@keyframes blink': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 }
          },
          color: 'error.main',
          fontWeight: 'medium'
        }}
      >
        请不要移动手臂，保持静止状态
      </Typography>
    </StyledPaper>
  );
};

export default BloodCollection; 