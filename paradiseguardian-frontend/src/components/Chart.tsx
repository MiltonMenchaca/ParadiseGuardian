import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import { SecurityLog, SeverityLevel } from '../types';
import { motion } from 'framer-motion';

// Interfaz para las props del componente
interface ChartProps {
  data: SecurityLog[];
  type?: 'bar' | 'line' | 'pie';
  title?: string;
  height?: number;
}

// Colores para los diferentes niveles de logs
const COLORS = {
  info: '#2196f3',
  warning: '#ff9800',
  error: '#f44336',
  critical: '#d32f2f',
  debug: '#9e9e9e',
  low: '#2196f3',
  medium: '#ff9800',
  high: '#f44336'
};

const Chart: React.FC<ChartProps> = ({ data, type = 'bar', title = 'Gráfico de Logs', height = 300 }) => {
  // Verificar si tenemos datos
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Paper className="p-4 rounded-xl shadow-md">
        <Typography variant="h6" gutterBottom className="text-lg font-medium text-gray-800">{title}</Typography>
        <Box className="mt-4">
          <Typography className="text-gray-500">No hay datos suficientes para mostrar</Typography>
        </Box>
      </Paper>
    );
  }

  // Función para obtener el nivel del log (ya sea level o severity)
  const getLevel = (log: SecurityLog): string => {
    // Consideramos tanto 'level' como 'severity' para compatibilidad
    return (log.level || log.severity || 'info').toLowerCase();
  };

  // Función para obtener datos agrupados por nivel
  const getLevelCounts = () => {
    const counts: Record<string, number> = {
      info: 0,
      warning: 0,
      error: 0,
      critical: 0,
      debug: 0,
      low: 0,
      medium: 0,
      high: 0
    };
    
    data.forEach(log => {
      const level = getLevel(log);
      if (Object.prototype.hasOwnProperty.call(counts, level)) {
        counts[level]++;
      }
    });
    
    return Object.keys(counts)
      .filter(key => counts[key] > 0) // Filtrar niveles sin logs
      .map(key => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: counts[key],
        fill: COLORS[key as keyof typeof COLORS] || '#9e9e9e'
      }));
  };
  
  // Datos para gráficos temporales
  const getTimeSeriesData = () => {
    // Agrupar logs por hora
    const hourCounts: Record<string, Record<string, any>> = {};
    data.forEach(log => {
      if (!log.timestamp) return;
      
      const date = new Date(log.timestamp);
      if (isNaN(date.getTime())) return; // Skip invalid dates
      
      const hour = date.getHours();
      const hourStr = `${hour}:00`;
      const level = getLevel(log);
      
      if (!hourCounts[hourStr]) {
        hourCounts[hourStr] = {
          hour: hourStr,
          info: 0,
          warning: 0,
          error: 0,
          critical: 0,
          debug: 0,
          low: 0,
          medium: 0,
          high: 0
        };
      }
      
      hourCounts[hourStr][level]++;
    });
    
    return Object.values(hourCounts).sort((a, b) => {
      const aHour = parseInt(a.hour.split(':')[0]);
      const bHour = parseInt(b.hour.split(':')[0]);
      return aHour - bHour;
    });
  };
  
  const renderChart = () => {
    // Si no hay datos después de procesar, mostrar mensaje
    const levelCounts = getLevelCounts();
    const timeSeriesData = getTimeSeriesData();
    
    if (levelCounts.length === 0 && type !== 'line') {
      return <Typography className="text-gray-500">No hay datos suficientes para mostrar</Typography>;
    }
    
    if (timeSeriesData.length === 0 && type === 'line') {
      return <Typography className="text-gray-500">No hay datos de tiempo suficientes para mostrar</Typography>;
    }
    
    switch (type) {
      case 'bar':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <ResponsiveContainer width="100%" height={height}>
              <BarChart data={levelCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" className="hover:filter hover:brightness-110 transition-all duration-300">
                  {levelCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        );
      
      case 'line':
        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <ResponsiveContainer width="100%" height={height}>
              <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="low" stroke={COLORS.low} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="medium" stroke={COLORS.medium} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="high" stroke={COLORS.high} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="critical" stroke={COLORS.critical} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        );
      
      case 'pie':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  data={levelCounts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  className="hover:filter hover:brightness-110 transition-all duration-300"
                >
                  {levelCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-90" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        );
      
      default:
        return <Typography>Tipo de gráfico no soportado</Typography>;
    }
  };
  
  return (
    <motion.div 
      whileHover={{ 
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.3 }}
    >
      <Paper className="p-4 rounded-xl shadow-md">
        <Typography variant="h6" gutterBottom className="text-lg font-medium text-gray-800">{title}</Typography>
        <Box className="mt-4">
          {renderChart()}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Chart; 