import React, { SyntheticEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface AuthFormProps {
  email: string;
  password: string;
  handleChange: (e: SyntheticEvent<HTMLElement>) => void;
}

function AuthForm({ email, password, handleChange }: AuthFormProps) {
  return (
    <>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          value={email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Log In
        </Button>
      </Box>
    </>
  );
}

export default AuthForm;
