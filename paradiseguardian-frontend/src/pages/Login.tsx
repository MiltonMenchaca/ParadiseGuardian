import { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Redirige al dashboard después del login exitoso
    } catch {
      setError("Credenciales incorrectas, intenta nuevamente.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="p-6 mt-10">
        <Typography variant="h5" align="center" className="mb-4">
          Iniciar Sesión
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Ingresar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
