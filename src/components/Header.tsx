import React from 'react';
import { AppBar, Toolbar, Typography, Box, LinearProgress } from '@mui/material';
import styled from 'styled-components';

// 导入系统图标
import iconSrc from '../assets/icon.jpg';

const Logo = styled.img`
  height: 40px;
  margin-right: 16px;
`;

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

const Header: React.FC<HeaderProps> = ({ currentStep, totalSteps }) => {
  // 计算进度百分比
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar>
        <Logo src={iconSrc} alt="医疗采集系统图标" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          医疗采集系统
        </Typography>
        <Typography variant="body2" sx={{ mr: 2 }}>
          步骤 {currentStep + 1} / {totalSteps}
        </Typography>
      </Toolbar>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ height: 6 }} 
        color="secondary" 
      />
    </AppBar>
  );
};

export default Header; 