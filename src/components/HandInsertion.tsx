import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, LinearProgress } from '@mui/material';
import styled from 'styled-components';

// 导入参考图片
import handImage from '../assets/图片4.png';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const HandImage = styled.img`
  width: 100%;
  max-width: 450px;
  height: auto;
  margin: 24px auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const PulsingBox = styled(Box)`
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 15px rgba(25, 118, 210, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
    }
  }
`;

interface HandInsertionProps {
  onNext: () => void;
}

const HandInsertion: React.FC<HandInsertionProps> = ({ onNext }) => {
  const [autoProgress, setAutoProgress] = useState<number>(0);
  const [handDetected, setHandDetected] = useState<boolean>(false);

  // 模拟手部检测
  useEffect(() => {
    if (!handDetected) {
      const timer = setTimeout(() => {
        setHandDetected(true);
      }, 5000); // 5秒后自动检测到手部
      
      return () => clearTimeout(timer);
    } else {
      const timer = setInterval(() => {
        setAutoProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(onNext, 500); // 进度完成后0.5秒自动进入下一步
            return 100;
          }
          return newProgress;
        });
      }, 200);
      
      return () => clearInterval(timer);
    }
  }, [handDetected, onNext]);

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        请将手放入采集设备
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
        请按照下图所示将手部轻轻放入设备采集窗口，保持自然放松状态
      </Typography>
      
      <PulsingBox 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 3,
          borderRadius: '16px',
          border: handDetected ? '3px solid #4caf50' : '3px solid #2196f3',
          p: 1
        }}
      >
        <HandImage src={handImage} alt="手部放入示意图" />
      </PulsingBox>
      
      {handDetected ? (
        <Box sx={{ width: '80%', mx: 'auto', mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">扫描中</Typography>
            <Typography variant="body2" color="text.secondary">{autoProgress}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={autoProgress} 
            sx={{ height: 10, borderRadius: 5 }} 
            color="success"
          />
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 3, 
              color: 'success.main', 
              fontWeight: 'medium',
              animation: 'blink 1.5s infinite'
            }}
          >
            已检测到手部，请保持不动
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <Typography 
            variant="body1" 
            color="primary" 
            sx={{ 
              fontWeight: 'medium',
              animation: 'blink 1.5s infinite',
              '@keyframes blink': {
                '0%': { opacity: 0.6 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.6 }
              }
            }}
          >
            等待检测到手部...
          </Typography>
        </Box>
      )}
    </StyledPaper>
  );
};

export default HandInsertion; 