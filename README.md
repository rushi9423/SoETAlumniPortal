# Alumni Portal for SOET — Frontend Prototype

Interactive multi-screen frontend for a Final Year Project. **No backend** — realistic demo JSON, client-side auth, and hash routing for instant preview.

## Open the prototype

1. Open `index.html` in the Open Design preview (or any modern browser).
2. On **Login**, use a quick demo account:
   - **Student:** `aarav.mehta@soet.edu` (default)
   - **Alumni:** `priya.sharma@email.com`
   - **Admin:** `admin@soet.edu`  
   Password: any value (e.g. `demo1234`)

## What’s included (16 pages)

| Route | Page |
|-------|------|
| `#/` | Landing |
| `#/login` | Login |
| `#/register` | Student / Alumni registration |
| `#/student` | Student dashboard |
| `#/alumni` | Alumni dashboard |
| `#/admin` | Admin dashboard |
| `#/directory` | Alumni directory (search, filters, pagination) |
| `#/jobs` | Job portal |
| `#/internships` | Internship portal |
| `#/events` | Event management |
| `#/chat` | Chat UI |
| `#/profile` | User profile |
| `#/notifications` | Notifications |
| `#/settings` | Settings (theme, prefs) |
| `#/about` | About |
| `#/contact` | Contact |

Plus alumni post-job / post-internship / mentor requests and admin verify / manage / reports screens.

## Features

- Responsive layout (mobile sidebar drawer + desktop app chrome)
- Dark / light theme (persisted)
- Role-based navigation
- Search, filters, pagination
- Loading skeletons, empty states, toasts
- Demo charts on dashboards
- Forms with client-side validation

## Prototype folder structure (this delivery)

```
.
├── index.html          # Full interactive SPA (React 18 + Babel in-browser)
├── brand-spec.md       # Design tokens & posture
├── critique.json       # Self-critique score
└── README.md           # This file
```

## Mapping to a Vite + React production scaffold

When you move to a real repo, mirror this structure:

```
src/
  components/     # Navbar, Sidebar, Cards, Modal, Tables, …
  pages/          # One file per route above
  layouts/        # PublicLayout, AppLayout
  hooks/          # useTheme, useToast, useAuth
  context/        # AuthContext, ThemeContext
  data/           # jobs.json, alumni.json, events.json, …
  services/       # api.js (fetch wrappers)
  utils/
  routes/         # React Router config
```

### Suggested install (when you scaffold Vite)

```bash
npm create vite@latest soet-alumni-portal -- --template react
cd soet-alumni-portal
npm install
npm install react-router-dom react-icons framer-motion
npm install -D tailwindcss @tailwindcss/vite
npm run dev
```

Commands:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |

## Future backend integration points

| UI action | Suggested API |
|-----------|----------------|
| Login / register | `POST /api/auth/login`, `POST /api/auth/register` |
| Session | `GET /api/auth/me` + JWT/cookie |
| Alumni directory | `GET /api/alumni?q=&branch=&page=` |
| Jobs / apply | `GET /api/jobs`, `POST /api/jobs/:id/apply` |
| Internships | `GET /api/internships`, `POST /api/internships` |
| Events / register | `GET /api/events`, `POST /api/events/:id/register` |
| Chat | WebSocket or `GET/POST /api/conversations/:id/messages` |
| Mentor requests | `GET/PATCH /api/mentorship/requests` |
| Admin verify | `GET /api/admin/alumni/pending`, `POST …/verify` |
| Notifications | `GET /api/notifications`, `PATCH …/read` |
| Contact | `POST /api/contact` |
| Reports export | `GET /api/admin/reports/*.csv` |

Replace in-memory arrays in `index.html` (or `src/data/*`) with `services/api.js` calls. Keep the same component contracts so UI does not need a redesign.

## Brand

- Primary: `#2563EB`
- Secondary: `#0F172A`
- Success / verified: `#22C55E`
- See `brand-spec.md` for OKLch tokens and posture rules.

## Note for evaluators

All metrics and listings are **labelled demo data** for the FYP frontend. No real authentication or server-side admin logic is implemented.
