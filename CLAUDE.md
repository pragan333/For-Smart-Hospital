# CLAUDE.md — For-Smart-Hospital

## Project Overview

**For-Smart-Hospital** is a Smart Hospital Workflow Optimization platform — Package 1 of the Smart Hospital system. It manages patient flow, bed occupancy, staff scheduling, task management, and department coordination.

- **License:** Apache-2.0
- **Copyright:** Amazon.com, Inc. or its affiliates
- **Code of Conduct:** [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL 16 with Prisma ORM |
| Real-time | Socket.IO |
| Auth | JWT (access + refresh tokens) |
| Validation | Zod (shared between frontend/backend) |
| Monorepo | pnpm 9.15 workspaces + Turborepo |
| Containers | Docker + docker-compose |

## Repository Structure

```
For-Smart-Hospital/
├── apps/
│   ├── api/                    # Express.js backend (port 4000)
│   │   ├── prisma/             # schema.prisma + seed.ts
│   │   └── src/
│   │       ├── modules/        # auth, patients, beds, tasks, staff, departments, notifications
│   │       ├── middleware/      # auth, validate, errorHandler
│   │       └── config/         # db, env, socket
│   └── web/                    # Next.js frontend (port 3000)
│       ├── app/                # dashboard, patients, beds, tasks, staff, departments
│       ├── components/         # Sidebar, Header, ui/
│       └── lib/                # api client, cn utility
├── packages/
│   ├── shared-types/           # Zod schemas, enums, TypeScript types (API contract)
│   ├── tsconfig/               # base, node, nextjs configs
│   └── eslint-config/          # shared ESLint rules
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── .env.example
```

## Commands

### Install Dependencies
```bash
pnpm install
```

### Start Development (all apps)
```bash
pnpm dev
```

### Build All
```bash
pnpm build
```

### Lint All
```bash
pnpm lint
```

### Run Tests
```bash
pnpm test
```

### Database Commands
```bash
pnpm db:migrate    # Run Prisma migrations
pnpm db:seed       # Seed with demo data
pnpm db:studio     # Open Prisma Studio GUI
```

### Docker
```bash
docker-compose up -d    # Start all services
docker-compose down     # Stop all services
```

## Developer Workstreams

Three developers work in parallel with clear module boundaries:

### Developer A — Patient Flow & Core Infrastructure
- **Owns:** `modules/auth/`, `modules/patients/`, `app/dashboard/`, `app/patients/`
- Auth (JWT login/register, role-based guards)
- Patient CRUD + admission/discharge workflows
- Main dashboard with summary metrics

### Developer B — Bed Management & Task Management
- **Owns:** `modules/beds/`, `modules/tasks/`, `app/beds/`, `app/tasks/`
- Real-time bed tracking via Socket.IO
- Bed grid with color-coded status
- Task board with priority and assignment

### Developer C — Staff Scheduling & Department Coordination
- **Owns:** `modules/staff/`, `modules/departments/`, `modules/notifications/`, `app/staff/`, `app/departments/`
- Staff directory and shift calendar
- Department metrics and capacity tracking
- Inter-department transfer requests
- In-app notifications

## Shared Contracts

All API types and validation schemas live in `packages/shared-types/`. Developers define their Zod schemas there first, then build implementations. This prevents type drift between frontend and backend.

## Conventions

### Code Style
- TypeScript strict mode everywhere
- Zod for request validation (via `validate` middleware)
- Prisma for all database access (no raw SQL)
- Socket.IO events follow `module:event-name` pattern (e.g., `bed:status-change`)

### API Response Format
```typescript
{ success: boolean, data?: T, error?: string, message?: string }
```

### Module Structure (backend)
Each module in `apps/api/src/modules/<name>/` contains:
- `<name>.routes.ts` — Express router with all endpoints

### Database
- Schema: `apps/api/prisma/schema.prisma` (single file, sectioned by module)
- Seed: `apps/api/prisma/seed.ts`
- All models use UUID primary keys

## Contribution Workflow

Per `CONTRIBUTING.md`:
1. Work against the latest source on the **main** branch
2. Check existing open/recently merged PRs before starting work
3. Fork the repository, make focused changes, ensure local tests pass
4. Submit a pull request with clear commit messages

## Security

- Report security issues via [AWS vulnerability reporting](http://aws.amazon.com/security/vulnerability-reporting/)
- Do **not** create public GitHub issues for security vulnerabilities
- Never commit `.env` files or secrets
