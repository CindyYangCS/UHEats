# UHEats

## Frontend / Mobile

Expo (React Native framework) — builds web + iOS (+ Android) from one codebase
Expo Router — file-based routing (replaces React Router)
React + TypeScript — component logic and typing
StyleSheet (React Native's built-in styling) or NativeWind (Tailwind-style classes for RN) — your choice, no separate CSS files
React's built-in state (useState/useContext) — no Redux, no Zustand, no external state library
Expo Go — app on your phone for live testing during development (no Apple Developer account needed yet)

## Backend

Node.js + Express — REST API server
TypeScript — same as frontend, shared types possible between client/server
Cheerio (or a direct JSON API call, if the Dine On Campus site has one under the hood) — scraping dining hall menu data
A scheduler for the scraper — node-cron (or your host's scheduled/cron job feature) to run scrapes periodically

## Database

PostgreSQL — relational database
Prisma — ORM + schema/migrations (replaces MikroORM)
Prisma Studio — GUI for browsing/debugging your data

## Hosting / Deployment

Vercel — hosting the Expo web build (and/or the frontend generally)
Railway or Render — hosting the Express API + PostgreSQL database

## Version control / collaboration

Git + GitHub — you already used this at NASA (via GitLab there, but same concepts)
