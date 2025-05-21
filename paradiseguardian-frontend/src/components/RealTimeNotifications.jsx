import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { subscribeToEvent, unsubscribeFromEvent } from '../services/socketService';

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    // Suscribirse a eventos de logs críticos y de alta severidad
    const handleCriticalLog = (log) => {
      if (log.severity === 'critical' || log.severity === 'high') {
        const newNotification = {
          id: Date.now(),
          message: log.message,
          severity: log.severity,
          timestamp: log.timestamp,
        };
        
        setNotifications((prev) => [newNotification, ...prev]);
        
        // Mostrar la notificación más reciente
        setCurrentNotification(newNotification);
        setOpen(true);
      }
    };

    subscribeToEvent('newLog', handleCriticalLog);

    return () => {
      unsubscribeFromEvent('newLog', handleCriticalLog);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getSeverityLevel = (severity) => {
    return severity === 'critical' ? 'error' : 'warning';
  };

  return (
    <>
      <IconButton color="inherit" aria-label="notificaciones">
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {currentNotification && (
        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleClose} 
            severity={getSeverityLevel(currentNotification.severity)} 
            sx={{ width: '100%' }}
          >
            {currentNotification.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default RealTimeNotifications;