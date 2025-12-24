# MyFlix Client (Vite + React)

A React single-page application scaffolded with Vite. Implements state-based routing, authentication mock, profile management, and basic movie views.

## Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL to your API endpoint (local dev: http://localhost:5002)

# Start development server (Vite will choose 5173 or next open port)
npm run dev

# Build for production
npm run build

# Preview production build
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
- **Authentication**: Login & Signup with JWT tokens
- **Routing**: React Router with protected routes (redirect unauthenticated users)
- **Navigation Bar**: Conditional links based on auth status, modern diagonal styling
- **Movie Browsing**: Home page lists all movies from API
- **Movie Details**: Dedicated page for each movie with full information
- **Favorites**: Add/remove movies to favorites (synced with backend)
- **Profile Management**: 
  - View user information
  - Edit email, birthday, and password
  - Delete account (deregister)
  - View and manage favorite movies list
- **Persistent Sessions**: User auth and favorites stored in localStorage
- **Responsive Design**: Bootstrap 5 styling throughout

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
- Ensure the backend API is running before starting the client
- API calls are made to the URL specified in `VITE_API_BASE_URL` environment variable
- Movies, users, and favorites are stored in MongoDB via the API
- Authentication uses JWT tokens stored in localStorage
- The app uses React Router v7 for client-side routing
- Bootstrap 5 is used for styling

## API Endpoints Used
- `POST /login` - Authenticate user
- `POST /users` - Register new user
- `GET /users/:username` - Get user profile
- `PUT /users/:username` - Update user profile
- `DELETE /users/:username` - Delete user account
- `GET /movies` - Get all movies
- `POST /users/:username/movies/:movieId` - Add movie to favorites
- `DELETE /users/:username/movies/:movieId` - Remove movie from favorites

## Git
- Main development branch: `main`
- Create feature branches for new work
- Ensure `.gitignore` excludes `node_modules/`, `dist/`, and `.env`

## Next Steps
- Ensure backend API is running and accessible
- Seed database with movie data
- Test all features end-to-end
- Deploy to production (consider Netlify for client, Render/Railway for API)
