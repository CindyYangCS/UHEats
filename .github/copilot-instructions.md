# UHEats Project Guidelines

## Build, Run, and Test

Install dependencies separately in each application:

```powershell
cd frontend
npm install
cd ..\backend
npm install
```

The backend requires a local PostgreSQL database named `uheats` and a `backend\.env` file containing `DATABASE_URL`. After changing the Prisma schema or setting up a fresh database:

```powershell
cd backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

Run the applications in separate terminals:

```powershell
# backend, http://localhost:4000
cd backend
npm run dev

# frontend, then press w for the web app
cd frontend
npx expo start
```

There is no configured automated test suite or lint script. `backend\npm test` is currently a placeholder that exits with an error, and the frontend has no `test` script. For a TypeScript-only check, run `npx tsc --noEmit` from either `backend` or `frontend`. When a test runner is added, run one test using that runner's file or test-name selector from the relevant package directory.

## Architecture

- `frontend` is an Expo/React Native application that also targets the web. Expo Router uses the filesystem under `frontend\app`: the root stack contains a top-positioned tab navigator with Home and Calculate screens. Reusable Home UI is under `frontend\components\home`.
- `backend` is an Express API written in TypeScript. `src\index.ts` owns server setup, JSON parsing, the health endpoint, and route mounting. Domain endpoints live in `src\routes`; the current resources are dining locations and food items.
- PostgreSQL is accessed only through Prisma. The schema in `backend\prisma\schema.prisma` models `DiningLocation`, `DiningHours`, and `FoodItem`, with location-owned hours and food items deleted through cascading relations. `src\lib\prisma.ts` creates the shared Prisma client using the PostgreSQL adapter.
- Prisma migrations are in `backend\prisma\migrations`, seed data is in `backend\prisma\seed.ts`, and the generated client is emitted to `backend\src\generated`. Treat generated files as build output: update the schema and regenerate rather than editing generated code.
- The frontend currently presents local mock data from `frontend\lib\mockData.ts`; its domain shapes are defined in `frontend\types\dining.ts`. When replacing mocks with API calls, preserve those shapes or update the consuming components and API response selection together.

## Repository Conventions

- Backend source uses native ESM with TypeScript and explicit `.js` extensions in relative imports. Keep that convention when adding routes, utilities, or Prisma imports.
- API routes are mounted under `/api` and use the existing resource naming (`/api/diningLocations`, `/api/foodItems`). Route handlers select the response fields explicitly and return JSON with `404` for missing resources and `500` for database failures.
- Dining locations use unique human-readable names and URL-safe unique slugs. Create slugs with the shared `backend\src\utils\slugify.ts` helper; do not duplicate slug logic.
- Database changes must be represented by a Prisma migration. After changing `backend\prisma\schema.prisma`, run `npx prisma migrate dev`; regenerate the client when needed. The seed script is create-only and may require `npx prisma migrate reset` before reseeding an existing local database.
- Keep frontend domain values aligned with the Prisma enum: `DINING_HALL`, `RESTAURANT`, `CAFE`, `MARKET`, and `VENDING_MACHINE`. Use `CATEGORY_LABELS` for display text rather than duplicating labels.
- Follow the existing project workflow: work on a branch, keep changes small, and submit changes through a pull request rather than pushing directly to `main`. Never commit `backend\.env` or database credentials.
