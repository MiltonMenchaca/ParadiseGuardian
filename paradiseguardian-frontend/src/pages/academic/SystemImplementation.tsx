import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Divider, Container, Chip } from '@mui/material';
import { Storage, Security, Speed, Code, Devices } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SystemImplementation: React.FC = () => {
  // Information about the technologies used
  const technologies = [
    {
      title: 'Frontend',
      icon: <Devices className="text-4xl text-blue-600" />,
      items: ['React', 'TypeScript', 'Material-UI', 'TailwindCSS', 'Redux Toolkit', 'Socket.IO Client', 'Vite']
    },
    {
      title: 'Backend',
      icon: <Code className="text-4xl text-green-600" />,
      items: ['Node.js', 'Express', 'Sequelize', 'JWT', 'Socket.IO', 'Bcrypt.js']
    },
    {
      title: 'Database',
      icon: <Storage className="text-4xl text-purple-600" />,
      items: ['PostgreSQL', 'TimescaleDB']
    },
    {
      title: 'Deployment',
      icon: <Speed className="text-4xl text-red-600" />,
      items: ['Docker', 'Docker Compose']
    }
  ];

  // Main features of the system
  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Visualization of security logs in real-time using WebSockets.'
    },
    {
      title: 'Secure Authentication',
      description: 'Authentication system with JWT and refresh tokens for enhanced security.'
    },
    {
      title: 'Optimized Database',
      description: 'TimescaleDB for efficient storage and querying of time-series data.'
    },
    {
      title: 'Intuitive Interface',
      description: 'Dashboard with interactive charts and data tables to visualize security events.'
    },
    {
      title: 'Containerization',
      description: 'Implementation with Docker to facilitate deployment and scalability.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" className="text-indigo-800 font-bold mb-2">
            Implemented System
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 max-w-3xl mx-auto">
            ParadiseGuardian is a Real-Time Security Monitoring Dashboard designed to help 
            security teams (Blue Teams) monitor and analyze security events in their 
            technology infrastructure.
          </Typography>
        </Box>

        {/* System Architecture */}
        <Paper elevation={3} className="border border-indigo-100 rounded-lg overflow-hidden mb-6">
          <Box sx={{ p: 3, bgcolor: 'indigo.50' }}>
            <Typography variant="h6" className="flex items-center text-indigo-700">
              <Security className="mr-2" /> System Architecture
            </Typography>
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {technologies.map((tech, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card className="h-full border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent>
                      <Box className="flex justify-center mb-3">
                        {tech.icon}
                      </Box>
                      <Typography variant="h6" className="text-center font-medium text-gray-800 mb-3">
                        {tech.title}
                      </Typography>
                      <Divider className="my-2" />
                      <Box className="flex flex-wrap gap-1 justify-center mt-3">
                        {tech.items.map((item, idx) => (
                          <Chip 
                            key={idx} 
                            label={item} 
                            size="small" 
                            variant="outlined" 
                            className="m-1"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>

        {/* Main Features */}
        <Paper elevation={3} className="border border-indigo-100 rounded-lg overflow-hidden">
          <Box sx={{ p: 3, bgcolor: 'indigo.50' }}>
            <Typography variant="h6" className="flex items-center text-indigo-700">
              <Speed className="mr-2" /> Main Features
            </Typography>
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card className="h-full border border-gray-100 hover:bg-gray-50 transition-colors duration-300">
                    <CardContent>
                      <Typography variant="h6" className="text-indigo-700 font-medium mb-2">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-700">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default SystemImplementation; 