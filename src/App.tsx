import React from 'react';
import { Box, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import Header from './componets/ui/Header';
import useSwitchTheme from './hooks/UseSwitchTheme';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SocialIcons from './componets/ui/SocialIcons';
import { Route, Routes } from 'react-router-dom';
import MainPage from './componets/pages/MainPage';
import LogIn from './componets/pages/auth/LogIn';
import SignUp from './componets/pages/auth/SignUp';
import { UserAuthContextProvider } from './componets/context/UserAuthContext';
import Profile from './componets/pages/dashboard/Profile';
import MoviesList from './componets/pages/movie/MoviesList';
import MovieDetail from './componets/pages/movie/MovieDetail';
import AddMovie from './componets/pages/movie/AddMovie';

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

        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="movies" element={<MoviesList />} />
            <Route path="movies/add" element={<AddMovie />} />
            <Route path="movies/:id" element={<MovieDetail />} />
          </Routes>
        </UserAuthContextProvider>
      </>
    </ThemeProvider>
  );
}

export default App;
