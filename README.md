# Smart Hospital - Workflow Optimization System

A comprehensive hospital workflow optimization platform built with modern web technologies. This system manages patient flow, bed occupancy, staff scheduling, task management, and department coordination in real-time.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL with Prisma ORM |
| Real-time | Socket.IO |
| Auth | JWT (access + refresh tokens) |
| Validation | Zod (shared schemas) |
| Monorepo | pnpm workspaces + Turborepo |
| Containers | Docker + docker-compose |

## Project Structure

```
For-Smart-Hospital/
├── apps/
│   ├── api/                  # Express.js REST API
│   │   ├── prisma/           # Database schema & seed
│   │   └── src/
│   │       ├── modules/      # Feature modules (auth, patients, beds, tasks, staff, departments, notifications)
│   │       ├── middleware/    # Auth, validation, error handling
│   │       └── config/       # DB, env, socket config
│   └── web/                  # Next.js frontend
│       ├── app/              # App router pages
│       ├── components/       # Shared UI components
│       └── lib/              # Utilities, API client
├── packages/
│   ├── shared-types/         # Zod schemas, TypeScript types, enums
│   ├── tsconfig/             # Shared TypeScript configs
│   └── eslint-config/        # Shared ESLint config
├── docker-compose.yml
└── turbo.json
```

## Prerequisites

- Node.js >= 20
- pnpm >= 9.15
- PostgreSQL 16 (or use Docker)

## Getting Started

### Option 1: Docker (recommended)

```bash
docker-compose up -d
```

This starts PostgreSQL, the API server (port 4000), and the web app (port 3000).

### Option 2: Local Development

```bash
# Install dependencies
pnpm install

# Start PostgreSQL (ensure it's running on port 5432)
# Copy and configure environment variables
cp .env.example .env

# Run database migrations
pnpm db:migrate

# Seed the database with demo data
pnpm db:seed

# Start both frontend and backend in dev mode
pnpm dev
```

- **Web app**: http://localhost:3000
- **API**: http://localhost:4000
- **API Health**: http://localhost:4000/api/health

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smarthospital.com | admin123! |
| Doctor | dr.smith@smarthospital.com | doctor123! |
| Nurse | nurse.johnson@smarthospital.com | nurse123! |

## Developer Workstreams

This project is designed for **3 full-stack developers** working in parallel:

### Developer A — Patient Flow & Core Infrastructure
- Auth module (JWT login/register, role-based access)
- Patient lifecycle (register, admit, transfer, discharge)
- Dashboard with summary metrics
- **Key paths**: `modules/auth/`, `modules/patients/`, `app/patients/`, `app/dashboard/`

### Developer B — Bed Management & Task Management
- Real-time bed occupancy tracking with Socket.IO
- Bed assignment/release workflows
- Task board (create, assign, prioritize, escalate)
- **Key paths**: `modules/beds/`, `modules/tasks/`, `app/beds/`, `app/tasks/`

### Developer C — Staff Scheduling & Department Coordination
- Staff directory and profiles
- Shift scheduling (morning/afternoon/night)
- Department management and metrics
- Inter-department transfer requests
- In-app notifications
- **Key paths**: `modules/staff/`, `modules/departments/`, `modules/notifications/`, `app/staff/`, `app/departments/`

## API Endpoints

| Module | Endpoint | Description |
|--------|----------|-------------|
| Auth | `POST /api/auth/register` | Register user |
| Auth | `POST /api/auth/login` | Login, returns JWT |
| Auth | `GET /api/auth/me` | Current user profile |
| Patients | `GET/POST /api/patients` | List/create patients |
| Patients | `POST /api/patients/:id/admit` | Admit patient |
| Patients | `POST /api/patients/:id/discharge` | Discharge patient |
| Beds | `GET /api/beds` | List beds (filterable) |
| Beds | `GET /api/beds/stats` | Occupancy stats by department |
| Beds | `POST /api/beds/:id/assign` | Assign patient to bed |
| Tasks | `GET/POST /api/tasks` | List/create tasks |
| Tasks | `POST /api/tasks/:id/escalate` | Escalate task |
| Staff | `GET/POST /api/staff` | List/create staff |
| Staff | `GET /api/staff/:id/schedule` | Staff schedule |
| Departments | `GET /api/departments` | List departments with stats |
| Transfers | `POST /api/departments/transfers` | Request transfer |
| Notifications | `GET /api/notifications` | User notifications |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all packages |
| `pnpm test` | Run all tests |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed` | Seed database with demo data |
| `pnpm db:studio` | Open Prisma Studio GUI |

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
