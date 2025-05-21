import { useEffect, useCallback } from 'react';
import { Container, Typography, Box, Grid, Paper, Tab, Tabs, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchLogs } from '../store/slices/logsSlice';
import LogsList from '../components/LogsList';
import Chart from '../components/Chart';
import { useState } from 'react';
import api from '../services/api';
import axios from 'axios';
import { motion } from 'framer-motion';
import { SecurityLog } from '../types';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { logs, loading, error } = useAppSelector(state => state.logs);
  const [tabValue, setTabValue] = useState(0);
  const [generatingLogs, setGeneratingLogs] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Use useCallback to avoid unnecessary function recreations
  const fetchLogsData = useCallback(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  useEffect(() => {
    // Load logs when component mounts
    fetchLogsData();

    // Reload logs every 30 seconds
    const interval = setInterval(() => {
      fetchLogsData();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchLogsData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleGenerateLogs = useCallback(async () => {
    try {
      setGeneratingLogs(true);
      setLocalError(null);
      console.log("Attempting to generate test logs at", import.meta.env.VITE_API_URL || 'http://localhost:5000');
      
      // Call endpoint to generate test logs
      const response = await api.post('/api/logs/generate');
      console.log("Log generation response:", response.data);
      
      // Update logs list
      fetchLogsData();
    } catch (error: unknown) {
      console.error('Error generating test logs:', error);
      if (axios.isAxiosError(error)) {
        // Request was made and server responded with status code
        if (error.response) {
          console.error('Server response:', error.response.data);
          console.error('Status code:', error.response.status);
          setLocalError(`Error ${error.response.status}: ${error.response.data?.error || 'Unknown error'}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received from server');
          setLocalError('No response received from server. Is the backend running?');
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Configuration error:', error.message);
          setLocalError(`Configuration error: ${error.message}`);
        }
      } else {
        console.error('Unknown error:', error);
        setLocalError('Unknown error generating logs');
      }
    } finally {
      setGeneratingLogs(false);
    }
  }, [fetchLogsData]);

  // Helper to get number of logs by level
  const getLogCount = (levelType: string): number => {
    return logs.filter(log => 
      (log.level === levelType || log.severity === levelType)
    ).length;
  };

  // Safe rendering components that handle their own errors
  const renderCharts = () => {
    try {
      // Verify logs have expected structure
      if (!logs || !Array.isArray(logs)) {
        return (
          <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
            <p className="text-yellow-800">Invalid data format for chart rendering</p>
          </div>
        );
      }

      // Use safe casting for data type
      const safeData = logs as unknown as SecurityLog[];
      
      switch (tabValue) {
        case 0:
          return (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Chart data={safeData} type="bar" title="Logs by Severity Level" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Chart data={safeData} type="pie" title="Log Distribution by Level" />
              </Grid>
            </Grid>
          );
        case 1:
          return <Chart data={safeData} type="line" title="Log Trend Over Time" height={400} />;
        case 2:
          return (
            <div className="flex justify-center items-center h-40 bg-gray-50 rounded-lg">
              <Typography className="text-gray-500">
                Log distribution by source chart (in development)
              </Typography>
            </div>
          );
        default:
          return null;
      }
    } catch (error) {
      console.error("Error rendering charts:", error);
      return (
        <div className="p-4 bg-red-50 rounded-md border border-red-200">
          <p className="text-red-800">Error rendering charts</p>
        </div>
      );
    }
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          className="mb-6 font-bold text-center text-gray-800 md:text-left"
        >
          Security Dashboard
        </Typography>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Grid container spacing={3} alignItems="center" className="mb-8">
          <Grid item>
            <Typography variant="subtitle1" className="font-medium text-gray-700">
              Welcome, {user?.name || user?.email || 'User'}
            </Typography>
          </Grid>
          <Grid item>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleGenerateLogs} 
                disabled={generatingLogs}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                {generatingLogs ? 'Generating...' : 'Generate test logs'}
              </Button>
            </motion.div>
          </Grid>
          {localError && (
            <Grid item xs={12}>
              <Paper className="p-3 mt-2 bg-red-50 rounded-md border border-red-200">
                <Typography color="error" className="text-sm">
                  {localError}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </motion.div>
      
      <Grid container spacing={4}>
        {/* Statistics panel */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Paper className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg">
              <Typography variant="h6" className="pb-2 mb-4 font-bold text-gray-800 border-b">Summary</Typography>
              <Box className="space-y-3">
                <div className="flex justify-between items-center px-3 py-2 bg-blue-50 rounded-lg transition-colors duration-200 hover:bg-blue-100">
                  <Typography className="font-medium">Total logs:</Typography>
                  <Typography className="font-bold text-blue-700">{logs.length}</Typography>
                </div>
                
                <div className="flex justify-between items-center px-3 py-2 bg-red-50 rounded-lg transition-colors duration-200 hover:bg-red-100">
                  <Typography className="font-medium">Critical alerts:</Typography>
                  <Typography className="font-bold text-red-700">{getLogCount('critical')}</Typography>
                </div>
                
                <div className="flex justify-between items-center px-3 py-2 bg-orange-50 rounded-lg transition-colors duration-200 hover:bg-orange-100">
                  <Typography className="font-medium">Errors:</Typography>
                  <Typography className="font-bold text-orange-700">{getLogCount('error') + getLogCount('high')}</Typography>
                </div>
                
                <div className="flex justify-between items-center px-3 py-2 bg-yellow-50 rounded-lg transition-colors duration-200 hover:bg-yellow-100">
                  <Typography className="font-medium">Warnings:</Typography>
                  <Typography className="font-bold text-yellow-700">{getLogCount('warning') + getLogCount('medium')}</Typography>
                </div>
                
                <div className="flex justify-between items-center px-3 py-2 bg-green-50 rounded-lg transition-colors duration-200 hover:bg-green-100">
                  <Typography className="font-medium">Information:</Typography>
                  <Typography className="font-bold text-green-700">{getLogCount('info') + getLogCount('low')}</Typography>
                </div>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Logs list */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Paper className="p-6 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg">
              <Typography variant="h6" className="pb-2 mb-4 font-bold text-gray-800 border-b">
                Real-time Logs
              </Typography>
              
              {loading && (
                <div className="flex justify-center items-center h-40">
                  <div className="text-blue-600 animate-pulse">Loading logs...</div>
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <Typography color="error" className="text-center">{error}</Typography>
                </div>
              )}
              
              {!loading && !error && logs.length === 0 && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Typography className="text-center text-gray-500">No logs available</Typography>
                </div>
              )}
              
              {!loading && !error && logs.length > 0 && (
                <LogsList logs={logs} />
              )}
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Charts section */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Paper className="overflow-hidden rounded-xl shadow-md">
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                centered
                indicatorColor="primary"
                textColor="primary"
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b"
              >
                <Tab label="Distribution by Level" className="font-medium" />
                <Tab label="Time Trend" className="font-medium" />
                <Tab label="Distribution by Source" className="font-medium" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {renderCharts()}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;