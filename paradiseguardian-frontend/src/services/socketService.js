import io from 'socket.io-client';

let socket;

/**
 * Inicializa la conexión de Socket.IO con el servidor
 * @returns {Object} La instancia del socket
 */
export const initSocket = () => {
  if (!socket) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    socket = io(API_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Conectado al servidor de WebSockets');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de WebSockets');
    });

    socket.on('connect_error', (error) => {
      console.error('Error de conexión WebSocket:', error);
    });
  }

  return socket;
};

/**
 * Suscribe a un evento de Socket.IO
 * @param {string} event - Nombre del evento
 * @param {Function} callback - Función a ejecutar cuando ocurra el evento
 */
export const subscribeToEvent = (event, callback) => {
  if (!socket) {
    initSocket();
  }
  socket.on(event, callback);
};

/**
 * Cancela la suscripción a un evento
 * @param {string} event - Nombre del evento
 * @param {Function} callback - Función a desuscribir
 */
export const unsubscribeFromEvent = (event, callback) => {
  if (socket) {
    socket.off(event, callback);
  }
};

/**
 * Emite un evento al servidor
 * @param {string} event - Nombre del evento
 * @param {any} data - Datos a enviar
 */
export const emitEvent = (event, data) => {
  if (!socket) {
    initSocket();
  }
  socket.emit(event, data);
};

/**
 * Cierra la conexión de Socket.IO
 */
export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initSocket,
  subscribeToEvent,
  unsubscribeFromEvent,
  emitEvent,
  closeSocket,
};