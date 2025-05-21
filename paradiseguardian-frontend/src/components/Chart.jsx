import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Box, Typography, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = ({ stats }) => {
  // Datos para el gráfico de barras
  const barChartData = {
    labels: ['Crítico', 'Alto', 'Medio', 'Bajo', 'Info'],
    datasets: [
      {
        label: 'Eventos por Severidad',
        data: [stats.critical, stats.high, stats.medium, stats.low, stats.info],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Crítico - Rojo
          'rgba(255, 159, 64, 0.6)',  // Alto - Naranja
          'rgba(54, 162, 235, 0.6)',   // Medio - Azul
          'rgba(75, 192, 192, 0.6)',   // Bajo - Verde azulado
          'rgba(201, 203, 207, 0.6)',  // Info - Gris
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico circular
  const pieChartData = {
    labels: ['Crítico', 'Alto', 'Medio', 'Bajo', 'Info'],
    datasets: [
      {
        data: [stats.critical, stats.high, stats.medium, stats.low, stats.info],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Crítico - Rojo
          'rgba(255, 159, 64, 0.6)',  // Alto - Naranja
          'rgba(54, 162, 235, 0.6)',   // Medio - Azul
          'rgba(75, 192, 192, 0.6)',   // Bajo - Verde azulado
          'rgba(201, 203, 207, 0.6)',  // Info - Gris
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico de barras
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Eventos por Severidad',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Solo mostrar números enteros
        },
      },
    },
  };

  // Opciones para el gráfico circular
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Proporción de Eventos',
      },
    },
  };

  // Calcular el total de eventos
  const totalEvents = Object.values(stats).reduce((acc, val) => acc + val, 0);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Métricas de Seguridad
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total de eventos: {totalEvents}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Bar data={barChartData} options={barOptions} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Pie data={pieChartData} options={pieOptions} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chart;