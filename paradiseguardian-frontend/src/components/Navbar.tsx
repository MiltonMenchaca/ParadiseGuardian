import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import SecurityIcon from '@mui/icons-material/Security';
import { motion } from 'framer-motion';
import AcademicMenu from './AcademicMenu';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleClose();
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    handleClose();
  };

  // Primera letra del email o nombre de usuario para el avatar
  const avatarLetter = user?.name?.charAt(0) || user?.email?.charAt(0) || 'U';

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <AppBar position="static" className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg">
        <Toolbar className="px-4 py-2">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <SecurityIcon className="mr-2 text-blue-200" />
            <Typography 
              variant="h6" 
              component="div" 
              className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-indigo-100 tracking-wide"
              sx={{ flexGrow: 1 }}
            >
              ParadiseGuardian
            </Typography>
          </motion.div>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                color="inherit" 
                onClick={() => navigate('/dashboard')}
                className="text-blue-100 hover:text-white border border-blue-400 hover:border-white px-4 py-1 rounded-md transition-all duration-200 hover:bg-blue-700"
              >
                Dashboard
              </Button>
            </motion.div>
            
            {/* Menú Académico */}
            <AcademicMenu />
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="large"
                aria-label="cuenta del usuario"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className="ml-2"
              >
                <Avatar 
                  sx={{ width: 32, height: 32 }} 
                  className="bg-indigo-300 text-indigo-800 border-2 border-blue-300"
                >
                  {avatarLetter}
                </Avatar>
              </IconButton>
            </motion.div>
            
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
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="mt-2"
            >
              <MenuItem onClick={handleDashboard} className="hover:bg-blue-50">
                <span className="text-blue-700 font-medium">Dashboard</span>
              </MenuItem>
              <MenuItem onClick={handleLogout} className="hover:bg-red-50">
                <span className="text-red-600 font-medium">Logout</span>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar; 