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

---

## Phase 1: MVP (Core Features)

### Backend API

- ✅ Implement database migrations
  - ✅ Run initial migrations (users, maps, nodes)
  - ✅ Test database schema
  - ✅ Seed development data

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

- [ ] Core Components
  - [ ] Dashboard view (list of maps)
  - [ ] Map editor view (Vue Flow canvas)
  - [ ] Node editor modal/inline
  - [ ] Navigation bar
  - [ ] Map card component

- [ ] Vue Flow Integration
  - [ ] Configure Vue Flow properly
  - [ ] Implement node dragging
  - [ ] Implement edge creation (parent-child)
  - [ ] Custom node styles with DaisyUI
  - [ ] Background pattern
  - [ ] Controls (zoom, fit view)
  - [ ] Minimap

- [ ] State Management (Pinia)
  - [ ] Maps store (CRUD operations)
  - [ ] Nodes store (CRUD + position updates)
  - [ ] Debounce position updates (300ms)
  - [ ] Optimistic UI updates

- [ ] API Integration
  - [ ] Create API client service
  - [ ] Error handling
  - [ ] Loading states
  - [ ] Success/error notifications

### Testing

- [ ] Backend Tests
  - [ ] Unit tests for services
  - [ ] Integration tests for API routes
  - [ ] Database model tests
  - [ ] Coverage > 80%

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
- [ ] Component documentation (props, events)
- [ ] Setup instructions (README)
- ✅ Environment variables documentation (.env.example)

---

## Phase 2: Enhanced Features

### UI/UX Improvements

- [ ] Auto-layout with Dagre
  - [ ] Install @vue-flow/dagre
  - [ ] Implement auto-arrange algorithm
  - [ ] Smooth transitions

- [ ] Export functionality
  - [ ] Export as PNG (html-to-image)
  - [ ] Export as PDF
  - [ ] Export as JSON

- [ ] Theme System
  - [ ] Theme selector component
  - [ ] Persist theme preference (localStorage)
  - [ ] Custom mindmap color schemes

- [ ] Advanced Node Features
  - [ ] Rich text editing (markdown support)
  - [ ] Node icons/emojis
  - [ ] Node colors
  - [ ] Node sizing options

- [ ] Keyboard Shortcuts
  - [ ] Add node (Ctrl+N)
  - [ ] Delete node (Delete)
  - [ ] Undo/Redo (Ctrl+Z/Ctrl+Y)
  - [ ] Save (Ctrl+S)

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

### Real-time Collaboration

- [ ] WebSocket integration
  - [ ] Socket.io setup
  - [ ] Live cursor tracking
  - [ ] Real-time node updates
  - [ ] Conflict resolution
  - [ ] User presence indicators

---

## Phase 3: Production Ready

### Authentication & Authorization

- ✅ User Authentication (Backend)
  - ✅ JWT implementation (access + refresh tokens)
  - ✅ Login/Register endpoints
  - ✅ Password hashing (bcrypt)
  - ✅ Refresh token mechanism
  - ✅ Protected routes middleware

- [ ] Frontend Auth
  - [ ] Login/Register forms
  - [ ] Auth guards (router)
  - [ ] Token storage (localStorage/cookies)
  - [ ] Auto-logout on token expiry

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

- [ ] Code Coverage: > 80%
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
3. Build Dashboard and Map Editor views
4. Integrate Vue Flow with Pinia stores
5. ✅ ~~Add basic error handling and validation~~
6. **NEW:** Implement frontend auth flow (login/register)
7. **NEW:** Connect frontend to backend API

### Technical Debt

- Consider migrating to full TypeScript (currently mixed JS/TS)
- Evaluate moving to pnpm for better monorepo support
- Review and update deprecated dependencies (@koa/router v13 -> v15)

### Questions/Decisions Needed

- ✅ ~~User authentication: JWT vs Session-based?~~ → **Decision: JWT with refresh tokens**
- Deployment platform: Vercel, Netlify, Railway, or self-hosted?
- Database: Continue with Docker PostgreSQL or migrate to cloud (Neon, Supabase)?
- Rate limiting: Migrate to Redis for production? (currently in-memory)
