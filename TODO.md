# MindMapper - TODO List

## Current Status

- ✅ Project structure setup (monorepo)
- ✅ Dependencies installed
- ✅ PostgreSQL configured (Docker)
- ✅ Database models defined (User, Map, Node)
- ✅ Basic API routes structure
- ✅ Frontend setup (Vue 3 + Vite + Tailwind + DaisyUI)
- ✅ Git repository initialized
- ✅ **Backend MVP completed with production-grade features**
- ✅ Winston logger with file rotation
- ✅ Zod validation on all endpoints
- ✅ JWT authentication system
- ✅ Swagger/OpenAPI documentation
- ✅ Rate limiting middleware
- ✅ **Testing infrastructure with DRY + mocked database (41 tests passing)**
- ✅ **Frontend MVP 100% complete** ✨
- ✅ Dashboard + Map Editor fully functional
- ✅ Toast notification system (DaisyUI + Lucide icons)
- ✅ Theme switcher (6 DaisyUI themes)
- ✅ Debounced position updates (300ms)
- ✅ DRY composables (useToast, useApiCall)
- ✅ **Authentication system (Login/Register/Guards)**
- ✅ Node editor modal (double-click)
- ✅ Context menu (right-click: edit, delete, duplicate, add child)
- ✅ Lucide icons integration (consistent design)
- ✅ **Phase 2A: DiceBear avatars + Keyboard shortcuts** ✨
- ✅ **Phase 2C: Dagre auto-layout (4 presets)** ✨
- ✅ **Bug fixes & Polish** ✨
  - ✅ Fixed UUID validation in seeders (real UUIDs)
  - ✅ Fixed user-specific maps filtering (`/maps/user/:userId`)
  - ✅ Fixed nodes data extraction (`response.data.nodes`)
  - ✅ Added PATCH route for `/nodes/:id`
  - ✅ Fixed context menu positioning (fixed instead of absolute)
  - ✅ Added `@connect` event for drag-and-drop connections
  - ✅ Fixed duplicate node edge creation
  - ✅ Toast position moved to bottom-right
  - ✅ Fixed API response unwrapping (`.data` extraction from backend)
  - ✅ Fixed route ordering (specific routes before generic /:id)
  - ✅ Added viewport overflow prevention for context menu
  - ✅ Fixed ICU plural syntax for i18n (replaced 'œ' with 'oe')
  - ✅ Added CSS rules to hide Vue Flow edge markers in exports
- ✅ **Sponsor/Support Integration** ✨
  - ✅ Footer component with minimal design
  - ✅ SponsorModal with Buy Me a Coffee/Ko-fi/GitHub Sponsors
  - ✅ Integrated into HomeView only
- ✅ **Home Page Redesign with DaisyUI** ✨
  - ✅ Modern landing page with hero, mockups, stats, features
  - ✅ 6 feature cards, 3-step guide, CTAs
  - ✅ Social proof badges and responsive design
- ✅ **Internationalization (i18n)** ✨
  - ✅ vue-i18n@9 with EN/FR translations (265 lines each)
  - ✅ LanguageSelector dropdown in Navbar
  - ✅ Browser locale detection with localStorage persistence
  - ✅ Plural support and date/time formats
  - ✅ Full coverage: home, maps, editor, auth, toasts
- ✅ **Export Functionality** 💾
  - ✅ html-to-image + jspdf libraries installed
  - ✅ Export utility for PNG/PDF/JSON
  - ✅ ExportModal component with 3 format options
  - ✅ i18n support (EN/FR translations)
  - ✅ High-resolution PNG (2x scale) export
  - ✅ PDF export with auto-orientation
  - ✅ JSON export for backup/import
- ✅ **Phase 2E: Custom Node Styles with DaisyUI** ✨
  - ✅ Created node style presets system (colors, shapes, styles)
  - ✅ Created CustomNode.vue component for Vue Flow
  - ✅ Created NodeStyleSelector component with live preview
  - ✅ Updated Node model with style fields (styleColor, styleShape, styleType)
  - ✅ Updated Zod validation schemas for node styles
  - ✅ Database migration applied (add-node-styles.cjs)
  - ✅ Integrated style selector in NodeEditorModal
  - ✅ Updated stores to handle node styles
  - ✅ Fixed controller to save style fields (updateNode, createNode)
  - ✅ Added text rotation option for diamond shape (horizontal/follow)
  - ✅ Database migration for textRotation field (add-text-rotation.cjs)
  - ✅ Fixed Vue reactivity warning (markRaw for nodeTypes)
  - ✅ 8 color presets (primary, secondary, accent, neutral, info, success, warning, error)
  - ✅ 4 shape presets (rectangle, rounded, pill, diamond)
  - ✅ 4 style presets (solid, outline, ghost, filled)
