import React from 'react';
import { Box, Typography, Paper, Container, Link, Grid, Card, CardContent, Chip, Divider } from '@mui/material';
import { BugReport, Storage, Code, CheckCircle, Warning } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ModificationsReport: React.FC = () => {
  // List of modifications made
  const modifications = [
    {
      date: '05/15/2023',
      title: 'Port Correction',
      description: 'Fixed the discrepancy between the port used in the backend (5001) and the port the frontend was trying to connect to (5000).',
      icon: <Warning className="text-amber-500" />,
      color: 'amber'
    },
    {
      date: '05/17/2023',
      title: 'Database Configuration Improvement',
      description: 'Updated the database configuration to properly handle special characters.',
      icon: <Storage className="text-blue-500" />,
      color: 'blue'
    },
    {
      date: '05/19/2023',
      title: 'Frontend Dockerfile Update',
      description: 'Modified the Dockerfile to explicitly install missing dependencies: tailwindcss-animate and daisyui.',
      icon: <Code className="text-indigo-500" />,
      color: 'indigo'
    },
    {
      date: '05/21/2023',
      title: 'Documentation Creation',
      description: 'Created detailed documentation files, including a Markdown report and a Python script to convert it to Word format.',
      icon: <CheckCircle className="text-green-500" />,
      color: 'green'
    },
    {
      date: '05/23/2023',
      title: 'Code Translation',
      description: 'Performed a complete review to translate the entire project from Spanish to English, modifying files such as server.js, database.js, and other key components.',
      icon: <BugReport className="text-purple-500" />,
      color: 'purple'
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
            Modifications Report
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 max-w-3xl mx-auto">
            During the development of the ParadiseGuardian project, several modifications and improvements 
            were made to ensure optimal system performance. Below are the main updates implemented.
          </Typography>
        </Box>

        <Paper elevation={3} className="border border-indigo-100 rounded-lg p-4">
          <Grid container spacing={3}>
            {modifications.map((mod, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  className={`border-l-4 border-${mod.color}-500 hover:shadow-md transition-shadow duration-300`}
                  sx={{ position: 'relative' }}
                >
                  <CardContent className="pl-4">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={2} md={1} className="flex items-center justify-center">
                        <Box className={`p-2 rounded-full bg-${mod.color}-100 flex items-center justify-center`}>
                          {mod.icon}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={10} md={11}>
                        <Box className="flex flex-wrap items-center justify-between mb-2">
                          <Typography variant="h6" className={`text-${mod.color}-700 font-medium`}>
                            {mod.title}
                          </Typography>
                          <Chip 
                            label={mod.date} 
                            size="small" 
                            variant="outlined" 
                            className={`bg-${mod.color}-50 text-${mod.color}-800`} 
                          />
                        </Box>
                        <Typography variant="body2" className="text-gray-700">
                          {mod.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {index < modifications.length - 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                    <Box sx={{ borderLeft: '2px dashed #e0e0e0', height: '20px' }} />
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
          
          <Divider className="my-4" />
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" className="text-gray-600">
              For more details on the modifications, check the 
              <Link href="https://github.com/MiltonMenchaca/ParadiseGuardian" target="_blank" className="mx-1 text-indigo-600 hover:text-indigo-800">
                GitHub repository
              </Link>
              or the complete report in docx format.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ModificationsReport; 