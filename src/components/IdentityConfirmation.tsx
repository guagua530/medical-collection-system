import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Card, CardContent, Avatar } from '@mui/material';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// 导入参考图片
import identityImage from '../assets/图片3.png';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const IdentityImage = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  margin: 16px auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

interface IdentityConfirmationProps {
  onNext: () => void;
}

const IdentityConfirmation: React.FC<IdentityConfirmationProps> = ({ onNext }) => {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  // 模拟患者信息
  const patientInfo = {
    name: '张三',
    age: 45,
    gender: '男',
    idNumber: '3102********1234',
    medicalCardNumber: '9876******5432',
  };

  const handleConfirm = (isConfirmed: boolean) => {
    setConfirmed(isConfirmed);
    if (isConfirmed) {
      setTimeout(onNext, 1000); // 确认后1秒自动进入下一步
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        请确认您的身份信息
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
        请仔细核对以下信息，确认是否为您本人
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <IdentityImage src={identityImage} alt="身份确认" />
      </Box>

      <Card sx={{ maxWidth: '450px', mx: 'auto', mb: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mr: 2 }}>
              {patientInfo.name.charAt(0)}
            </Avatar>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6">{patientInfo.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {patientInfo.gender} | {patientInfo.age}岁
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>身份证号:</strong> {patientInfo.idNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>医保卡号:</strong> {patientInfo.medicalCardNumber}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {confirmed === true ? (
        <Box sx={{ color: 'success.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircleIcon sx={{ mr: 1 }} />
          <Typography variant="body1">
            身份已确认，正在进入下一步...
          </Typography>
        </Box>
      ) : confirmed === false ? (
        <Box sx={{ color: 'error.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CancelIcon sx={{ mr: 1 }} />
          <Typography variant="body1">
            请联系工作人员协助
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="error"
            size="large" 
            onClick={() => handleConfirm(false)}
            sx={{ borderRadius: '28px', px: 3 }}
          >
            这不是我
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            size="large" 
            onClick={() => handleConfirm(true)}
            sx={{ borderRadius: '28px', px: 4 }}
          >
            是我本人
          </Button>
        </Box>
      )}
    </StyledPaper>
  );
};

export default IdentityConfirmation; 