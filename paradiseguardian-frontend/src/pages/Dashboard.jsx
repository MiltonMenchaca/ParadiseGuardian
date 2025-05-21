import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Chart from '../components/Chart';
import LogList from '../components/LogList';
import Navbar from '../components/Navbar';
import { fetchLogs } from '../services/api';
import { initSocket, subscribeToEvent, unsubscribeFromEvent } from '../services/socketService';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Cargar logs iniciales
    const loadLogs = async () => {
      try {
        const response = await fetchLogs();
        setLogs(response.data);
        calculateStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar logs:', error);
        setLoading(false);
      }
    };

    loadLogs();

    // Conectar WebSocket
    const socket = initSocket();
    
    // Suscribirse al evento de nuevos logs
    const handleNewLog = (newLog) => {
      setLogs((prevLogs) => {
        const updatedLogs = [newLog, ...prevLogs];
        calculateStats(updatedLogs);
        return updatedLogs.slice(0, 100); // Mantener solo los 100 logs más recientes
      });
    };
    
    subscribeToEvent('newLog', handleNewLog);

    return () => {
      // Limpiar suscripciones al desmontar el componente
      unsubscribeFromEvent('newLog', handleNewLog);
    };
  }, [navigate]);

  // Calcular estadísticas para los gráficos
  const calculateStats = (logData) => {
    const newStats = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    };

    logData.forEach((log) => {
      if (log.severity in newStats) {
        newStats[log.severity]++;
      }
    });

    setStats(newStats);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard de Seguridad
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Gráficos de métricas */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                }}
              >
                <Chart stats={stats} />
              </Paper>
            </Grid>
            
            {/* Resumen de eventos */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Resumen de Eventos
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Críticos:</Typography>
                    <Typography color="error">{stats.critical}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Altos:</Typography>
                    <Typography color="warning.main">{stats.high}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Medios:</Typography>
                    <Typography color="info.main">{stats.medium}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Bajos:</Typography>
                    <Typography color="success.main">{stats.low}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Informativos:</Typography>
                    <Typography>{stats.info}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            {/* Tabla de logs */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Logs en Tiempo Real
                </Typography>
                <LogList logs={logs} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;