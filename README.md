# Proyecto Deadpan

Aplicación web para diseño y personalización de camisetas.

## Estructura del Proyecto

Este repositorio contiene una aplicación Full-Stack estructurada en tres carpetas principales:

- **`/frontend`**: Interfaz de usuario construida con React y Vite.
- **`/backend`**: Servidor que maneja la lógica de negocio (Node.js).
- **`/database`**: Archivos y scripts para la base de datos SQL.

## Requisitos Previos

Asegúrate de tener instalado en tu computadora:
- [Node.js](https://nodejs.org/) (incluye `npm`).
- Algún gestor de bases de datos si requieres levantar el backend localmente (ej. MySQL/PostgreSQL, según la configuración).

---

## Cómo ejecutar el proyecto en tu computadora

### 1. Levantar el Frontend (Página Web)

1. Abre una terminal y muévete a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala todas las dependencias necesarias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Verás en la consola una dirección (generalmente `http://localhost:5173`). Haz clic o ábrela en tu navegador para ver la página.

### 2. Levantar el Backend (Servidor)

*(Si el proyecto tiene dependencias en el backend)*

1. Abre otra terminal y muévete a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm run start
   ```
*(Nota: revisa si necesitas configurar un archivo `.env` dentro de la carpeta `backend` con las credenciales de tu base de datos).*
