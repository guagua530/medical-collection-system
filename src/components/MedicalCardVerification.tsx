import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Card, CardContent, Alert } from '@mui/material';
import styled from 'styled-components';

// 导入参考图片
import cardImage from '../assets/图片1.png';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  margin: 24px auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

interface MedicalCardVerificationProps {
  onNext: () => void;
}

const MedicalCardVerification: React.FC<MedicalCardVerificationProps> = ({ onNext }) => {
  const [cardDetected, setCardDetected] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  // 模拟检测医保卡
  const handleCardDetection = () => {
    setShowError(false);
    
    // 模拟50%的概率成功检测到医保卡
    if (Math.random() > 0.5) {
      setCardDetected(true);
      setTimeout(onNext, 1500); // 成功后1.5秒自动进入下一步
    } else {
      setShowError(true);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        请插入您的医保卡
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
        请将医保卡插入设备右侧的卡槽中，以完成身份验证流程
      </Typography>
      
      <CardImage src={cardImage} alt="医保卡插入示意图" />
      
      {showError && (
        <Alert severity="error" sx={{ mb: 3, mx: 'auto', maxWidth: '450px' }}>
          未检测到医保卡，请确保正确插入医保卡
        </Alert>
      )}
      
      {cardDetected ? (
        <Card sx={{ maxWidth: '450px', mx: 'auto', mb: 2, bgcolor: '#e8f5e9', border: '1px solid #4caf50' }}>
          <CardContent>
            <Typography variant="h6" color="success.main">
              医保卡验证成功
            </Typography>
            <Typography variant="body2" color="text.secondary">
              正在进入下一步...
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleCardDetection}
            sx={{ 
              px: 4, 
              py: 1.5, 
              borderRadius: '28px',
              fontSize: '1.1rem'
            }}
          >
            检测医保卡
          </Button>
        </Box>
      )}
    </StyledPaper>
  );
};

export default MedicalCardVerification; 