# 📋 Sistema de Gestión de Usuarios

Sistema CRUD gestión de usuarios desarrollado con Node.js, Express, PostgreSQL y Angular.

## 📑 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Autor](#autor)

## 📝 Descripción

Este proyecto es una aplicación web que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos de usuarios. Cuenta con un backend robusto desarrollado en Node.js y un frontend moderno en Angular con diseño responsivo.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js v5.1.0** - Framework web
- **PostgreSQL** - Base de datos
- **pg v8.16.3** - Cliente de PostgreSQL para Node.js
- **CORS v2.8.5** - Manejo de políticas CORS

### Frontend
- **Angular** - Framework frontend
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Iconografía
- **RxJS** - Programación reactiva

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- [Angular CLI](https://angular.io/cli) 
- Un editor de código (VS Code, WebStorm, etc.)

## 📥 Instalación

### 1. Clonar o descargar el proyecto

```bash
# Si tienes Git instalado
git clone <url-del-repositorio>

# O simplemente descarga y descomprime el ZIP del proyecto
```

### 2. Instalar dependencias del Backend

```bash
# Asegúrate de entrar y estar en la carpeta backend y ejecuta en el terminal 
npm install
```

### 3. Instalar dependencias del Frontend

```bash
# Navega a la carpeta del frontend y ejecuta en el terminal
npm install
```

## 🗄️ Configuración de la Base de Datos

### 1. Crear la base de datos en PostgreSQL

Abre tu cliente de PostgreSQL (pgAdmin, psql, DBeaver, etc.) y ejecuta:

```sql
CREATE DATABASE node_test;
```

### 2. Crear la tabla de usuarios

Conéctate a la base de datos `node_test` y ejecuta:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    edad INTEGER NOT NULL CHECK (edad > 0 AND edad < 150)
);
```

### 3. Insertar datos de prueba (opcional)

```sql
INSERT INTO usuarios (nombre, correo, edad) VALUES
('Juan Pérez', 'juan.perez@email.com', 25),
('María García', 'maria.garcia@email.com', 30),
('Carlos López', 'carlos.lopez@email.com', 28);
```

### 4. Configurar la conexión en el Backend

Abre el archivo `db.js` y verifica/ajusta las credenciales de conexión:

```javascript
const pool = new Pool({
    host: "localhost",      // Cambiar si tu BD está en otro servidor
    port: 5432,             // Puerto por defecto de PostgreSQL
    database: "node_test",  // Nombre de tu base de datos
    user: "postgres",       // Tu usuario de PostgreSQL
    password: "1234"        // Tu contraseña de PostgreSQL
});
```

## 🚀 Ejecución del Proyecto

### Iniciar el Backend (API)

1. Abre una terminal en la carpeta raíz del proyecto backend
2. Ejecuta:

```bash
node server.js
```

Deberías ver el mensaje:
```
Conectado a PostgreSQL correctamente
Servidor corriendo en http://localhost:3000
```

### Iniciar el Frontend (Angular)

1. Abre otra terminal en la carpeta del frontend
2. Ejecuta:

```bash
# Con Angular CLI instalado globalmente
ng serve

# O usando npm
npm start
```

3. Abre tu navegador en: `http://localhost:4200`

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/
│   ├── db.js              # Configuración de PostgreSQL
│   ├── routes.js          # Rutas de la API
│   ├── server.js          # Servidor principal
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   └── usuarios-list/
    │   │   │       ├── usuarios-list.ts
    │   │   │       ├── usuarios-list.html
    │   │   │       └── usuarios-list.css
    │   │   ├── services/
    │   │   │   └── usuario.service.ts
    │   │   ├── app.config.ts
    │   │   └── app.routes.ts
    │   └── ...
    ├── package.json
    └── angular.json
```

## 🔌 API Endpoints

### Base URL: `http://localhost:3000`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/data` | Obtener todos los usuarios |
| GET | `/api/data/:id` | Obtener un usuario por ID |
| POST | `/api/data` | Crear un nuevo usuario |
| PATCH | `/api/data/:id` | Actualizar un usuario |
| DELETE | `/api/data/:id` | Eliminar un usuario |

### Ejemplos de uso

#### Crear usuario (POST)
```json
POST http://localhost:3000/api/data
Content-Type: application/json

{
  "nombre": "Ana Martínez",
  "correo": "ana.martinez@email.com",
  "edad": 27
}
```

#### Actualizar usuario (PATCH)
```json
PATCH http://localhost:3000/api/data/1
Content-Type: application/json

{
  "nombre": "Ana Martínez Pérez",
  "edad": 28
}
```

## 🎨 Características del Frontend

- ✅ Interfaz moderna y responsiva con Bootstrap 5
- ✅ Validación de formularios en tiempo real
- ✅ Validación de formato de correo electrónico
- ✅ Modales para crear y editar usuarios
- ✅ Confirmación antes de eliminar
- ✅ Mensajes de éxito y error
- ✅ Estados de carga y errores
- ✅ Diseño con gradientes y animaciones suaves
- ✅ Estadísticas en tiempo real

## 🐛 Solución de Problemas

### El backend no se conecta a PostgreSQL

- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `db.js`
- Confirma que la base de datos `node_test` existe

### Error de CORS en el frontend

- Asegúrate de que el backend esté corriendo en `http://localhost:3000`
- Verifica que CORS esté habilitado en `server.js`

### El frontend no se conecta al backend

- Confirma que el backend esté corriendo
- Revisa la URL de la API en el servicio de Angular
- Verifica que no haya firewalls bloqueando el puerto 3000

## 👨‍💻 Autor

**Nicolas Moreno**

---

## 📄 Licencia

ISC

---
