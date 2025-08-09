# 📚 ThinkBoard MERN Project · WIKI

---

## 🧩 Phase 1: Preparation & Setup

### ✅ Prerequisites

Before you begin, install:

- Node.js LTS  
- Visual Studio Code  
- Recommended VS Code extensions:  
  - ESLint  
  - Prettier  
  - DotENV  
  - REST Client or Thunder Client  
- API testing tool: Postman (alternatives: Insomnia, Thunder Client)

---

### 📁 Project Structure

```bash
mern-thinkboard/
├── backend/
│   ├── src/
│   │   ├── config/        # DB & external service configs (MongoDB, Redis, JWT)
│   │   ├── controllers/   # Route handlers (CRUD, validations, etc.)
│   │   ├── middleware/    # Custom middlewares (auth, errors, rate-limit)
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express routers
│   │   ├── utils/         # Reusable helpers (formatters, token generators)
│   │   └── app.js         # Express app entry point
│   ├── .env               # Environment variables (git-ignored)
│   ├── .env.EXAMPLE       # Sample env file
│   ├── package.json       # Dependencies & scripts
│   └── package-lock.json  # Locked versions
├── frontend/
│   ├── public/            # Static files (index.html, favicon, etc.)
│   └── src/
│       ├── assets/        # Images, icons, fonts
│       ├── components/    # Reusable UI components
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Top-level views
│       ├── services/      # API interaction (Axios)
│       └── utils/         # UI helpers & validators
├── .gitignore
├── README.md
└── WIKI.md
```

---

### ⚙️ Backend Initialization

1. In `backend/`, initialize npm:  
   ```bash
   npm init -y
   ```

2. Enable ES modules in `package.json`:  
   ```json
   {
     "type": "module"
   }
   ```

3. Install core dependencies and dev tools:  
   ```bash
   npm install express dotenv mongoose cors
   npm install --save-dev nodemon
   ```

4. Add a `dev` script to `package.json`:  
   ```json
   "scripts": {
     "dev": "nodemon src/app.js"
   }
   ```

5. Create a `.env` file:  
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

## 🧩 Phase 2: RESTful API

### 📌 Routes (`routes/notesRouter.js`)

| Method | Path     | Controller       | Description                  |
| ------ | -------- | ---------------- | ---------------------------- |
| GET    | `/`      | getNotes         | Retrieve all notes           |
| GET    | `/:id`   | getNoteById      | Retrieve a note by its ID    |
| POST   | `/`      | createNote       | Create a new note            |
| PUT    | `/:id`   | updateNote       | Update an existing note      |
| DELETE | `/:id`   | deleteNote       | Delete a note by its ID      |

#### Example

```js
import express from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
```

---

### 📂 Controllers (`controllers/notesController.js`)

All functions use `async/await`, wrap logic in `try/catch`, and return consistent error payloads.

| Function       | Description                                 | Success Status | Error Status       |
| -------------- | ------------------------------------------- | -------------- | ------------------ |
| `getNotes`     | Fetch all notes from MongoDB                | 200            | 500                |
| `getNoteById`  | Fetch a single note by ID                   | 200            | 404, 500           |
| `createNote`   | Validate input & create a new note          | 201            | 400, 500           |
| `updateNote`   | Update title/content of an existing note    | 200            | 404, 500           |
| `deleteNote`   | Delete a note by its ID                     | 204            | 404, 500           |

#### Sample Controller

```js
import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json(notes);
  } catch (error) {
    console.error(`[getNotes] ${error.message}`);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unexpected error fetching notes.'
    });
  }
};
```

---

## 🔗 Database Connection (`config/db.js`)

```js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log(`MongoDB connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`DB connection error: ${error.message} ❌`);
    process.exit(1);
  }
};

export default connectDB;
```

Invoke `connectDB()` in `app.js` **before** starting your server.

---

## 📝 Mongoose Model (`models/Note.js`)

```js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long.'],
    maxlength: [100, 'Title cannot exceed 100 characters.']
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
    trim: true
  }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
```

---

## 🛡️ Middleware

### CORS (`middleware/corsConfig.js`)

```js
import cors from 'cors';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
};

export default cors(corsOptions);
```

---

### Rate Limiting (Local) (`middleware/rateLimit.js`)

```js
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: +process.env.RATE_LIMIT_WINDOW,
  max: +process.env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    statusCode: 429,
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Try again later.'
  }
});
```

---

### Rate Limiting (Distributed with Upstash) (`middleware/rateLimitRedis.js`)

```js
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../config/upstash.js';

const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, '60 s')
});

