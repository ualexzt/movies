import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppleIcon from '@mui/icons-material/Apple';
import { Box, IconButton } from '@mui/material';

function SocialButtons() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton color="primary">
        <AppleIcon fontSize="large" />
      </IconButton>
      <IconButton color="primary">
        <InstagramIcon fontSize="large" />
      </IconButton>
      <IconButton color="primary">
        <FacebookOutlinedIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default SocialButtons;
