# Healthy Diet — Example Fullstack App

This repository contains a small example combining a frontend and a backend to deliver healthy-food details.

Structure:
- public/
  - index.html
  - styles.css
  - script.js
- server.js
- package.json

Quick start (local):
1. Copy the files into a project directory.
2. Place `index.html`, `styles.css`, `script.js` inside a `public/` folder next to `server.js`.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open http://localhost:3000 in your browser.

API endpoints:
- GET /api/foods — returns summary list (id, name, category, image, calories)
- GET /api/foods/:id — returns full details for a food item
- GET /api/search?q=term — returns brief matches for search term

Notes:
- The dataset is in-memory in `server.js`. Swap with a database (Mongo, Postgres) or external API when needed.
- To host the frontend on GitHub Pages and backend elsewhere, point the frontend fetch() base URL to the hosted API origin and enable CORS on the backend.
- If you'd like, I can:
  - Merge the two GitHub Pages repos you referenced into a single UI and connect them to this backend.
  - Convert this example to use a real database.
  - Add signup/login and user-specific meal plans.

Tell me which of the two repos you want merged (provide owner/repo or repo URLs) and whether you want the API hosted (Heroku, Fly, Render, Vercel, etc.) or local only — I’ll prepare the next steps or a PR.
