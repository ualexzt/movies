import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppleIcon from '@mui/icons-material/Apple';
import { Box } from '@mui/material';

function SocialButtons() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AppleIcon sx={{ mr: 2 }} fontSize="large" color="action" />
      <InstagramIcon sx={{ mr: 2 }} fontSize="large" color="action" />
      <FacebookOutlinedIcon fontSize="large" color="action" />
    </Box>
  );
}

export default SocialButtons;
