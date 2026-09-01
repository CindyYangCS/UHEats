# UHEats

A campus dining app for tracking macros based on meal exchanges, rotating dining hall menus, and on-campus restaurants. Will mainly be focused as a website at first, but there will be plans to expand to an iPhone app.

## Tech Stack

**Frontend**
- Expo (React Native) — runs as a website and eventually an iPhone app from the same code
- Expo Router — handles navigation between screens
- React + TypeScript
- TanStack Query — fetches data from backend

**Backend**
- Node.js + Express — API server
- TypeScript
- Cheerio — scrapes dining hall menu data

**Database**
- PostgreSQL — stores dining halls, food items, etc.
- Prisma — database with TypeScript

---

## Setup

### 1. Install required tools

- **Node.js** — (https://nodejs.org) (v24.20.0)
- **Git** — [git-scm.com](https://git-scm.com/downloads)
- **PostgreSQL** — [postgresql.org/download](https://www.postgresql.org/download/)
  - During setup, keep the default port **5432**
  - Set a password for the `postgres` user (you'll need this later)
- **Expo Go** — install this on your phone from the App Store (optional, for testing)

Verify Node and Git installed correctly by opening a terminal and running:
```bash
node -v
git -v
```
Each should print a version number.

### 2. Clone the project

```bash
git clone git@github.com:CindyYangCS/UHEats.git
cd UHEats
```

### 3. Create your local database

Open a terminal and run:
```bash
psql -U postgres
```
Enter the password you set during the PostgreSQL install. Once connected, run:
```sql
CREATE DATABASE uheats;
```
Then exit:
```sql
\q
```

### 4. Install project dependencies

You need to do this in **both** the `frontend` and `backend` folders:
```bash
cd frontend
npm install
cd ../backend
npm install
```

### 5. Set up your environment file

Inside the `backend` folder, create a new file `.env`

Put this single line inside it, replacing `<your-password>` with the password you set in step 1:

DATABASE_URL="postgresql://postgres:\<your-password>\@localhost:5432/uheats"

### 6. Set up the database tables

Still inside `backend`, run:
```bash
npx prisma migrate dev --name init
```
This creates all the tables (dining halls, food items, etc.) in your local `uheats` database.

You can double-check it worked by running:
```bash
npx prisma studio
```
This opens a browser window showing your (currently empty) database tables.

---

## Running the Project

Every time you want to work on the project, you'll run the frontend and backend in **two separate terminal windows**, both left open while you work.

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
This starts the API server at `http://localhost:4000`. You can test it's working by visiting `http://localhost:4000/api/health` in your browser — it should show `{"status":"ok"}`.

**Terminal 2 — Frontend:**
```bash
cd frontend
npx expo start
```
Once it starts, press `w` on your keyboard to open the app in your browser at `http://localhost:8081`. You should see the UHEats homepage.

To test on your phone instead, open the **Expo Go** app and scan the QR code shown in the terminal.

---

## Project Structure

```
UHEats/
├── frontend/ Expo app
├── backend/ Express API + Prisma
└── README.md
```

## Notes

- Each person on the team needs their **own** local PostgreSQL database — we are not sharing one database yet. Everyone's `.env` file is different and never gets committed to GitHub.
- If you make changes to `backend/prisma/schema.prisma` (the file that defines our database tables), run `npx prisma migrate dev` again afterward to apply the changes to your local database.