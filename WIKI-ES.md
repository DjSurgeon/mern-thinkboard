# 📚 WIKI · Proyecto MERN ThinkBoard

---

## 🧩 Fase 1: Preparación y Configuración

### ✅ Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js LTS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensiones recomendadas:
  - ESLint
  - Prettier
  - DotENV
  - REST Client o Thunder Client
- Herramienta de testing de APIs:
  - Postman (alternativas: Insomnia, Thunder Client)

---

### 📁 Estructura de carpetas

```bash
mern-thinkboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── .env
│   ├── .env.EXAMPLE
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── utils/
├── .gitignore
├── README.md
└── WIKI.md
```

---

### 📌 Archivos raíz

- `.gitignore`: evita subir archivos sensibles o innecesarios.
- `README.md`: presentación general del proyecto.
- `WIKI.md`: documentación técnica y decisiones de arquitectura.

---

## ⚙️ Inicialización del Backend

### Paso 1: Inicializar Node.js

```bash
cd backend/
npm init -y
```

### Paso 2: Usar módulos ES

```json
"type": "module"
```

---

### 📦 Dependencias principales

```bash
npm install express dotenv mongoose cors
npm install --save-dev nodemon
```

---

### 🧪 Script de desarrollo

```json
"scripts": {
  "dev": "nodemon src/app.js"
}
```

---

### 🧾 Variables de entorno (`.env`)

```env
PORT=3000
MONGO_URI=your-mongodb-uri
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=25
UPSTASH_REDIS_REST_URL=https://your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

---

## 🧩 Fase 2: API RESTful

---

### 📌 Rutas de la API (`notesRouter.js`)

| Método | Ruta      | Controlador   | Descripción                                  |
|--------|-----------|---------------|----------------------------------------------|
| GET    | `/`       | getNotes      | Obtiene todas las notas                      |
| GET    | `/:id`    | getNotesById  | Obtiene una nota por su ID                   |
| POST   | `/`       | createNote    | Crea una nueva nota                          |
| PUT    | `/:id`    | updateNote    | Actualiza una nota existente                 |
| DELETE | `/:id`    | deleteNote    | Elimina una nota por su ID                   |

---

### 📂 Controladores (`notesController.js`)

Cada función es asíncrona, con manejo de errores y validación:

| Función        | Descripción                                      |
|----------------|--------------------------------------------------|
| `getNotes`     | Devuelve todas las notas desde MongoDB          |
| `getNotesById` | Busca una nota por ID y la devuelve              |
| `createNote`   | Valida y crea una nueva nota                     |
| `updateNote`   | Actualiza título y contenido de una nota         |
| `deleteNote`   | Elimina una nota por ID                          |

---

### 📄 Modelo Mongoose (`Note.js`)

```js
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});
```

---

## 🔗 Conexión a MongoDB (`db.js`)

```js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log(`Mongo DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongo DB connection error: ${error.message}`);
    process.exit(1);
  }
};
```

---

## 🛡️ Middlewares

### ✅ CORS (`corsConfig.js`)

```js
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
export default cors(corsOptions);
```

---

### ✅ Rate Limiting local (`rateLimit.js`)

```js
export const apiLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW,
  max: process.env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    statusCode: 429,
    error: "Too Many Requests",
    message: 'Rate limit exceeded. Please try again later.'
  }
});
```

---

### ✅ Rate Limiting distribuido con Upstash (`rateLimitRedis.js`)

```js
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "60 s")
});

export const rateLimitRedis = async (req, res, next) => {
  const ip = req.ip;
  const { success } = await rateLimit.limit(ip);
  if (!success) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: "Rate limit exceeded. Please try again later."
    });
  }
  next();
};
```

---

### ✅ Cliente Redis (`upstash.js`)

```js
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});
```

---

## ✅ Estado actual del backend

- ✔️ API RESTful funcional con MongoDB
- ✔️ Validaciones y manejo de errores
- ✔️ Rate limiting local y distribuido
- ✔️ CORS configurado
- ✔️ Estructura modular y escalable
- ✔️ Documentación técnica clara

---