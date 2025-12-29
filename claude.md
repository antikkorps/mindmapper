# MindMapper - Documentation Projet

## Vue d'ensemble

Application web permettant de créer des cartes mentales (mindmaps) interactives avec sauvegarde en temps réel.

**Objectif**: Créer une solution **State Of The Art (SOTA)** avec les meilleures pratiques de développement.

## Architecture Technique

### Stack

- **Frontend**: Vue.js + Vue Flow + Pinia + Tailwind CSS + DaisyUI
- **Backend**: Node.js + Koa.js + JWT Authentication
- **Database**: PostgreSQL + Sequelize ORM
- **Communication**: REST API
- **Validation**: Zod (runtime type checking)
- **Logging**: Winston (production-grade logger with file rotation)
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet + Rate Limiting + bcrypt
- **Testing**:
  - ✅ Jest (Backend - 41 tests passing, ESM support with mocked DB)
  - ⏳ Vitest (Frontend - not yet implemented)
  - ⏳ Playwright (E2E - not yet implemented)
- **UI Framework**: Tailwind CSS + DaisyUI
- **Export**: html-to-image (PNG), jspdf (PDF)

### Structure Monorepo

```
mindmap/
├── packages/
│   ├── frontend/          # Application Vue.js
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── composables/    # Logique réutilisable (DRY)
│   │   │   ├── stores/
│   │   │   ├── services/       # API calls
│   │   │   └── utils/          # Helpers DRY
│   │   └── tests/
│   │       ├── unit/
│   │       ├── integration/
│   │       └── e2e/
│   ├── backend/           # API Koa.js
│   │   ├── src/
│   │   │   ├── config/         # Winston logger, Swagger spec
│   │   │   ├── controllers/    # Auth, User, Map, Node
│   │   │   ├── models/         # Sequelize models
│   │   │   ├── services/       # Business logic (DRY)
│   │   │   ├── middlewares/    # Auth, Zod validation, Rate limiting
│   │   │   ├── routes/         # API routes + Swagger UI
│   │   │   ├── utils/          # JWT, bcrypt helpers
│   │   │   └── validators/     # Zod schemas
│   │   ├── logs/               # Winston log files (auto-generated)
│   │   ├── migrations/         # Sequelize migrations
│   │   ├── seeders/            # Development data
│   │   └── tests/              # Jest test suite (41 tests)
│   │       ├── config/         # DRY test configuration
│   │       │   ├── mockDb.js   # Database mocking utilities
│   │       │   └── testHelpers.js  # Shared test helpers
│   │       ├── setup.js        # Global test setup (no real DB)
│   │       ├── unit/           # Unit tests (services, utils)
│   │       │   ├── services/
│   │       │   │   └── BaseService.test.js  # 18 tests ✅
│   │       │   └── utils/
│   │       │       ├── hash.test.js         # 9 tests ✅
│   │       │       └── jwt.test.js          # 14 tests ✅
│   │       └── integration/    # Integration tests (TODO)
│   └── shared/            # Code partagé (DRY maximal) [FUTURE]
│       ├── types/         # TypeScript types
│       ├── constants/
│       └── validators/
├── package.json           # Configuration workspace
└── CLAUDE.md              # Ce fichier
```

## API Endpoints Reference

### Authentication (`/api/auth`)

```
POST   /api/auth/register    - Register new user (rate: 5/min)
POST   /api/auth/login       - Login user (rate: 5/min)
POST   /api/auth/refresh     - Refresh access token (rate: 5/min)
GET    /api/auth/me          - Get current user (protected)
```

### Users (`/api/users`)

```
GET    /api/users            - List all users
GET    /api/users/:id        - Get user by ID
POST   /api/users            - Create user
PUT    /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user
GET    /api/users/:id/maps   - Get user's maps
```

### Maps (`/api/maps`)

```
GET    /api/maps             - List all maps
GET    /api/maps/:id         - Get map by ID
GET    /api/maps/:id/nodes   - Get map with all nodes (eager loading)
GET    /api/maps/user/:userId - Get maps by user
POST   /api/maps             - Create map
PUT    /api/maps/:id         - Update map
DELETE /api/maps/:id         - Delete map (cascade nodes)
```

### Nodes (`/api/nodes`)

