# ParadiseGuardian

ParadiseGuardian es un Dashboard de Monitoreo de Seguridad en Tiempo Real diseñado para ayudar a los equipos de seguridad (Blue Teams) a supervisar y analizar eventos de seguridad en su infraestructura tecnológica.

## Objetivo

Desarrollar una plataforma que permita monitorear logs en tiempo real, visualizar métricas de seguridad y gestionar eventos críticos para la protección de sistemas.

## Tecnologías Utilizadas

### Frontend
- React - Interfaz de usuario interactiva y responsiva.
- Material-UI - Componentes estilizados para un diseño atractivo.
- TailwindCSS - Estilos personalizados para flexibilidad en el diseño.
- Axios - Comunicación con el backend vía API REST.
- Redux Toolkit - Manejo eficiente del estado global de la aplicación.
- Socket.IO - Comunicación en tiempo real con WebSockets.

### Backend
- Node.js + Express - Servidor rápido y eficiente.
- Sequelize - ORM para gestionar la base de datos PostgreSQL/TimescaleDB.
- PostgreSQL + TimescaleDB - Base de datos optimizada para logs de seguridad en tiempo real.
- JWT - Seguridad y autenticación de usuarios.
- bcrypt.js - Encriptación de contraseñas.
- Socket.IO - Notificaciones en tiempo real de eventos de seguridad.

## Estructura del Proyecto

```
ParadiseGuardian/
│── paradiseguardian-backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── logs/
│   ├── .env
│   ├── package.json
│   ├── server.js
│
│── paradiseguardian-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
│
│── README.md
```

## Instalación y Configuración

### Requisitos Previos
1. Node.js v16+
2. PostgreSQL con TimescaleDB
3. Docker (Opcional para despliegue rápido)

### Clonar el Repositorio
```bash
git clone https://github.com/MiltonMenchaca/ParadiseGuardian.git
cd ParadiseGuardian
```

### Configurar el Backend
```bash
cd paradiseguardian-backend
npm install
```

Configurar `.env` en `paradiseguardian-backend/.env`:
```
DB_URL=postgres://admin:admin@localhost:5432/paradiseguardian
JWT_SECRET=supersecreto
REFRESH_SECRET=otro_secreto_aun_mas_largo
```

Iniciar el backend:
```bash
npm run dev
```

### Configurar el Frontend
```bash
cd ../paradiseguardian-frontend
npm install
npm start
```

## Funcionalidades Principales

- Autenticación de Usuarios (JWT + Refresh Tokens)
- Monitoreo en Tiempo Real con WebSockets
- Visualización de Logs en un Dashboard Interactivo
- Gráficos Dinámicos de Seguridad
- Almacenamiento Optimizado con TimescaleDB
- Infraestructura lista para Docker y despliegue en producción

## API Endpoints Principales

### Autenticación (`/api/auth`)
| Método | Ruta        | Descripción               |
|--------|------------|---------------------------|
| POST   | /register  | Registra un nuevo usuario |
| POST   | /login     | Inicia sesión y genera tokens JWT |

### Logs de Seguridad (`/api/logs`)
| Método | Ruta       | Descripción              |
|--------|-----------|--------------------------|
| POST   | /         | Crea un nuevo log        |
| GET    | /         | Obtiene logs recientes   |

## Despliegue con Docker

### Crear un archivo `docker-compose.yml`
```yaml
version: '3.8'
services:
  database:
    image: timescale/timescaledb:latest-pg15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: paradiseguardian
    ports:
      - "5432:5432"
  backend:
    build: ./paradiseguardian-backend
    ports:
      - "5000:5000"
    depends_on:
      - database
  frontend:
    build: ./paradiseguardian-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### Ejecutar con Docker
```bash
docker-compose up --build
```

## Contribuciones

Las contribuciones son bienvenidas. Para colaborar:
1. Haz un fork del repositorio.
2. Crea una rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza cambios y haz commit (`git commit -m "Descripción del cambio"`).
4. Envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.

Repositorio en GitHub: [ParadiseGuardian](https://github.com/MiltonMenchaca/ParadiseGuardian)