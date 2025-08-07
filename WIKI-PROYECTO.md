# Fase 1: Preparación y Configuración

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js LTS**: [https://nodejs.org/](https://nodejs.org/)
- **Visual Studio Code**: [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Extensiones recomendadas:
    * ESLint
    * Prettier
    * DotENV
    * REST Client o Thunder Client
- **Postman** o herramienta de testing de APIs (alternativas: Insomnia, Thunder Client)

## Estructura de carpetas

```bash
mern-thinkboard/
├── backend/                     # Lógica del servidor y API
│   ├── src/
│   │   ├── config/             # Configuración de la base de datos y servicios externos
│   │   ├── controllers/        # Funciones que manejan la lógica de las rutas
│   │   ├── middleware/         # Middlewares personalizados (auth, errores, etc.)
│   │   ├── models/             # Esquemas de Mongoose para MongoDB
│   │   ├── routes/             # Definición de rutas de la API
│   │   ├── utils/              # Funciones auxiliares reutilizables
│   │   └── app.js              # Punto de entrada de la aplicación Express
│   ├── .env                    # Variables de entorno (no se sube al repo)
│   ├── .env.EXAMPLE            # Ejemplo de configuración para desarrollo
│   ├── package.json            # Dependencias y scripts del backend
│   └── package-lock.json       # Archivo de bloqueo de dependencias
├── frontend/                   # Aplicación cliente en React
│   ├── public/                 # Archivos estáticos públicos (index.html, favicon, etc.)
│   └── src/
│       ├── assets/             # Imágenes, íconos y otros recursos visuales
│       ├── components/         # Componentes reutilizables de la interfaz
│       ├── hooks/              # Custom hooks de React
│       ├── pages/              # Vistas principales de la aplicación
│       ├── services/           # Funciones para interactuar con la API
│       └── utils/              # Funciones auxiliares del frontend
├── .gitignore                  # Archivos y carpetas que Git debe ignorar
├── README.md                   # Documentación del proyecto
└── WIKI.md                     # Documentación técnica y notas de desarrollo
```

### Raíz del Proyecto (mern-thinkboard/)

- `.gitignore`: evita subir archivos sensibles o innecesarios (como node_modules, .env, etc.).
- `README.md`: presentación general del proyecto, cómo instalarlo y ejecutarlo.
- `WIKI.md`: documentación técnica, decisiones de arquitectura, glosario, dudas frecuentes.

### Backend (backend/)

`src/`

| Carpeta / Archivo	| Propósito |
| -----------------	|----------	|
| `config/`	| Conexión a MongoDB, configuración de servicios externos (ej. Redis, JWT). |
| `controllers/`	| Lógica de negocio para cada ruta (CRUD, validaciones, etc.). |
| `middleware/`	| Funciones que interceptan peticiones (auth, manejo de errores, rate limiting). |
| `models/`	| Esquemas de Mongoose que definen la estructura de tus datos. |
| `routes/`	| Define los endpoints y conecta con los controladores. |
| `utils/`	| Funciones auxiliares como formateadores, generadores de tokens, etc. |
| `app.js`	| Configura Express, aplica middleware, monta rutas y exporta la app. |

### Archivos raíz

- `.env`: variables sensibles como claves API, URI de MongoDB, etc.
- `.env.EXAMPLE`: plantilla para que otros desarrolladores configuren su entorno.
- `package.json`: dependencias, scripts (dev, start, lint, etc.).
- `package-lock.json`: asegura versiones exactas de dependencias.

### Frontend (frontend/)

`public/`

- `index.html`: punto de entrada de la app React.
- `favicon.ico`, manifest.json: configuración visual y PWA.

`src/`

| Carpeta / Archivo	| Propósito |
|------------------	| ---------	|
| `assets/`	| Imágenes, íconos, fuentes. |
| `components/`	| Botones, formularios, tarjetas reutilizables. |
| `hooks/`	| Custom hooks como useFetch, useAuth, etc. |
| `pages/`	| Vistas como HomePage, CreatePage, DetailPage. |
| `services/`	| Funciones para interactuar con la API usando Axios. |
| `utils/`	| Validaciones, formateadores, helpers de UI. |

## Inicialización del Backend

### Paso 1: Inicializar Node.js

En la carpeta `backend/`, ejecutar:

```bash
npm init -y
```

Esto genera el archivo `package.json` con la configuración base.

### Paso 2: Usar Módulos ES

En `package.json`, añadir:

```json
"type": "module"
```

Esto permite usar `import` y `export` en lugar de `require()`.

## Dependencias Backend

### Instalar Express y dotenv:

```bash
npm install express dotenv
```

### Instalar nodemon como dependencia de desarrollo:

```bash
npm install --save-dev nodemon
```

### Código base en `src/index.js`

```js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API funcionando ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
```

### Variables de entorno (`.env`):

```
PORT=3000
```

### Ignorar archivos innecesarios (`.gitignore`):

```
node_modules/
.env
```

### Script en `package.json` para usar nodemon:

```json
"scripts": {
  "dev": "nodemon src/index.js"
}
```

---

Listo. El backend ahora puede iniciarse con:

```bash
npm run dev
```

Y abrirá el servidor en `http://localhost:3000/`.

# Fase 2: API RESTful

## Backend - Rutas de la API (noteRouter.js)

## Archivo: `noteRouter.js`

Este archivo define las rutas de la API para todas las operaciones relacionadas con notas. Cada ruta está asociada a un controlador definido en `noteController.js`.

## 🔄 Mapa de rutas

## Descripción de Rutas

| Método | Ruta  | Controlador   | Descripción                                  | Códigos de Respuesta                         |
| ------ | ----- | ------------- | -------------------------------------------- | -------------------------------------------- |
| GET    | `/`   | getNotes      | Obtiene todas las notas                      | 200 (OK), 500 (Error interno)               |
| GET    | `/:id`| getNotesById  | Obtiene una nota por su ID                   | 200 (OK), 404 (No encontrado), 500          |
| POST   | `/`   | createNote    | Crea una nueva nota                          | 201 (Creado), 400 (Bad Request), 500        |
| PUT    | `/:id`| updateNote    | Actualiza título/contenido de una nota       | 200 (OK), 404 (No encontrado), 500          |
| DELETE | `/:id`| deleteNote    | Elimina una nota por su ID                   | 204 (No Content), 404 (No encontrado), 500  |

---

## 🧩 Código completo del archivo `noteRouter.js`

```js
/**
 * @file noteRouter.js
 * @brief Define las rutas de la API para las notas.
 * @details Asocia métodos HTTP con funciones del controlador para operaciones CRUD.
 */

import express from 'express';
import {
  getNotes,
  getNotesById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js';

const router = express.Router();

// Obtener todas las notas
router.get("/", getNotes);

// Obtener una nota por ID
router.get("/:id", getNotesById);

// Crear nueva nota
router.post("/", createNote);

// Actualizar una nota existente
router.put("/:id", updateNote);

// Eliminar una nota por ID
router.delete("/:id", deleteNote);

export default router;
```

---

## 📝 Comentarios

* El router sigue la convención RESTful.
* Las rutas se conectan al servidor en `app.js` mediante:

```js
app.use("/api/notes", notesRoutes);
```

* Toda la lógica compleja se mantiene en el controlador, manteniendo las rutas limpias y legibles.

---

Estas rutas están listas para escalar y adaptarse a controladores asincrónicos conectados con base de datos.

## Backend - Controladores API RESTful (versión con async/await y manejo de errores)

## 📂 Archivo: `noteController.js`

Este archivo define los controladores que gestionan la lógica de negocio para cada endpoint relacionado con las notas. Se usa un array en memoria como almacenamiento temporal.

### 🧩 Estructura del controlador

Cada función sigue la misma estructura:

* Es `async`, para estar preparada para operaciones asincrónicas.
* Tiene un bloque `try/catch` para capturar errores y enviar respuestas consistentes.
* Implementa validación y manejo de errores personalizado.


| Función      | Ruta       | Descripción                                                                 | Entradas                     | Salidas                                           | Errores manejados                                |
|-------------|------------|------------------------------------------------------------------------------|------------------------------|---------------------------------------------------|--------------------------------------------------|
| getNotes     | GET `/`     | Recupera todas las notas del array en memoria.                             | —                            | JSON array de notas (status 200)                  | 500 Internal Server Error                        |
| getNotesById | GET `/:id`  | Busca una nota por id. Si no existe, devuelve 404.                          | `req.params.id`              | JSON `{ note }` (200) o `{ error, message }` (404) | 404 Not Found, 500 Internal Server Error         |
| createNote   | POST `/`    | Valida `title` y `content`, genera un nuevo ID y agrega la nota al array.  | `req.body.title`, `content`  | JSON `{ nuevaNota }` (201)                        | 400 Bad Request, 500 Internal Server Error       |
| updateNote   | PUT `/:id`  | Busca la nota, actualiza campos proporcionados y devuelve la nota actualizada. | `req.params.id`, `req.body` | JSON `{ notaActualizada }` (200)                  | 404 Not Found, 500 Internal Server Error         |
| deleteNote   | DELETE `/:id`| Busca el índice de la nota, la elimina y devuelve 204 No Content.          | `req.params.id`              | 204 No Content                                    | 404 Not Found, 500 Internal Server Error         |


---

## 📌 Funciones disponibles

### ✅ `getNotes`

**Método**: GET
**Ruta**: `/api/notes`

Devuelve todas las notas.

```js
export const getNotes = async (req, res) => {
  try {
    return res.status(200).json(notes);
  } catch (error) {
    console.error(`[getNotes] error: ${error.message}`);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while fetching notes."
    });
  }
};
```

---

### 🔍 `getNotesById`

**Método**: GET
**Ruta**: `/api/notes/:id`

Busca una nota por su ID. Devuelve 404 si no existe.

```js
export const getNotesById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = notes.find((n) => n.id === id);
    if (!note) {
      return res.status(404).json({
        error: "Not Found",
        message: `Note with '${id}' not found.`
      });
    }
    return res.status(200).json(note);
  } catch (error) {
    console.error(`[getNotesById] error: ${error.message}`);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while fetching notes."
    });
  }
};
```

---

### 🆕 `createNote`

**Método**: POST
**Ruta**: `/api/notes`

Crea una nueva nota validando que el título y contenido estén presentes.

```js
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        error: "Bad request",
        message: "Title and content are required fields."
      });
    }
    const newNote = {
      id: Date.now().toString(),
      title,
      content
    };
    notes.push(newNote);
    return res.status(201).json(newNote);
  } catch (error) {
    console.error(`[createNote] error: ${error.message}`);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while creating the note."
    });
  }
};
```

---

### ✏️ `updateNote`

**Método**: PUT o PATCH
**Ruta**: `/api/notes/:id`

Actualiza una nota existente. Si no se encuentra, devuelve 404.

```js
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = notes.find((n) => n.id === id);
    if (!note) {
      return res.status(404).json({
        error: "Not Found",
        message: `Note with ${id} not found.`
      });
    }
    note.title = title || note.title;
    note.content = content || note.content;
    return res.json(note);
  } catch (error) {
    console.error(`[updateNote] error: ${error.message}`);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while updating the note."
    });
  }
};
```

---

### ❌ `deleteNote`

**Método**: DELETE
**Ruta**: `/api/notes/:id`

Elimina una nota por ID. Devuelve 204 si se elimina correctamente.

```js
export const deleteNote = (req, res) => {
  try {
    const { id } = req.params;
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: `Note with ID '${id}' not found.`
      });
    }
    notes.splice(index, 1);
    return res.status(204).end();
  } catch (error) {
    console.error(`[deleteNote] error: ${error.message}`);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while deleting the note."
    });
  }
};
```

---

✅ Estos controladores ya están listos para conectar con una base de datos real (MongoDB + Mongoose), manteniendo la estructura asincrónica y segura.
