import React from 'react';
import { Box, Typography, Button, Paper, Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled(CheckCircleIcon)`
  font-size: 80px;
  color: #4caf50;
  margin-bottom: 16px;
`;

const ResultCard = styled(Card)`
  max-width: 450px;
  margin: 24px auto;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  background-color: #f5f5f5;
  overflow: hidden;
`;

const ResultHeader = styled(Box)`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  text-align: center;
`;

interface CompletedProps {
  onReset: () => void;
}

const Completed: React.FC<CompletedProps> = ({ onReset }) => {
  // 模拟随机生成的采血编号
  const sampleId = `BLD-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;
  
  // 格式化当前日期
  const currentDate = new Date().toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <StyledPaper elevation={3}>
      <SuccessIcon />
      
      <Typography variant="h4" gutterBottom color="success.main" sx={{ fontWeight: 'bold' }}>
        采血完成
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
        您的血液样本已成功采集，请按照下方提示取走报告单
      </Typography>
      
      <ResultCard>
        <ResultHeader>
          <Typography variant="h6" fontWeight="bold">
            采集结果
          </Typography>
        </ResultHeader>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              样本编号:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {sampleId}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              采集时间:
            </Typography>
            <Typography variant="body1">
              {currentDate}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              采集状态:
            </Typography>
            <Typography variant="body1" color="success.main" fontWeight="bold">
              成功
            </Typography>
          </Box>
        </CardContent>
      </ResultCard>
      
      <Typography variant="body1" paragraph sx={{ fontWeight: 'medium', mb: 4 }}>
        您可以凭借上方样本编号到取报告区领取检验结果
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary"
        size="large" 
        onClick={onReset}
        sx={{ 
          px: 5, 
          py: 1.5, 
          borderRadius: '28px',
          fontSize: '1.1rem'
        }}
      >
        完成并退出
      </Button>
    </StyledPaper>
  );
};

export default Completed; 