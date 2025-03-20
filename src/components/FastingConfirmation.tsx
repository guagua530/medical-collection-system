import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import styled from 'styled-components';

// 导入参考图片
import fastingImage from '../assets/图片2.png';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const IllustrationImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 16px auto;
  border-radius: 8px;
`;

const OptionButton = styled(Button)<{ selected?: boolean }>`
  min-width: 160px;
  border-radius: 30px;
  padding: 12px 24px;
  margin: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: ${props => props.selected ? '0 6px 16px rgba(25, 118, 210, 0.3)' : 'none'};
  transform: ${props => props.selected ? 'translateY(-2px)' : 'none'};
`;

interface FastingConfirmationProps {
  onNext: () => void;
}

const FastingConfirmation: React.FC<FastingConfirmationProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    setSelected(value);
  };

  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        请确认您是否空腹
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
        为确保检测结果准确，我们需要确认您是否处于空腹状态（8小时内未进食）
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <IllustrationImage src={fastingImage} alt="空腹确认" />
      </Box>
      
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}>
        <Grid item>
          <OptionButton
            variant={selected === 'yes' ? 'contained' : 'outlined'}
            color="primary"
            selected={selected === 'yes'}
            onClick={() => handleSelection('yes')}
          >
            是，我已空腹
          </OptionButton>
        </Grid>
        <Grid item>
          <OptionButton
            variant={selected === 'no' ? 'contained' : 'outlined'}
            color="secondary"
            selected={selected === 'no'}
            onClick={() => handleSelection('no')}
          >
            否，我未空腹
          </OptionButton>
        </Grid>
      </Grid>
      
      <Button 
        variant="contained" 
        size="large" 
        disabled={!selected}
        onClick={handleContinue}
        sx={{ 
          px: 5, 
          py: 1.5, 
          borderRadius: '28px',
          fontSize: '1.1rem',
          minWidth: 180
        }}
      >
        确认并继续
      </Button>
    </StyledPaper>
  );
};

export default FastingConfirmation; 