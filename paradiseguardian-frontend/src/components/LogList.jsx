import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const LogList = ({ logs }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Manejar cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtrar logs según término de búsqueda
  const filteredLogs = logs.filter((log) => {
    return (
      log.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.severity?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Obtener color según severidad
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'primary';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar en logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="tabla de logs">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Severidad</TableCell>
              <TableCell>Fuente</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>IP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log, index) => (
                <TableRow key={log.id || index} hover>
                  <TableCell>{formatDate(log.timestamp)}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.severity || 'N/A'}
                      color={getSeverityColor(log.severity)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{log.source || 'N/A'}</TableCell>
                  <TableCell>{log.message || 'N/A'}</TableCell>
                  <TableCell>{log.ip_address || 'N/A'}</TableCell>
                </TableRow>
              ))}
            {filteredLogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No se encontraron logs
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />
    </Box>
  );
};

export default LogList;