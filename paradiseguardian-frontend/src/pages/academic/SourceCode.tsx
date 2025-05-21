import React from 'react';
import { Box, Typography, Paper, Container, Button, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Code, Download, GitHub, Archive, Folder, Description } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SourceCode: React.FC = () => {
  const handleDownload = () => {
    // In a real implementation, this would redirect to the ZIP file download
    alert('Downloading compressed source code...');
  };

  // Information about the main directories
  const directories = [
    {
      name: 'Frontend (React/TypeScript)',
      icon: <Folder className="text-blue-500" />,
      items: ['components', 'pages', 'services', 'store', 'hooks', 'context', 'assets']
    },
    {
      name: 'Backend (Node.js)',
      icon: <Folder className="text-green-500" />,
      items: ['config', 'controllers', 'middlewares', 'models', 'routes', 'services']
    },
    {
      name: 'Docker/Configuration',
      icon: <Folder className="text-purple-500" />,
      items: ['Dockerfiles', 'docker-compose.yml', 'setup-database.sql']
    },
    {
      name: 'Utilities',
      icon: <Folder className="text-amber-500" />,
      items: ['scripts', 'tests', 'documentation']
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
            Source Code
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 max-w-3xl mx-auto">
            Here you can access the complete source code of the ParadiseGuardian project, 
            a security monitoring platform developed as the final project for the course.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Download buttons */}
          <Grid item xs={12}>
            <Paper elevation={3} className="border border-indigo-100 rounded-lg overflow-hidden">
              <Box sx={{ p: 3, bgcolor: 'indigo.50' }} className="flex items-center">
                <Code className="mr-2 text-indigo-700" />
                <Typography variant="h6" className="text-indigo-700">
                  Download Source Code
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }} className="flex flex-wrap gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Download />}
                    onClick={handleDownload}
                    className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2"
                  >
                    Download ZIP
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<GitHub />}
                    href="https://github.com/MiltonMenchaca/ParadiseGuardian"
                    target="_blank"
                    className="border-indigo-700 text-indigo-700 hover:bg-indigo-50"
                  >
                    View on GitHub
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </Grid>

          {/* Project structure */}
          <Grid item xs={12}>
            <Paper elevation={3} className="border border-indigo-100 rounded-lg overflow-hidden">
              <Box sx={{ p: 3, bgcolor: 'indigo.50' }} className="flex items-center">
                <Archive className="mr-2 text-indigo-700" />
                <Typography variant="h6" className="text-indigo-700">
                  Project Structure
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {directories.map((dir, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card className="h-full border border-gray-200 hover:shadow-md transition-shadow duration-300">
                        <CardContent>
                          <Typography variant="h6" className="flex items-center text-gray-800 mb-3">
                            {dir.icon}
                            <span className="ml-2">{dir.name}</span>
                          </Typography>
                          
                          <List dense disablePadding>
                            {dir.items.map((item, idx) => (
                              <ListItem key={idx} disablePadding className="py-1">
                                <ListItemIcon className="min-w-0 mr-2">
                                  <Description fontSize="small" className="text-gray-500" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={item} 
                                  primaryTypographyProps={{ className: 'text-gray-700' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default SourceCode; 