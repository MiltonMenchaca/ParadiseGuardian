import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import { useState } from 'react';
import RealTimeNotifications from './RealTimeNotifications';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // Obtener nombre de usuario del localStorage
  const username = localStorage.getItem('username') || 'Usuario';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Eliminar token y datos de usuario
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    
    // Redireccionar al login
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <SecurityIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ParadiseGuardian
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RealTimeNotifications />
            <Typography variant="body1" sx={{ mr: 2 }}>
              {username}
            </Typography>
            
            <IconButton
              onClick={handleMenu}
              color="inherit"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#7986cb' }}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;