import React from 'react';
import { Box, Container, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import Header from './componets/ui/Header';
import useSwitchTheme from './hooks/UseSwitchTheme';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SocialIcons from './componets/ui/SocialIcons';
import MoviesList from './componets/movie/MoviesList';

function App() {
  const { theme, colorMode } = useSwitchTheme();

  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mr: 5 }}>
          <SocialIcons />
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Header />
        <Container maxWidth="lg" sx={{ p: 3 }}>
          <MoviesList />
        </Container>
      </>
    </ThemeProvider>
  );
}

export default App;
