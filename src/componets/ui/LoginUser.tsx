import React from 'react';
import Box from '@mui/material/Box';
import { Avatar, IconButton, Link, Menu, MenuItem, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { useUserAuth } from '../context/UserAuthContext';

const auth = getAuth(app);

// import { signOut } from 'firebase/auth';

function LoginUser() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { setUser } = useUserAuth();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        setAnchorElUser(null);
        setUser(() => null);
        navigate('/');
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <>
      <Box sx={{ ml: 5, flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Link component={RouterLink} to="/profile" sx={{ textDecoration: 'none' }}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Link component={RouterLink} to="/movies/add" sx={{ textDecoration: 'none' }}>
              Add movie
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <Typography textAlign="center">LogOut</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default LoginUser;
