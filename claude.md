# MindMapper - Documentation Projet

## Vue d'ensemble
Application web permettant de créer des cartes mentales (mindmaps) interactives avec sauvegarde en temps réel.

**Objectif**: Créer une solution **State Of The Art (SOTA)** avec les meilleures pratiques de développement.

## Architecture Technique

### Stack
- **Frontend**: Vue.js + Vue Flow + Pinia + Tailwind CSS + DaisyUI
- **Backend**: Node.js + Koa.js
- **Database**: PostgreSQL + Sequelize ORM
- **Communication**: REST API
- **Testing**: Vitest (Frontend) + Jest (Backend) + Playwright (E2E)
- **UI Framework**: Tailwind CSS + DaisyUI

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
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── services/       # Business logic (DRY)
│   │   │   ├── middlewares/
│   │   │   ├── utils/          # Helpers DRY
│   │   │   └── validators/
│   │   └── tests/
│   │       ├── unit/
│   │       └── integration/
│   └── shared/            # Code partagé (DRY maximal)
│       ├── types/         # TypeScript types
│       ├── constants/
│       └── validators/
├── package.json           # Configuration workspace
└── claude.md              # Ce fichier
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
- **Middlewares réutilisables**: `errorHandler`, `validator`, `auth`
- **Base repository pattern**: CRUD générique pour tous les models
- **Query builders**: Requêtes Sequelize réutilisables

#### Shared Package
- **Types TypeScript**: Partagés entre frontend/backend
- **Validateurs**: Schémas Zod/Joi utilisables partout
- **Constants**: Valeurs magiques centralisées

### 2. Testing (Couverture > 80%)

#### Frontend Tests
```javascript
// Unit Tests (Vitest)
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

#### Backend Tests
```javascript
// Unit Tests (Jest)
- Services: nodeService.test.js
- Utils: validators.test.js

// Integration Tests (Jest + Supertest)
- API Routes: /nodes endpoints
- Database: Sequelize models
- Middlewares: errorHandler.test.js
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
- **Suppression**: Retrait d'un nœud (avec gestion de la cascade)
- **Déplacement**: Drag-and-drop avec sauvegarde automatique des positions

### 2. Arborescence
- Système de parenté: un nœud peut avoir plusieurs enfants
- Relation parent/enfant avec auto-référence en base de données

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

## Modèle de Données

### Table `nodes`
| Champ      | Type   | Description                                    |
|------------|--------|------------------------------------------------|
| id         | UUID   | Identifiant unique du nœud                     |
| label      | STRING | Texte affiché dans le nœud                     |
| posX       | FLOAT  | Coordonnée X dans le canvas                    |
| posY       | FLOAT  | Coordonnée Y dans le canvas                    |
| parentId   | FK     | Référence vers l'ID du nœud parent (NULL = racine) |
| mapId      | FK     | Référence vers la carte mentale parente        |
| createdAt  | DATE   | Date de création                               |
| updatedAt  | DATE   | Date de dernière modification                  |

### Table `maps`
| Champ      | Type   | Description                                    |
|------------|--------|------------------------------------------------|
| id         | UUID   | Identifiant unique de la carte                 |
| title      | STRING | Titre de la mindmap                            |
| userId     | FK     | Propriétaire de la carte                       |
| createdAt  | DATE   | Date de création                               |
| updatedAt  | DATE   | Date de dernière modification                  |

### Relations
- **Auto-relation**: `nodes.parentId` → `nodes.id`
- **Map-Nodes**: `nodes.mapId` → `maps.id` (CASCADE on delete)
- **User-Maps**: `maps.userId` → `users.id`

## Flux de Travail API

### A. Chargement d'une Map
```
GET /api/maps/:id/nodes
→ Backend récupère tous les nœuds avec mapId
→ Frontend convertit en structure Vue Flow
→ Test: Vérifie la structure retournée
```

### B. Déplacement d'un Nœud
```
1. Event onNodeDragStop capture nouvelles coordonnées
2. PATCH /api/nodes/:id { posX, posY }
3. Sequelize: Node.update()
4. Debounce côté frontend (300ms recommandé)
→ Test: Mock drag event, vérifie API call
```

### C. Suppression
```
DELETE /api/nodes/:id
→ Option 1: CASCADE tous les enfants
→ Option 2: Réattribuer au grand-parent
→ Test: Vérifie cascade, vérifie intégrité DB
```

### D. Création
```
POST /api/nodes { label, posX, posY, parentId?, mapId }
→ Validation des données (DRY validator)
→ Sequelize: Node.create()
→ Retour avec ID généré
→ Test: Vérifie création, vérifie validation
```

### E. Édition
```
PATCH /api/nodes/:id { label }
→ Mise à jour du contenu textuel
→ Test: Vérifie mise à jour, vérifie validation
```

## Optimisations Techniques

### Performance Base de Données
- **Index**: Sur `parentId`, `mapId`, `userId`
- **Requêtes récursives**: CTE pour récupérer l'arborescence complète
- **Connection pooling**: Configuration Sequelize optimisée
- **Query optimization**: EXPLAIN ANALYZE sur requêtes complexes

### Frontend
- **Debouncing**: Limiter les appels API lors du drag (DRY utility)
- **Optimistic UI**: Mise à jour immédiate avant confirmation serveur
- **Lazy loading**: Si nombreux nœuds (>1000)
- **Virtual scrolling**: Pour listes longues (dashboard)
- **Code splitting**: Routes et composants lazy-loaded

### Code Quality
- **ESLint**: Règles strictes + Prettier
- **TypeScript**: Type safety partout
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
}
```

## Évolutions Futures

### Phase 2
- **Auto-layout**: Intégration de Dagre pour réorganisation automatique
- **Export**: PNG/PDF via html-to-image
- **Thèmes**: Multiples thèmes DaisyUI
- **Collaboratif**: WebSockets pour édition temps réel multi-utilisateurs

### Phase 3
- **Authentification**: JWT + refresh tokens
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
      await expect(nodeService.create(invalidData))
        .rejects.toThrow()
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
- **Sentry**: Error tracking
- **Analytics**: User behavior
- **Performance monitoring**: Core Web Vitals

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
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'cyberpunk'],
  }
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

### Best Practices
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Testing Best Practices](https://testingjavascript.com/)
- [DRY Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