```
GET    /api/nodes                - List all nodes
GET    /api/nodes/:id            - Get node by ID
GET    /api/nodes/map/:mapId     - Get nodes by map
POST   /api/nodes                - Create node
PUT    /api/nodes/:id            - Update node
PATCH  /api/nodes/:id/position   - Update node position
PATCH  /api/nodes/:id/label      - Update node label
DELETE /api/nodes/:id            - Delete node (cascade children)
```

### Documentation

```
GET    /api-docs             - Swagger UI (interactive)
GET    /api-docs.json        - OpenAPI 3.0 specification
```

## Principes de Développement (SOTA)

### 1. DRY (Don't Repeat Yourself)

**Objectif**: Éliminer toute duplication de code

#### Frontend

- **Composables Vue**: Logique réutilisable (ex: `useNode`, `useMap`, `useDragDrop`)
- **Composants génériques**: `BaseButton`, `BaseModal`, `BaseInput`
- **Services centralisés**: Un seul point d'accès API (`apiClient.js`)
- **Utilities**: Fonctions helpers partagées (`formatDate`, `debounce`, `throttle`)

#### Backend

- **Services layer**: Séparation business logic / controllers
- **BaseService pattern**: CRUD générique pour tous les models (DRY)
- **Middlewares réutilisables**:
  - `errorHandler` (Winston integrated)
  - `zodValidator` (Zod validation)
  - `auth` (JWT authentication)
  - `rateLimiter` (koa-ratelimit)
  - `logger` (Winston request logging)
- **Query builders**: Requêtes Sequelize réutilisables
- **Utils**: JWT helpers, bcrypt password hashing

#### Shared Package (Future)

- **Types TypeScript**: Partagés entre frontend/backend
- **Validateurs**: Schémas Zod utilisables partout
- **Constants**: Valeurs magiques centralisées

#### Production-Grade Features (Backend)

- **Winston Logger**:
  - File rotation (daily)
  - Separate error logs (`logs/error-YYYY-MM-DD.log`)
  - App logs (`logs/app-YYYY-MM-DD.log`)
  - Console + file transports
  - Colored output for dev
  - Request logging with timing
- **Zod Validation**:
  - Runtime type checking
  - Detailed error messages (field + message)
  - Applied to all endpoints (body, params, query)
  - Schemas: `user.schema.js`, `map.schema.js`, `node.schema.js`
- **JWT Authentication**:
  - Access tokens (7 days expiry)
  - Refresh tokens (30 days expiry)
  - bcrypt password hashing (salt rounds: 10)
  - Protected routes middleware
  - Token format: `Authorization: Bearer <token>`
- **Swagger/OpenAPI**:
  - Interactive API docs at `/api-docs`
  - Full spec at `/api-docs.json`
  - All endpoints documented with schemas
  - Try-it-out functionality
- **Rate Limiting**:
  - Auth endpoints: 5 req/min (anti brute-force)
  - API endpoints: 100 req/min
  - Headers exposed: `Rate-Limit-Remaining`, `Rate-Limit-Reset`, `Rate-Limit-Total`
  - Redis-ready (currently in-memory)

### 2. Testing (Couverture > 80% - Target)

#### ✅ Backend Tests (DRY + Mocked Database)

**Status**: 41 tests passing, 4.78% overall coverage (many files not yet tested)

**Infrastructure DRY**:

```javascript
// tests/config/mockDb.js - Centralized database mocking
export const mockModels = { User, Map, Node }
export const mockDbSuccess = (model, method, returnValue) => { ... }
export const mockDbError = (model, method, error) => { ... }
export const resetAllMocks = () => { ... }

// tests/config/testHelpers.js - Shared utilities
export const generateMockUser = () => ({ id: uuid(), ... })
export const generateMockMap = (userId) => ({ ... })
export const generateMockNode = (mapId) => ({ ... })
export const createMockContext = () => ({ ... })  // For middleware tests
export const createMockNext = () => jest.fn()
```

**Completed Tests**:

```javascript
// Unit Tests (Jest with ESM support)
✅ BaseService.test.js (18 tests, 83.33% coverage)
   - findAll, findById, create, update, delete
   - count, exists methods
   - Error handling

✅ hash.test.js (9 tests, 100% coverage)
   - bcrypt password hashing
   - Password comparison
   - Edge cases (unicode, special chars, very long)

✅ jwt.test.js (14 tests, 78.57% coverage)
   - Token generation (access + refresh)
   - Token verification
   - Expiration and claims (iss, aud, iat, exp)

// TODO: Not yet tested
⏳ NodeService, MapService, UserService
⏳ Middlewares (auth, zodValidator, rateLimiter)
⏳ Controllers (authController, mapController, nodeController)
⏳ Integration tests (supertest)
```

