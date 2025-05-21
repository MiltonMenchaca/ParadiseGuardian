import React from 'react';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import { 
  School as SchoolIcon,
  Code as CodeIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AcademicMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          color="inherit" 
          onClick={handleClick}
          className="text-blue-100 hover:text-white border border-blue-400 hover:border-white px-4 py-1 rounded-md transition-all duration-200 hover:bg-blue-700"
        >
          Academic Information
        </Button>
      </motion.div>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: { 
            width: 250,
            borderRadius: 2,
            mt: 1
          }
        }}
      >
        <Box sx={{ py: 1, px: 2 }}>
          <Typography variant="subtitle1" className="font-bold text-indigo-800">
            Course Final Project
          </Typography>
        </Box>
        <Divider />
        
        <MenuItem onClick={() => handleNavigation('/academic/activities')} className="hover:bg-blue-50">
          <ListItemIcon>
            <SchoolIcon fontSize="small" className="text-indigo-700" />
          </ListItemIcon>
          <ListItemText 
            primary="Course Activities" 
            primaryTypographyProps={{ className: 'text-indigo-700' }}
          />
        </MenuItem>
        
        <MenuItem onClick={() => handleNavigation('/academic/system')} className="hover:bg-blue-50">
          <ListItemIcon>
            <AssignmentIcon fontSize="small" className="text-indigo-700" />
          </ListItemIcon>
          <ListItemText 
            primary="Implemented System" 
            primaryTypographyProps={{ className: 'text-indigo-700' }}
          />
        </MenuItem>
        
        <MenuItem onClick={() => handleNavigation('/academic/source')} className="hover:bg-blue-50">
          <ListItemIcon>
            <CodeIcon fontSize="small" className="text-indigo-700" />
          </ListItemIcon>
          <ListItemText 
            primary="Source Code" 
            primaryTypographyProps={{ className: 'text-indigo-700' }}
          />
        </MenuItem>
        
        <MenuItem onClick={() => handleNavigation('/academic/modifications')} className="hover:bg-blue-50">
          <ListItemIcon>
            <DescriptionIcon fontSize="small" className="text-indigo-700" />
          </ListItemIcon>
          <ListItemText 
            primary="Modifications Report" 
            primaryTypographyProps={{ className: 'text-indigo-700' }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AcademicMenu; 