export const rateLimitRedis = async (req, res, next) => {
  const ip = req.ip;
  const { success } = await limiter.limit(ip);
  if (!success) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Try again later.'
    });
  }
  next();
};
```

---

### Upstash Redis Client (`config/upstash.js`)

```js
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});
```

---

## ✅ Current Backend Status

- RESTful API fully functional with MongoDB  
- Input validations & error handling  
- Local & distributed rate limiting  
- CORS configuration  
- Modular, scalable architecture  
- Comprehensive technical documentation  

---


---

# Deliverable 2: Navigable Online Wiki (MkDocs Setup)

Below is a ready-to-use MkDocs configuration and folder layout. Clone this structure, paste each section’s Markdown into its corresponding `docs/*.md`, then run `mkdocs serve`.

```
mern-thinkboard-docs/
├── mkdocs.yml
└── docs/
    ├── index.md
    ├── phase-1-preparation.md
    ├── phase-2-api.md
    ├── db-connection.md
    ├── models.md
    ├── middleware.md
    └── best-practices.md
```

---

## mkdocs.yml

```yaml
site_name: ThinkBoard MERN Documentation
site_description: Comprehensive guide to set up, develop, and scale ThinkBoard MERN.
theme:
  name: material

nav:
  - Home: index.md
  - Phase 1: Preparation & Setup: phase-1-preparation.md
  - Phase 2: RESTful API: phase-2-api.md
  - Database Connection: db-connection.md
  - Mongoose Model: models.md
  - Middleware: middleware.md
  - Best Practices & Status: best-practices.md

markdown_extensions:
  - admonition
  - codehilite
  - toc:
      permalink: true
```

---

## docs/index.md

```markdown
# Welcome to ThinkBoard MERN Docs

This documentation covers:

- Project setup & configuration  
- Building a RESTful API with Express & Mongoose  
- Database connection  
- Data modeling  
- Middleware (CORS, rate limiting)  
- Best practices & architecture decisions  

Use the sidebar to navigate through each section.
```

---

## docs/phase-1-preparation.md

```markdown
# Phase 1: Preparation & Setup

## Prerequisites

- Node.js LTS  
- Visual Studio Code  
- ESLint, Prettier, DotENV  
- REST Client / Thunder Client  
- Postman / Insomnia

## Project Structure

```bash
mern-thinkboard/
├── backend/
│   └── src/…
├── frontend/
│   └── src/…
├── .gitignore
├── README.md
└── WIKI.md
```

## Backend Initialization

1. `npm init -y`  
2. `"type": "module"` in package.json  
3. `npm install express dotenv mongoose cors`  
4. `npm install --save-dev nodemon`  
5. Add `"dev": "nodemon src/app.js"` to scripts  
6. Create `.env` with PORT, MONGO_URI, CORS_ORIGIN, etc.
```

---

## docs/phase-2-api.md

```markdown
# Phase 2: RESTful API

## Routes (notesRouter.js)

| Method | Path    | Controller     |
| ------ | ------- | -------------- |
| GET    | `/`     | getNotes       |
| GET    | `/:id`  | getNoteById    |
| POST   | `/`     | createNote     |
| PUT    | `/:id`  | updateNote     |
| DELETE | `/:id`  | deleteNote     |

## Controllers (notesController.js)

Each controller:
- Uses `async/await`  
- Wraps logic in `try/catch`  
- Returns JSON with status codes  

### Example: getNotes

```js
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unexpected error fetching notes.'
    });
  }
};
```
```

---

## docs/db-connection.md

```markdown
# Database Connection (config/db.js)

```js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log(`MongoDB connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`DB connection error: ${error.message} ❌`);
    process.exit(1);
  }
};

export default connectDB;
```

Invoke `connectDB()` before your server start.
```

---

## docs/models.md

```markdown
# Mongoose Model (models/Note.js)

```js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters.'],
    maxlength: [100, 'Title cannot exceed 100 characters.']
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
```
```

---

## docs/middleware.md

```markdown
# Middleware

## CORS (middleware/corsConfig.js)

```js
import cors from 'cors';
export default cors({ origin: process.env.CORS_ORIGIN, credentials: true });
```

## Rate Limiting (Local)

```js
import rateLimit from 'express-rate-limit';
export const apiLimiter = rateLimit({
  windowMs: +process.env.RATE_LIMIT_WINDOW,
  max: +process.env.RATE_LIMIT_MAX,
  message: { error:'Too Many Requests' }
});
```

## Rate Limiting (Distributed)

```js
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../config/upstash.js';
const limiter = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(10,'60 s') });
export const rateLimitRedis = async (req, res, next) => {
  const { success } = await limiter.limit(req.ip);
  if (!success) return res.status(429).json({ error:'Too Many Requests' });
  next();
};
```
```

---

## docs/best-practices.md

```markdown
# Best Practices & Current Status

- Modular folder structure  
- Environment variables for secrets  
- Input validation in both schema & controllers  
- Clear logging and error messages  
- Local & distributed rate limiting  
- CORS whitelist management  
- Automated timestamps for audit trails  

**Backend is production-ready**, with scalable architecture and full documentation.
```

---

**To launch locally:**

```bash
pip install mkdocs-material
mkdocs serve
```

Open `http://127.0.0.1:8000` in your browser. Enjoy your navigable MERN documentation!