**Key Features**:

- ✅ **No real database** - All mocked for CI/CD
- ✅ **Jest ESM support** - `NODE_OPTIONS='--experimental-vm-modules'`
- ✅ **DRY configuration** - No repetitive setup
- ✅ **Mock factories** - Generate test data easily
- ✅ **Documentation** - `TESTING.md` guide

**Running Tests**:

```bash
npm test                  # All tests
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests only
npm run test:coverage     # With coverage report
npm run test:watch        # Watch mode
```

#### Frontend Tests (TODO)

```javascript
// Unit Tests (Vitest) - NOT YET IMPLEMENTED
- Composables: useNode.test.js
- Stores: nodeStore.test.js
- Utils: helpers.test.js

// Component Tests (Vitest + Testing Library)
- NodeEditor.test.js
- MindMapCanvas.test.js
- Dashboard.test.js

// E2E Tests (Playwright)
- create-mindmap.spec.js
- drag-drop-nodes.spec.js
- delete-cascade.spec.js
```

#### Stratégie TDD (Test-Driven Development)

1. **Red**: Écrire le test qui échoue
2. **Green**: Implémenter le minimum pour passer
3. **Refactor**: Améliorer en gardant les tests verts

### 3. UI/UX Excellence

#### Tailwind CSS

- **Utility-first**: Classes atomiques pour rapidité
- **Responsive**: Mobile-first design
- **Dark mode**: Support natif avec `dark:` variants
- **Custom config**: Palette de couleurs du projet

#### DaisyUI Components

- **Composants pré-stylés**: Boutons, modals, cards, etc.
- **Thèmes**: Changement de thème en un clic
- **Accessibilité**: WAI-ARIA compliant
- **Customisation**: Surcharge des variables CSS

#### Composants UI Réutilisables

```vue
<!-- BaseButton.vue (DRY) -->
<template>
  <button :class="buttonClasses" class="btn">
    <slot />
  </button>
</template>

<!-- Usage avec DaisyUI + Tailwind -->
<BaseButton variant="primary" size="lg">
  Créer une carte
</BaseButton>
```

## Fonctionnalités Principales

### 1. Gestion des Nœuds

- **Création**: Ajout de nouveaux nœuds dans la carte
- **Édition**: Modification du texte d'un nœud
- **Suppression**: Retrait d'un nœud (avec gestion de la cascade récursive)
- **Déplacement**: Drag-and-drop avec sauvegarde automatique des positions

### 2. Arborescence

- Système de parenté: un nœud peut avoir plusieurs enfants
- Relation parent/enfant avec auto-référence en base de données
- Cascade delete récursif via `NodeService.deleteNodeTree()`

### 3. Persistence

- Sauvegarde automatique lors de `onNodeDragStop`
- Stockage des positions (x, y) et du contenu
- Debounce pour optimiser les requêtes API

### 4. Navigation

- Zoom: molette de souris / pincement tactile
- Panning: déplacement dans le canvas
- Interface fluide et réactive

### 5. Organisation

- Tableau de bord avec liste des mindmaps
- Gestion multi-cartes par utilisateur

### 6. Authentification & Sécurité

- Inscription/Connexion avec JWT
- Protection des routes sensibles
- Rate limiting anti brute-force
- Validation Zod sur toutes les entrées
- Logging complet des actions

### 7. Export Mind Maps

- **Export PNG**: Images haute qualité via `html-to-image`
  - Capture haute résolution (2x scale)
  - Format optimisé pour partage
- **Export PDF**: Documents prêts à l'impression via `jspdf`
  - Orientation automatique (portrait/paysage)
  - Format adapté à la taille de la carte
- **Export JSON**: Données brutes pour sauvegarde
  - Format structuré (nodes + edges)
  - Compatible pour import futur

## Modèle de Données

### Table `users`

| Champ     | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| id        | UUID   | Identifiant unique de l'utilisateur           |
| username  | STRING | Nom d'utilisateur (3-50 chars, alphanum + \_) |
| email     | STRING | Email unique                                  |
| password  | STRING | Hash bcrypt du mot de passe                   |
| createdAt | DATE   | Date de création                              |
| updatedAt | DATE   | Date de dernière modification                 |

