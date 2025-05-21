import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" paragraph>
          La página que estás buscando no existe o ha sido movida.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;