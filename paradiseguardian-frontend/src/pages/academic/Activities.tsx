import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider, Container } from '@mui/material';
import { CheckCircle, School } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Activities: React.FC = () => {
  // List of activities performed during the course
  const activities = [
    {
      title: 'Sprint 1: Initial Setup and Design',
      description: 'Development environment configuration, creation of basic project structure, and user interface design.'
    },
    {
      title: 'Sprint 2: Backend and Database',
      description: 'Implementation of the REST API, PostgreSQL/TimescaleDB database configuration, and authentication development.'
    },
    {
      title: 'Sprint 3: Frontend and Backend Connection',
      description: 'Development of React components, integration with the backend using Axios, and Socket.IO configuration for real-time updates.'
    },
    {
      title: 'Sprint 4: Real-time Monitoring',
      description: 'Implementation of the real-time monitoring dashboard, log visualization, and notifications.'
    },
    {
      title: 'Sprint 5: Optimization and Deployment',
      description: 'Performance optimization, Docker configuration, and application deployment in a production environment.'
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
            Course Activities
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            The culmination of a process brings with it the result of work performed in various stages, 
            where practice is the most important aspect for learning to lead to significant personal 
            and professional development.
          </Typography>
        </Box>

        <Paper elevation={3} className="border border-indigo-100 rounded-lg overflow-hidden">
          <Box sx={{ p: 3, bgcolor: 'indigo.50' }}>
            <Typography variant="h6" className="flex items-center text-indigo-700">
              <School className="mr-2" /> SCRUM Methodology
            </Typography>
            <Typography variant="body2" className="mt-2 text-gray-700">
              SCRUM has become a current process for efficient application development, 
              and its effectiveness is being demonstrated in the field of systems development 
              and the existing job market.
            </Typography>
          </Box>
          
          <Divider />
          
          <List disablePadding>
            {activities.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start" className={index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}>
                  <ListItemIcon>
                    <CheckCircle className="text-green-600" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" className="font-semibold text-indigo-800">
                        {activity.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" className="text-gray-700 mt-1">
                        {activity.description}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < activities.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Activities; 