### Table `maps`

| Champ     | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| id        | UUID   | Identifiant unique de la carte |
| title     | STRING | Titre de la mindmap            |
| userId    | FK     | Propriétaire de la carte       |
| createdAt | DATE   | Date de création               |
| updatedAt | DATE   | Date de dernière modification  |

### Table `nodes`

| Champ     | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| id        | UUID   | Identifiant unique du nœud                         |
| label     | STRING | Texte affiché dans le nœud                         |
| posX      | FLOAT  | Coordonnée X dans le canvas                        |
| posY      | FLOAT  | Coordonnée Y dans le canvas                        |
| parentId  | FK     | Référence vers l'ID du nœud parent (NULL = racine) |
| mapId     | FK     | Référence vers la carte mentale parente            |
| createdAt | DATE   | Date de création                                   |
| updatedAt | DATE   | Date de dernière modification                      |

### Relations

- **Auto-relation**: `nodes.parentId` → `nodes.id`
- **Map-Nodes**: `nodes.mapId` → `maps.id` (CASCADE on delete)
- **User-Maps**: `maps.userId` → `users.id`

## Flux de Travail API

### Authentication Flow

```
1. POST /api/auth/register { username, email, password }
   → Zod validation
   → bcrypt hash password (salt rounds: 10)
   → Create user
   → Return JWT access + refresh tokens

2. POST /api/auth/login { email, password }
   → Find user by email
   → bcrypt compare password
   → Return JWT tokens
   → Winston log successful login

3. GET /api/auth/me
   → Requires: Authorization: Bearer <token>
   → Verify JWT (check signature, expiry, issuer, audience)
   → Return user profile (password excluded)

4. POST /api/auth/refresh { refreshToken }
   → Verify refresh token
   → Generate new access token (7 days)
   → Return new token
```

### A. Chargement d'une Map

```
GET /api/maps/:id/nodes
→ Rate limiting check (100 req/min)
→ Zod validation (UUID format)
→ Backend récupère tous les nœuds avec mapId (eager loading)
→ Frontend convertit en structure Vue Flow
→ Winston log request (status, duration, IP)
→ Test: Vérifie la structure retournée
```

### B. Déplacement d'un Nœud

```
1. Event onNodeDragStop capture nouvelles coordonnées
2. PATCH /api/nodes/:id/position { posX, posY }
   → Rate limiting check
   → Zod validation (posX/posY must be finite numbers)
   → Winston log update
3. Sequelize: Node.update({ posX, posY })
4. Debounce côté frontend (300ms recommandé)
→ Test: Mock drag event, vérifie API call
```

### C. Suppression

```
DELETE /api/nodes/:id
→ Rate limiting check
→ Zod validation (UUID)
→ NodeService.deleteNodeTree(id)
   → Recursive function finds all descendants
   → Deletes node + all children in single query
→ Winston log deletion
→ Test: Vérifie cascade, vérifie intégrité DB
```

### D. Création

```
POST /api/nodes { label, posX, posY, parentId?, mapId }
→ Rate limiting check
→ Zod validation (schema enforcement)
   → label: string (1-255 chars)
   → posX/posY: finite numbers
   → parentId: UUID or null
   → mapId: UUID (required)
→ Sequelize: Node.create()
→ Winston log creation
→ Retour avec ID généré
→ Test: Vérifie création, vérifie validation
```

### E. Édition

```
PATCH /api/nodes/:id/label { label }
→ Rate limiting check
→ Zod validation (label: non-empty string, max 255)
→ Mise à jour du contenu textuel
→ Winston log update
→ Test: Vérifie mise à jour, vérifie validation
```

## Optimisations Techniques

### Performance Base de Données

- **Index**: Sur `parentId`, `mapId`, `userId`
- **Requêtes récursives**: CTE pour récupérer l'arborescence complète
- **Connection pooling**: Configuration Sequelize optimisée
- **Query optimization**: EXPLAIN ANALYZE sur requêtes complexes
- **Eager loading**: MapService.getMapWithNodes() récupère map + tous les nodes en 1 query

### Frontend

- **Debouncing**: Limiter les appels API lors du drag (DRY utility)
- **Optimistic UI**: Mise à jour immédiate avant confirmation serveur
- **Lazy loading**: Si nombreux nœuds (>1000)
- **Virtual scrolling**: Pour listes longues (dashboard)
- **Code splitting**: Routes et composants lazy-loaded

