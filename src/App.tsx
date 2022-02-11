import React from 'react';
import { Box, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import Header from './componets/ui/Header';
import useSwitchTheme from './hooks/UseSwitchTheme';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SocialButtons from './componets/ui/SocialButtons';
import { Route, Routes } from 'react-router-dom';
import MainPage from './componets/pages/MainPage';
import LogIn from './componets/pages/auth/LogIn';
import SignUp from './componets/pages/auth/SignUp';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Profile from './componets/pages/dashboard/Profile';
import MoviesList from './componets/pages/movie/MoviesList';
import MovieDetail from './componets/pages/movie/MovieDetail';
import AddOrEditMovie from './componets/pages/movie/AddOrEditMovie';
import RequireAuth from './hoc/RequireAuth';
import FavoriteList from './componets/pages/movie/FavoriteList';

function App() {
  const { theme, colorMode } = useSwitchTheme();

  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mr: 5 }}>
          <SocialButtons />
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <UserAuthContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="movies" element={<MoviesList />} />
            <Route path="favorites" element={<FavoriteList />} />
            <Route
              path="movies/add"
              element={
                <RequireAuth>
                  <AddOrEditMovie />
                </RequireAuth>
              }
            />
            <Route path="movies/:id" element={<MovieDetail />} />
            <Route
              path="movies/edit/:id"
              element={
                <RequireAuth>
                  <AddOrEditMovie />
                </RequireAuth>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </>
    </ThemeProvider>
  );
}

export default App;
