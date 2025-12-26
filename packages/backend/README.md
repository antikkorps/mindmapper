# MindMapper Backend

Koa.js API server for MindMapper application.

## Database Setup

The backend supports two database configurations:

### Option 1: Cloud Database (Neon) - Recommended for Production

1. Create a database on [Neon](https://neon.tech)
2. Copy the connection string
3. Set it in your `.env` file:

```bash
DATABASE_URL=postgres://user:password@ep-xxx.region.neon.tech/database?sslmode=require
```

### Option 2: Local Docker PostgreSQL - For Development

1. Start PostgreSQL with Docker from the project root:

```bash
docker-compose up -d
```

2. Use individual connection parameters in `.env`:

```bash
DB_HOST=localhost
DB_PORT=5140
DB_USER=mindmapper
DB_PASSWORD=mindmapper_dev
DB_NAME=mindmapper_db
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Running Migrations

```bash
# From project root
npm run db:migrate

# Or from backend directory
npm run db:migrate
```

## Development

```bash
# From project root
npm run dev:backend

# Or from backend directory
npm run dev
```

## Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## API Endpoints

### Maps

- `GET /api/maps` - List all maps
- `GET /api/maps/:id` - Get single map
- `POST /api/maps` - Create new map
- `PATCH /api/maps/:id` - Update map
- `DELETE /api/maps/:id` - Delete map

### Nodes

- `GET /api/maps/:mapId/nodes` - Get all nodes for a map
- `GET /api/nodes/:id` - Get single node
- `POST /api/nodes` - Create new node
- `PATCH /api/nodes/:id` - Update node
- `DELETE /api/nodes/:id` - Delete node

## Architecture

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/          # Sequelize models
│   ├── services/        # Business logic (DRY)
│   ├── middlewares/     # Koa middlewares
│   ├── routes/          # API routes
│   └── utils/           # Helper functions
├── tests/
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── migrations/         # Database migrations
└── seeders/           # Database seeders
```
