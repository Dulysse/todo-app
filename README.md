
# 📝 Todo App

A fullstack **To-do List** web application built with **Vue.js**, **NestJS**, and **MongoDB**. Designed as a technical test project.

## 📦 Tech Stack

- **Frontend:** (Typescript) Vue 3 + Vite + Primevue
- **Backend:** (Typescript) NestJS + zod
- **Database:** MongoDB
- **Package Manager:** PNPM
- **Containerization:** Docker & Docker Compose

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- [PNPM](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

## 🛠 Project Structure

```

todo-app/
├── backend/               # NestJS backend
├── frontend/              # Vue 3 frontend
├── docker-compose.yml     # Docker services
├── package.json           # Monorepo root
└── pnpm-lock.yaml         # PNPM lockfile

```


---

## 📂 Backend (NestJS)

To run or test only the backend:

```bash
cd backend

pnpm install
pnpm start:dev         # Development server
pnpm test              # Unit tests
pnpm test:e2e          # e2e tests
pnpm build             # Compile for production
```

### Environment Variables

Ensure a `.env` file exists in `/backend` (see `.env.example`):

```env
MONGO_URI=mongodb://localhost:27017/todo-app
PORT=3000
```

---

## 📂 Frontend (Vue 3)

To run or test only the frontend:

```bash
cd frontend

pnpm install
pnpm dev         # Development server
pnpm test              # Vitest unit test
pnpm build             # Compile for production
```

### Environment Variables

Ensure a `.env` file exists in `/frontend` (see `.env.example`):

```env
VITE_API_URL=http://localhost:3000
```

---


## 📦 Installation (Monorepo)

### 1. Install dependencies

```bash
pnpm install
````

### 2. Set up environment variables

### 3. Run dev environment locally

```bash
pnpm dev
```

Or in two terminals or with `pnpm` scripts:

```bash
# Start backend
cd backend
pnpm start:dev

# Start frontend
cd frontend
pnpm dev
```

---

## 🐳 Docker

### 🔥 Build and run with Docker

```bash
pnpm start:docker
```

This will:

* Start the backend and MongoDB using Docker Compose

### 🛑 Stop the containers

```bash
pnpm stop:docker
```

---

## 🧪 Testing

From the monorepo root:

- Run all tests (vitest, jest)
```bash
pnpm test
```

- Run all linters (eslint)
```bash
pnpm lint
```

- Format all code (prettier)
```bash
pnpm format
```

- Compile code for production
```bash
pnpm build
```

## ✨ Features

* ✅ Create, update, delete tasks
* ✅ MongoDB schema validation
* ✅ Type-safe DTOs with Zod
* ✅ E2E tests using Supertest + Jest
* ✅ Dockerized workflow
* ✅ PNPM monorepo-compatible
* ✅ UI/UX interface
* ✅ CI pipelines for testing, linting, and building automatically (husky).

---

## 📈 Axes of Improvement

- Add authentication and role-based authorization to secure the app.
- Dockerize the entire stack (frontend, backend, database) for full containerization.
- Refactor frontend to maximize component reuse and consistency.
- Add backend middleware for security (e.g., CORS, rate limiting, helmet).
- Implement global input validation using DTOs and pipes.
- Integrate Swagger to document and test the API easily.
- Create a reusable UI component library for the frontend.
- Include logging and monitoring tools for backend observability.


---

## 🧑‍💻 Author

**Ulysse Dupont**
- [📧 ulyssedupont2707@gmail.com](mailto:ulyssedupont2707@gmail.com)
- [🔗 GitHub](https://github.com/Dulysse)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