### Code Quality

- **ESLint**: Règles strictes + Prettier
- **TypeScript**: Type safety partout (à migrer)
- **Husky**: Pre-commit hooks (lint, test, format)
- **Conventional Commits**: Standardisation des commits
- **CI/CD**: Tests automatiques sur chaque PR

## Architecture DRY Examples

### Composable réutilisable (Frontend)

```javascript
// composables/useApiCall.js (DRY)
export function useApiCall() {
  const loading = ref(false)
  const error = ref(null)

  async function execute(apiFunc, ...args) {
    loading.value = true
    error.value = null
    try {
      return await apiFunc(...args)
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  return { loading, error, execute }
}

// Usage partout
const { loading, error, execute } = useApiCall()
await execute(nodeService.create, nodeData)
```

### Service Layer (Backend)

```javascript
// services/BaseService.js (DRY)
class BaseService {
  constructor(model) {
    this.model = model
  }

  async findAll(where = {}) {
    return this.model.findAll({ where })
  }

  async findById(id) {
    return this.model.findByPk(id)
  }

  async create(data) {
    return this.model.create(data)
  }

  async update(id, data) {
    return this.model.update(data, { where: { id } })
  }

  async delete(id) {
    return this.model.destroy({ where: { id } })
  }
}

// services/NodeService.js
class NodeService extends BaseService {
  constructor() {
    super(Node) // Hérite de toutes les méthodes CRUD
  }

  // Méthodes spécifiques aux nodes
  async getNodesByMap(mapId) {
    return this.findAll({ mapId })
  }

  async deleteNodeTree(nodeId) {
    // Recursive cascade delete
    const getAllDescendantIds = async id => {
      const children = await this.getChildren(id)
      let descendantIds = []

      for (const child of children) {
        descendantIds.push(child.id)
        descendantIds = descendantIds.concat(
          await getAllDescendantIds(child.id)
        )
      }

      return descendantIds
    }

    const descendantIds = await getAllDescendantIds(nodeId)
    const allIdsToDelete = [nodeId, ...descendantIds]

    return this.model.destroy({
      where: { id: { [Op.in]: allIdsToDelete } },
    })
  }
}
```

### Zod Validation Schemas

```javascript
// validators/node.schema.js
import { z } from 'zod'

export const createNodeSchema = z.object({
  label: z
    .string()
    .min(1, 'Label cannot be empty')
    .max(255, 'Label must be at most 255 characters')
    .optional()
    .default('New Node'),
  posX: z
    .number()
    .finite('Position X must be a valid number')
    .optional()
    .default(0),
  posY: z
    .number()
    .finite('Position Y must be a valid number')
    .optional()
    .default(0),
  parentId: z
    .string()
    .uuid('Invalid parent node ID format')
    .nullable()
    .optional(),
  mapId: z.string().uuid('Invalid map ID format'),
})

// Usage in routes
router.post('/', validateBody(createNodeSchema), nodeController.createNode)
```

### Winston Logging

```javascript
// config/logger.js
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
})

// Usage
logger.info('Server running', { port: 3000 })
logger.error('Database error', { error: err.message })
logger.warn('Rate limit exceeded', { ip: ctx.ip })
```

## Évolutions Futures

### Phase 2

- ✅ **Auto-layout**: Intégration de Dagre pour réorganisation automatique
- ✅ **Export**: PNG/PDF/JSON via html-to-image + jspdf
- ✅ **Thèmes**: Multiples thèmes DaisyUI
- ⏳ **Collaboratif**: WebSockets pour édition temps réel multi-utilisateurs

### Phase 3

- **Partage**: Liens publics/privés vers les cartes
- **Templates**: Modèles de mindmaps pré-configurés
- **Historique**: Versioning et undo/redo
- **AI Integration**: Suggestions de structure via LLM

## Commandes de Développement

### Installation

```bash
npm install                    # Install all dependencies
```

### Développement

```bash
npm run dev:frontend          # Démarrer Vue.js + Vite (port 5173)
npm run dev:backend           # Démarrer Koa.js (port 3000)
npm run dev                   # Démarrer les deux simultanément
```

### Tests

```bash
npm run test                  # Tous les tests
npm run test:unit             # Tests unitaires
npm run test:integration      # Tests d'intégration
npm run test:e2e              # Tests E2E
npm run test:coverage         # Coverage report
npm run test:watch            # Watch mode
```