- ✅ **Phase 2F: Node Icons with Emoji Picker** ✨
  - ✅ Added icon field to Node model (STRING, nullable)
  - ✅ Created IconPicker component with 30 emojis + custom input
  - ✅ Updated Zod validation for icon field
  - ✅ Database migration applied (add-node-icon.cjs)
  - ✅ Updated controllers (createNode, updateNode) to handle icon
  - ✅ Integrated IconPicker in NodeEditorModal
  - ✅ Display icons in CustomNode component (with margin)
  - ✅ Updated stores to handle icons (convertNodeToVueFlow)
  - ✅ Updated MapEditorView saveNodeLabel to pass icon
  - ✅ i18n support (en/fr)

---

## Phase 1: MVP (Core Features)

### Backend API

- ✅ Implement database migrations
  - ✅ Run initial migrations (users, maps, nodes)
  - ✅ Test database schema
  - ✅ Seed development data
  - ✅ add-node-styles migration (styleColor, styleShape, styleType)
  - ✅ add-text-rotation migration (textRotation for diamond nodes)

- ✅ Complete API Controllers
  - ✅ Users endpoints (CRUD)
  - ✅ Maps endpoints (CRUD)
  - ✅ Nodes endpoints (CRUD + position update)
  - ✅ Parent-child relationship management
  - ✅ Auth endpoints (register, login, refresh, me)

- ✅ Middleware Implementation
  - ✅ Error handling middleware (Winston integrated)
  - ✅ Request validation middleware (Zod)
  - ✅ CORS configuration
  - ✅ Logging middleware (Winston with file rotation)
  - ✅ Authentication middleware (JWT)
  - ✅ Rate limiting middleware (5 req/min auth, 100 req/min API)

- ✅ Business Logic (Services)
  - ✅ NodeService: cascade delete logic (recursive)
  - ✅ MapService: fetch with all nodes (eager loading)
  - ✅ Optimize queries with eager loading
  - ✅ BaseService pattern (DRY)

### Frontend UI

- ✅ **Core Components**
  - ✅ Dashboard view (list of maps) with loading/empty states
  - ✅ Map editor view (Vue Flow canvas)
  - ✅ Node editor modal (double-click to edit label)
  - ✅ Navigation bar with theme switcher (6 DaisyUI themes)
  - ✅ Map card component (rename, delete, duplicate actions)
  - ✅ Toast notification system (success, error, warning, info)
  - ✅ Node context menu (right-click actions)

- ✅ **Vue Flow Integration**
  - ✅ Configure Vue Flow properly
  - ✅ Implement node dragging with debounced save (300ms)
  - ✅ Implement edge creation (parent-child relationships)
  - ✅ Custom node styles with DaisyUI
  - ✅ Background pattern (dot grid)
  - ✅ Controls (zoom, fit view, pan)
  - ✅ Minimap

- ✅ **State Management (Pinia)**
  - ✅ Maps store (CRUD operations)
  - ✅ Nodes store (CRUD + position updates)
  - ✅ Debounce position updates (300ms)
  - ✅ Optimistic UI updates

- ✅ **API Integration**
  - ✅ Create API client service (fetch-based with auth headers)
  - ✅ Error handling with toast notifications
  - ✅ Loading states (skeletons, spinners, disabled buttons)
  - ✅ Success/error notifications

- ✅ **DRY Utilities & Composables**
  - ✅ `useToast` composable (global toast instance)
  - ✅ `useApiCall` composable (loading, error states)
  - ✅ `debounce` utility (300ms for position updates)
  - ✅ `throttle` utility (rate limiting)

### Testing

- ✅ **Backend Tests (DRY + Mocked DB)**
  - ✅ Jest configuration with ESM support
  - ✅ DRY test infrastructure (mockDb.js, testHelpers.js)
  - ✅ Database mocking (no real DB for CI/CD)
  - ✅ Unit tests for BaseService (18 tests, 83% coverage)
  - ✅ Unit tests for hash utilities (9 tests, 100% coverage)
  - ✅ Unit tests for JWT utilities (14 tests, 78% coverage)
  - ✅ Mock data factories (generateMockUser, generateMockMap, generateMockNode)
  - ✅ Test documentation (TESTING.md)
  - [ ] Unit tests for NodeService, MapService, UserService
  - [ ] Unit tests for middlewares (auth, zodValidator, rateLimiter)
  - [ ] Unit tests for controllers
  - [ ] Integration tests for API routes (with supertest)
  - [ ] Overall coverage > 80% (currently 4.78% - many files untested)

