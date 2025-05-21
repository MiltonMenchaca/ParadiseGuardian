# ParadiseGuardian

ParadiseGuardian is a Real-Time Security Monitoring Dashboard designed to help security teams (Blue Teams) monitor and analyze security events in their technological infrastructure.

## Objective

Develop a platform that allows monitoring logs in real-time, visualizing security metrics, and managing critical events for system protection.

## Technologies Used

### Frontend
- React - Interactive and responsive user interface.
- Material-UI - Styled components for an attractive design.
- TailwindCSS - Custom styles for design flexibility.
- Axios - Communication with the backend via REST API.
- Redux Toolkit - Efficient global state management.
- Socket.IO - Real-time communication with WebSockets.

### Backend
- Node.js + Express - Fast and efficient server.
- Sequelize - ORM for managing PostgreSQL/TimescaleDB database.
- PostgreSQL + TimescaleDB - Database optimized for real-time security logs.
- JWT - User security and authentication.
- bcrypt.js - Password encryption.
- Socket.IO - Real-time security event notifications.

## Project Structure

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
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
│
│── README.md
```

## Installation and Configuration

### Prerequisites
1. Node.js v16+
2. PostgreSQL with TimescaleDB
3. Docker (Optional for quick deployment)

### Clone the Repository
```bash
git clone https://github.com/MiltonMenchaca/ParadiseGuardian.git
cd ParadiseGuardian
```

### Configure the Backend
```bash
cd paradiseguardian-backend
npm install
```

Configure `.env` in `paradiseguardian-backend/.env`:
```
DB_URL=postgres://admin:admin@localhost:5432/paradiseguardian
JWT_SECRET=supersecret
REFRESH_SECRET=another_even_longer_secret
```

Start the backend:
```bash
npm run dev
```

### Configure the Frontend
```bash
cd ../paradiseguardian-frontend
npm install
npm start
```

## Main Features

- User Authentication (JWT + Refresh Tokens)
- Real-Time Monitoring with WebSockets
- Log Visualization in an Interactive Dashboard
- Dynamic Security Charts
- Optimized Storage with TimescaleDB
- Infrastructure ready for Docker and production deployment
- Academic resources for cybersecurity learning and documentation

## Main API Endpoints

### Authentication (`/api/auth`)
| Method | Route      | Description               |
|--------|------------|---------------------------|
| POST   | /register  | Register a new user       |
| POST   | /login     | Login and generate JWT tokens |

### Security Logs (`/api/logs`)
| Method | Route      | Description               |
|--------|------------|---------------------------|
| POST   | /          | Create a new log          |
| GET    | /          | Get recent logs           |

## Deployment with Docker

### Create a `docker-compose.yml` file
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

### Run with Docker
```bash
docker-compose up --build
```

## Future Enhancements

For detailed information about our planned integrations with SIEM platforms, security tools, and infrastructure improvements, please refer to the [implementation.md](implementation.md) file.

## Contributions

Contributions are welcome. To collaborate:
1. Fork the repository.
2. Create a branch (`git checkout -b feature-new-functionality`).
3. Make changes and commit (`git commit -m "Description of the change"`).
4. Send a pull request.

## License

This project is under the MIT license.

GitHub Repository: [ParadiseGuardian](https://github.com/MiltonMenchaca/ParadiseGuardian)