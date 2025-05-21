-- Crear la base de datos
CREATE DATABASE paradiseguardian;

-- Conectar a la base de datos
\c paradiseguardian

-- Habilitar la extensión TimescaleDB
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Crear el esquema para las tablas
CREATE SCHEMA IF NOT EXISTS public;

-- Crear el usuario admin si no existe
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
      CREATE USER admin WITH PASSWORD 'admin';
   END IF;
END
$$;

-- Asignar privilegios a admin
GRANT ALL PRIVILEGES ON DATABASE paradiseguardian TO admin;
GRANT ALL PRIVILEGES ON SCHEMA public TO admin; 