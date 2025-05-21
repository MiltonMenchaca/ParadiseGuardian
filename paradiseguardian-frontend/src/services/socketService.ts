import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { addLog } from '../store/slices/logsSlice';
import { SecurityLog } from '../types';

class SocketService {
  private socket: Socket | null = null;
  private readonly serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  connect(): void {
    if (this.socket) return;

    this.socket = io(this.serverUrl);

    this.socket.on('connect', () => {
      console.log('Conectado al servidor de WebSockets');
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de WebSockets');
    });

    // Escuchar nuevos logs en tiempo real
    this.socket.on('newLog', (log: SecurityLog) => {
      console.log('Nuevo log recibido:', log);
      store.dispatch(addLog(log));
    });
  }

  disconnect(): void {
    if (!this.socket) return;
    
    this.socket.disconnect();
    this.socket = null;
    console.log('Desconectado manualmente del servidor de WebSockets');
  }
}

// Exportar una instancia única del servicio
export const socketService = new SocketService();