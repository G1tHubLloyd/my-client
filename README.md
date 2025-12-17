# MyFlix Client (Vite + React)

A React single-page application scaffolded with Vite. Implements state-based routing, authentication mock, profile management, and basic movie views.

## Quick Start

```bash
# from the project root
npm install
npm run dev -- --port 5177 --host
# build & preview
npm run build
npm run preview
```

## Scripts
- `dev`: Start Vite dev server
- `build`: Production build
- `preview`: Preview the production build locally

## Tech Stack
- React 19, React Router 7
- Vite 7
- SCSS (via `sass`)

## Project Structure
```
my-client
├─ package.json
├─ vite.config.js
├─ index.html
├─ src
│  ├─ index.jsx
│  ├─ index.scss
│  ├─ App.jsx
│  └─ components
│     ├─ navigation-bar/navigation-bar.jsx
│     ├─ main-view/main-view.jsx
│     ├─ movie-card/movie-card.jsx
│     ├─ movie-view/movie-view.jsx
│     ├─ login-view/login-view.jsx
│     ├─ signup-view/signup-view.jsx
│     └─ profile-view/profile-view.jsx
```

## Features
- Routing with protected routes (redirect unauthenticated users)
- Login & Signup (mocked, persisted in `localStorage`)
- Navigation bar with conditional links and diagonal styling
- Home lists movies (mock data)
- Movie details page with favorite toggle
- Profile page: edit email/birthday, list/remove favorites; favorites now persist per user across logout via `localStorage` key `favorites:<username>`
- Profile favorites display horizontally with scroll + snap

## Routing
- `/login` — public; redirects to `/` if authenticated
- `/signup` — public; redirects to `/` if authenticated
- `/` — protected MainView
- `/movies/:movieId` — protected MovieView
- `/profile` — protected ProfileView

## Configuration
- Vite config in `vite.config.js` with React plugin.
- SCSS entry `src/index.scss` loaded from `src/index.jsx`.

## Development Notes
- Movie images currently use public poster URLs.
- Replace mock data in `src/App.jsx` and `src/components/main-view/main-view.jsx` with API calls later.
- If you only use `react-router-dom`, you can remove `react-router` from dependencies.
- Favorites persistence: stored per user in `localStorage` under `favorites:<username>` and loaded on login.
- Movie card images use `object-fit: contain` with a max height to show full posters.
- Diagonal navbar with modern hover effects

## Git
- Work happens on branch `routing-refactor`.
- Do not commit `node_modules/` or `dist/`.

## Troubleshooting
- If `npm run dev` doesn't start, ensure you're in the project folder and port 5173 isn't occupied. Vite will auto-select another port.
- If you see an "Unexpected keyword 'export'" error, ensure `export default function App()` is outside any object/array and at top-level.

## Next Steps
- Integrate real backend API for movies and auth.
- Add ESLint/Prettier.
- Optionally migrate to TypeScript.
