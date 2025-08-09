# 📝 Notes API

Una API RESTful para gestionar notas, construida con **Node.js**, **Express** y **MongoDB** usando **Mongoose**. Permite realizar operaciones CRUD completas sobre documentos de notas.

---

## 📦 Características

- Crear, leer, actualizar y eliminar notas
- Validación de campos con Mongoose
- Manejo de errores robusto
- Estructura modular con controladores, rutas y modelos
- Documentación clara con JSDoc

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JavaScript ES Modules
- JSDoc para documentación interna

---

## 📁 Estructura del proyecto

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
├── .gitignore                  # Archivos y carpetas que Git debe ignorar
├── README.md                   # Documentación del proyecto
└── WIKI.md                     # Documentación técnica y notas de desarrollo
```

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/DjSurgeon/mern-thinkboard.git
cd mern-thinkboard
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura tu archivo `.env` con tus datos y credenciales:

```env
LOCALHOST=http://localhost

PORT=3000

MONGO_URI=

RATE_LIMIT_WINDOW=6000000

RATE_LIMIT_MAX=25

UPSTASH_REDIS_REST_URL=

UPSTASH_REDIS_REST_TOKEN=
```

4. Inicia el servidor:

```bash
npm run dev
```

---

## 📌 Endpoints de la API

| Método | Ruta        | Descripción                             |
|--------|-------------|-----------------------------------------|
| GET    | `/notes`    | Obtener todas las notas                 |
| GET    | `/notes/:id`| Obtener una nota por su ID              |
| POST   | `/notes`    | Crear una nueva nota                    |
| PUT    | `/notes/:id`| Actualizar una nota existente por ID    |
| DELETE | `/notes/:id`| Eliminar una nota por ID                |

---

## 📄 Ejemplo de documento Note

```json
{
  "title": "Mi primera nota",
  "content": "Este es el contenido de la nota."
}
```

---

## 🧠 Validaciones del modelo

- `title`: requerido, mínimo 3 caracteres, máximo 100
- `content`: requerido
- Timestamps automáticos (`createdAt`, `updatedAt`)

---

## ⚙️ Controladores

Cada función del controlador maneja una operación CRUD:

- `getNotes`: obtiene todas las notas
- `getNotesById`: obtiene una nota por ID
- `createNote`: crea una nueva nota
- `updateNote`: actualiza una nota existente
- `deleteNote`: elimina una nota

Incluyen manejo de errores y respuestas claras en formato JSON.

---

## 🧪 Pruebas

Puedes probar la API con herramientas como:

- [Postman](https://www.postman.com/)
- `curl` desde la terminal

---

## Licencia

Este proyecto está bajo la Licencia MIT - ver archivo [LICENSE](./LICENSE) para detalles.

## Autor

Sergio Jiménez de la Cruz

- [Github](https://github.com/DjSurgeon)
- [Linkedin](https://www.linkedin.com/in/sergiojimenez42dev/)
- [Email](djsurgeon83@gmail.com)
