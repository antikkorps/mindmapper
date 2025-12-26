# MindMapper

Interactive mindmap application with real-time saving.

## Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0
- **Database** (choose one):
  - Docker & Docker Compose (for local PostgreSQL)
  - Cloud database account (Neon, Supabase, etc.)

## Quick Start

### Option 1: Local Development (Docker PostgreSQL)

```bash
# 1. Clone and install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env

# 3. Start PostgreSQL with Docker
docker-compose up -d

# 4. Run database migrations
npm run db:migrate

# 5. (Optional) Seed database with test data
npm run db:seed

# 6. Start development servers (frontend + backend)
npm run dev
```

### Option 2: Cloud Database (Neon, Supabase, etc.)

```bash
# 1. Clone and install dependencies
npm install

# 2. Create a database on Neon (https://neon.tech)

# 3. Setup environment variables
cp .env.example .env

# 4. Edit .env and uncomment DATABASE_URL with your Neon connection string
# DATABASE_URL=postgres://user:password@ep-xxx.region.neon.tech/database?sslmode=require

# 5. Run database migrations
npm run db:migrate

# 6. (Optional) Seed database with test data
npm run db:seed

# 7. Start development servers (frontend + backend)
npm run dev
```

### Database Management

```bash
# For Docker PostgreSQL:
# Start PostgreSQL
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# View logs
docker-compose logs -f postgres

# For both Docker and Cloud:
# Reset database
npm run db:reset
```

## Project Structure

```
mindmap/
├── packages/
│   ├── frontend/     # Vue.js application
│   ├── backend/      # Koa.js API
│   └── shared/       # Shared code & types
├── package.json      # Workspace configuration
└── claude.md         # Technical documentation
```

## Documentation

See [claude.md](./claude.md) for detailed technical documentation.

## Development

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- PostgreSQL: localhost:5140

## License

MIT