### Base de Données

```bash
npm run db:migrate            # Exécuter les migrations
npm run db:seed               # Charger les données de test
npm run db:reset              # Reset + migrate + seed
```

### API Documentation

```bash
# Swagger UI (interactive docs)
http://localhost:3000/api-docs

# OpenAPI JSON spec
http://localhost:3000/api-docs.json
```

### Quality

```bash
npm run lint                  # ESLint check
npm run lint:fix              # ESLint auto-fix
npm run format                # Prettier format
npm run type-check            # TypeScript check
```

## Conventions de Code

### Naming

- **Composants Vue**: PascalCase (ex: `NodeEditor.vue`)
- **Composables**: `use` prefix (ex: `useNode.js`)
- **Fichiers JS**: camelCase (ex: `nodeService.js`)
- **API Routes**: kebab-case (ex: `/api/mind-maps`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types TS**: PascalCase (ex: `NodeType`)

### Structure des Commits (Conventional Commits)

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `test`: Ajout/modification de tests
- `refactor`: Refactoring (DRY improvements)
- `docs`: Documentation
- `style`: Formatting, missing semi colons, etc.
- `perf`: Performance improvements
- `chore`: Maintenance

### Comments

- **Language**: ALL comments MUST be written in English
- **Functions**: Document complex functions with JSDoc
- **Inline**: Use inline comments sparingly, only when logic is not self-evident
- **TODOs**: Format as `// TODO: description` or `// FIXME: description`

Example:

```javascript
/**
 * Creates a new node in the database
 * @param {Object} nodeData - Node data to create
 * @param {string} nodeData.label - Node label
 * @param {number} nodeData.posX - X position
 * @param {number} nodeData.posY - Y position
 * @returns {Promise<Object>} Created node
 */
async function createNode(nodeData) {
  // Validate required fields before creating
  if (!nodeData.label) {
    throw new Error('Label is required')
  }

  return await Node.create(nodeData)
}
```

### Tests Naming

```javascript
// Pattern: describe > it > expect
describe('NodeService', () => {
  describe('create', () => {
    it('should create a node with valid data', async () => {
      const node = await nodeService.create(validData)
      expect(node.id).toBeDefined()
    })

    it('should throw error with invalid data', async () => {
      await expect(nodeService.create(invalidData)).rejects.toThrow()
    })
  })
})
```

## Métriques de Qualité (SOTA)

### Objectifs

- **Code Coverage**: > 80%
- **Test Pass Rate**: 100%
- **Type Coverage**: 100% (TypeScript strict mode)
- **Linting**: 0 errors, 0 warnings
- **Performance**:
  - Lighthouse Score > 90
  - First Contentful Paint < 1.5s
  - Time to Interactive < 3s
- **Accessibility**: WCAG 2.1 AA compliant
- **Bundle Size**: Frontend < 500kb (gzipped)

### Monitoring

- **Winston**: File-based logging with rotation
- **Sentry**: Error tracking (à implémenter)
- **Analytics**: User behavior (à implémenter)
- **Performance monitoring**: Core Web Vitals (à implémenter)

## Tailwind CSS Configuration

### Theme Customization

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'mindmap-primary': '#667eea',
        'mindmap-secondary': '#764ba2',
      },
      animation: {
        'node-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'retro'],
  },
}
```

## DaisyUI Components Usage

### Composants principaux

- **btn**: Boutons avec variants (primary, secondary, ghost, etc.)
- **card**: Cartes pour afficher les mindmaps
- **modal**: Dialogues pour édition
- **input**: Champs de formulaire
- **dropdown**: Menus contextuels
- **alert**: Messages d'erreur/succès
- **loading**: Spinners et skeletons
- **tooltip**: Info-bulles
- **drawer**: Navigation latérale
- **navbar**: En-tête de l'application

## Références

### Documentation

- [Vue.js](https://vuejs.org/)
- [Vue Flow](https://vueflow.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Vitest](https://vitest.dev/)
- [Koa.js](https://koajs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Playwright](https://playwright.dev/)
- [Zod](https://zod.dev/)
- [Winston](https://github.com/winstonjs/winston)
- [Swagger/OpenAPI](https://swagger.io/specification/)

### Best Practices

- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Testing Best Practices](https://testingjavascript.com/)
- [DRY Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