- [ ] Frontend Tests
  - [ ] Unit tests for composables
  - [ ] Component tests (Vitest + Testing Library)
  - [ ] Store tests
  - [ ] E2E tests (Playwright)
    - [ ] Create mindmap flow
    - [ ] Add/edit/delete nodes
    - [ ] Drag and drop nodes

### Documentation

- ✅ API documentation (Swagger/OpenAPI 3.0 at /api-docs)
- ✅ Testing documentation (TESTING.md)
  - ✅ Test setup guide
  - ✅ Writing tests examples
  - ✅ DRY patterns and best practices
  - ✅ Mock utilities documentation
  - ✅ Troubleshooting guide
- [ ] Component documentation (props, events)
- [ ] Setup instructions (README)
- ✅ Environment variables documentation (.env.example)

---

## Phase 2: Enhanced Features

### UI/UX Improvements

- ✅ **DiceBear Avatar Integration**
  - ✅ Install @dicebear/core and @dicebear/collection
  - ✅ Replace user initials with generated avatars
  - ✅ Avatar component (avataaars, bottts, lorelei, personas)
  - ✅ Integrated in Navbar
- [ ] Avatar customization in user profile (future)

- ✅ **Sponsor/Support Integration** 💰
  - ✅ Add "Support this project" button in Footer (HomeView only)
  - ✅ Create sponsor modal with Buy Me a Coffee, Ko-fi, GitHub Sponsors
  - ✅ Beautiful DaisyUI modal with brand colors
  - ✅ Minimal footer design (GitHub • Sponsor • Copyright)
  - ✅ "Star on GitHub" alternative option
  - ✅ Footer component created and integrated
  - ✅ SponsorModal with official brand colors (#FFDD00, #FF5E5B, #EA4AAA)
  - [ ] Add sponsor info to README
  - [ ] Update URLs with real sponsor links (TODO comments in HomeView.vue)

- ✅ **Home Page Redesign with DaisyUI** ✨
  - ✅ Hero section with gradient (primary to secondary)
  - ✅ Mockup-window component with fake stats (Ideas, Maps, Nodes)
  - ✅ "Open Source" badge
  - ✅ CTA buttons (Start Free, Sign In) with Lucide icons
  - ✅ Social proof badges (Open Source, Free Forever, Privacy First)
  - ✅ Stats section (Unlimited nodes, Auto-save, 6+ themes)
  - ✅ Features section (6 cards: Hierarchical Structure, Auto-Layout, Keyboard Shortcuts, Auto-Save, User Avatars, Themes)
  - ✅ "How It Works" steps component (3 steps: Create Account, Create Map, Collaborate)
  - ✅ Final CTA section with gradient
  - ✅ Footer and SponsorModal integration
  - ✅ Responsive design (mobile-first)
- ✅ **Internationalization (i18n)** ✨
  - ✅ Install vue-i18n@9 with DRY configuration
  - ✅ Setup language files (en.json, fr.json) with structured keys
  - ✅ Extract all hardcoded strings to i18n keys (all components)
  - ✅ LanguageSelector component in Navbar dropdown
  - ✅ Persist language preference (localStorage)
  - ✅ Date/time localization formats
  - ✅ Number localization formats
  - ✅ i18n for toast notifications
  - ✅ i18n for keyboard shortcuts modal
  - ✅ Plural support (maps count, nodes count)
  - ✅ Browser locale detection with fallback
  - ✅ Full translation coverage: home, maps, editor, auth, toasts

- ✅ **Export Functionality** 💾
  - ✅ html-to-image + jspdf libraries installed
  - ✅ Export utility for PNG/PDF/JSON
  - ✅ ExportModal component with 3 format options
  - ✅ i18n support (EN/FR translations)
  - ✅ Integration in MapEditorView dropdown menu
  - ✅ High-resolution PNG (2x scale) export
  - ✅ PDF export with auto-orientation
  - ✅ JSON export for backup/import

- [ ] **Real-time Collaboration Preview** 🚀
  - [ ] Figma-style live cursors (with user avatar/color)
  - [ ] "X users online" indicator
  - [ ] See this full implementation in Phase 2 → Real-time Collaboration section

- ✅ **Auto-layout with Dagre**
  - ✅ Install dagre library
  - ✅ Implement auto-arrange algorithm (TB, LR, Compact, Spacious presets)
  - ✅ Batch position update to backend
  - ✅ Auto fit-view after layout
  - ✅ DRY utility: applyAutoLayout()
  - [ ] Layout animation/transitions (future)

- [ ] Theme System
  - ✅ Theme selector component
  - ✅ Persist theme preference (localStorage)
  - [ ] Custom mindmap color schemes
  - [ ] Per-map theme settings

- [ ] Advanced Node Features
  - [ ] Collapse/Expand nodes with click
  - [ ] Rich text editing (markdown support)
  - ✅ Node icons/emojis (30 presets + custom input)
  - ✅ Node colors (8 DaisyUI color presets)
  - [ ] Node sizing options
  - ✅ Custom node shapes (rectangle, rounded, pill, diamond)

- ✅ **Keyboard Shortcuts**
  - ✅ Add node (Ctrl+N)
  - ✅ Close modal/menu (Esc)
  - ✅ Help modal (Shift+?, F1)
  - ✅ DRY composable: useKeyboardShortcuts()
  - ✅ KeyboardShortcutsModal component (beautiful modal with all shortcuts)
  - [ ] Delete node (Delete) - needs node selection first
  - [ ] Undo/Redo (Ctrl+Z/Ctrl+Y) - needs history stack
  - [ ] Save (Ctrl+S) - auto-save already implemented
  - [ ] Zoom shortcuts (Ctrl+0, Ctrl++, Ctrl+-)

### Performance Optimization

- [ ] Frontend
  - [ ] Lazy loading for large mindmaps (>1000 nodes)
  - [ ] Virtual scrolling for dashboard
  - [ ] Code splitting
  - [ ] Image optimization

- [ ] Backend
  - [ ] Query optimization
  - [ ] Response caching
  - [ ] Database indexing review
  - [ ] Connection pooling tuning

### Real-time Collaboration 🎯 HIGH PRIORITY

- [ ] **WebSocket integration**
  - [ ] Socket.io setup (backend + frontend)
  - [ ] Room management (per map ID)
  - [ ] User join/leave events
  - [ ] Heartbeat/ping-pong mechanism

- [ ] **Live Cursor Tracking (Figma-style)** ✨
  - [ ] Custom cursor component with user avatar/name
  - [ ] Smooth cursor animation (CSS transforms)
  - [ ] Different colors per user
  - [ ] Cursor position broadcasting via WebSocket
  - [ ] Throttle cursor updates (60fps max)
  - [ ] Hide cursor when user is inactive (5s timeout)
  - [ ] Cursor trails/animations (optional)

- [ ] **Real-time Node Updates**
  - [ ] Broadcast node creation/deletion/updates
  - [ ] Optimistic UI updates
  - [ ] Conflict resolution strategy (last-write-wins or OT)
  - [ ] Show "user X is editing" indicator on nodes
  - [ ] Lock mechanism for node editing (optional)

- [ ] **User Presence Indicators**
  - [ ] Active users list in Navbar
  - [ ] User avatars with online status
  - [ ] "X users viewing this map" counter
  - [ ] User activity status (viewing, editing, idle)

- [ ] **Collaborative Features**
  - [ ] Chat sidebar (optional)
  - [ ] Comments on nodes (optional)
  - [ ] Activity feed/history
  - [ ] Permissions (view-only, edit, admin)

---

## Phase 3: Production Ready

### Authentication & Authorization

- ✅ User Authentication (Backend)
  - ✅ JWT implementation (access + refresh tokens)
  - ✅ Login/Register endpoints
  - ✅ Password hashing (bcrypt)
  - ✅ Refresh token mechanism
  - ✅ Protected routes middleware

- ✅ **Frontend Auth**
  - ✅ Login/Register forms (DaisyUI + validation)
  - ✅ Auth guards (router beforeEach)
  - ✅ Token storage (localStorage: access + refresh)
  - ✅ Auto-logout on token expiry
  - ✅ Auth store (Pinia) with initializeAuth
  - ✅ Protected routes (/maps, /maps/:id)
  - ✅ Guest routes (/login, /register)
  - ✅ Navbar integration (user menu, logout)

### Sharing & Permissions

- [ ] Map Sharing
  - [ ] Public/private toggle
  - [ ] Share links with expiry
  - [ ] Permission levels (view/edit)
  - [ ] Collaborator management

- [ ] Access Control
  - [ ] Role-based permissions
  - [ ] Map ownership validation
  - [ ] API authorization middleware

### Advanced Features

- [ ] Templates System
  - [ ] Pre-built mindmap templates
  - [ ] Template gallery
  - [ ] Save custom templates

- [ ] Version History
  - [ ] Track changes (audit log)
  - [ ] Version snapshots
  - [ ] Restore previous versions
  - [ ] Diff visualization

- [ ] AI Integration
  - [ ] Auto-suggest nodes (LLM)
  - [ ] Smart organization
  - [ ] Content summarization
  - [ ] Export to outline/document

### DevOps & Deployment

- [ ] CI/CD Pipeline
  - [ ] GitHub Actions workflow
  - [ ] Automated testing
  - [ ] Build automation
  - [ ] Deployment automation

- [ ] Production Environment
  - [ ] Docker production config
  - [ ] Environment variables management
  - [ ] Database migration strategy
  - [ ] Backup strategy

- [ ] Monitoring & Logging
  - [ ] Error tracking (Sentry)
  - [ ] Performance monitoring
  - [ ] Analytics integration
  - [ ] Health check endpoints

### Security

- [ ] Security Audit
  - ✅ OWASP Top 10 review (partial)
  - ✅ SQL injection prevention (Sequelize ORM + parameterized queries)
  - ✅ XSS protection (Helmet middleware)
  - [ ] CSRF protection
  - ✅ Rate limiting (koa-ratelimit: 5 req/min auth, 100 req/min API)
  - ✅ Input sanitization (Zod validation)

- [ ] Compliance
  - [ ] GDPR compliance (data export/delete)
  - [ ] Privacy policy
  - [ ] Terms of service

---

## Quality Metrics (Target)

- 🔄 **Code Coverage: > 80%** (currently 4.78% overall)
  - ✅ BaseService: 83.33%
  - ✅ hash.js: 100%
  - ✅ jwt.js: 78.57%
  - ⏳ Controllers: 0% (not tested yet)
  - ⏳ Middlewares: 0% (not tested yet)
  - ⏳ Services (Map/Node/User): 0% (not tested yet)
- [ ] Lighthouse Score: > 90
- [ ] First Contentful Paint: < 1.5s
- [ ] Time to Interactive: < 3s
- [ ] Bundle Size: < 500kb (gzipped)
- [ ] WCAG 2.1 AA Compliance
- [ ] Zero ESLint errors/warnings
- [ ] 100% TypeScript type coverage

---

## Notes

### Priorities for Next Sprint

1. ✅ ~~Complete database migrations and seeding~~
2. ✅ ~~Implement core API endpoints (Maps + Nodes)~~
3. ✅ ~~Add basic error handling and validation~~
4. ✅ ~~Implement testing infrastructure with DRY + mocking~~
5. ✅ ~~Build Dashboard and Map Editor views~~
6. ✅ ~~Integrate Vue Flow with Pinia stores~~
7. ✅ ~~Connect frontend to backend API~~
8. ✅ ~~Complete frontend MVP (Node editor modal, delete node UI)~~
9. ✅ ~~Implement frontend auth flow (login/register/guards)~~
10. ✅ ~~Phase 2A: DiceBear avatars + Keyboard shortcuts~~
11. ✅ ~~Phase 2C: Dagre auto-layout~~
12. ✅ ~~Bug fixes & polish (UUIDs, connections, positioning)~~
13. ✅ ~~Sponsor integration (Footer + SponsorModal)~~
14. ✅ ~~Home page redesign with DaisyUI~~
15. ✅ ~~Phase 2B: i18n (vue-i18n, FR/EN translations)~~
16. ✅ ~~Phase 2D: Export features (PNG, PDF, JSON)~~
17. ✅ ~~Phase 2E: Custom node styles with DaisyUI~~
18. ✅ ~~Phase 2F: Node icons with emoji picker~~
19. **NEXT OPTIONS:**
    - **Option A:** Backend testing (increase coverage to 80%+)
    - **Option B:** Advanced node features (rich text, collapse/expand, sizing)
    - **Option C:** Real-time collaboration with Figma-style cursors (WebSockets) 🔥
    - **Option D:** Additional languages (es, de, it, pt)
    - **Option E:** Per-map theme settings

### Technical Debt

- Consider migrating to full TypeScript (currently mixed JS/TS)
- Evaluate moving to pnpm for better monorepo support
- Review and update deprecated dependencies (@koa/router v13 -> v15)
- **NEW:** Complete test coverage for all backend code (controllers, middlewares, services)
- **NEW:** Add integration tests with supertest for full API testing
- **NEW:** Jest ESM support is experimental - some complex mocking scenarios need workarounds

### Questions/Decisions Needed

- ✅ ~~User authentication: JWT vs Session-based?~~ → **Decision: JWT with refresh tokens**
- Deployment platform: Vercel, Netlify, Railway, or self-hosted?
- Database: Continue with Docker PostgreSQL or migrate to cloud (Neon, Supabase)?
- Rate limiting: Migrate to Redis for production? (currently in-memory)
