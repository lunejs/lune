# Lune Framework - Installation & Setup Guide

This guide walks you through setting up a new Lune project from scratch, including the server, admin UI client, database configuration, and production deployment.

## Prerequisites

- Node.js (v18 or higher recommended)
- Yarn
- PostgreSQL database

## Project Structure

After completing the setup, your project structure will look like this:

```
my-lune-app/
├── client/                    # Vite + React admin UI
│   ├── src/
│   │   ├── main.tsx
│   │   └── index.css
│   ├── tsconfig.app.json
│   └── vite.config.ts
├── scripts/
│   ├── migrations.ts
│   └── .env.migration
├── index.ts                   # Server entry point
├── .env
├── tsconfig.json
└── package.json
```

---

## 1. Initialize the Project

Create a new directory and initialize a Node.js project:

```bash
mkdir my-lune-app
cd my-lune-app
yarn init -y
```

---

## 2. Install Server Dependencies

Install the core Lune packages and required dependencies:

```bash
yarn add @lunejs/core @lunejs/admin-ui dotenv ts-node typescript
```

Install development dependencies:

```bash
yarn add -D @types/node rimraf
```

---

## 3. Configure TypeScript

Create a `tsconfig.json` file in the project root:

```jsonc
{
  "compilerOptions": {
    "module": "commonjs",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "target": "es2019",
    "strict": true,
    "sourceMap": false,
    "skipLibCheck": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "jsx": "react-jsx",
  },
  "exclude": ["node_modules"],
}
```

---

## 4. Create the Server Entry Point

Create an `index.ts` file in the project root:

```typescript
import {
  AdminUiServerPlugin,
  AssetServerPlugin,
  DefaultImageProcessor,
  LocalStorageProvider,
  LuneServer,
  DefaultOrderCodeStrategy,
  OrderPriceDiscountHandler,
  ProductDiscountHandler,
  FreeShippingDiscountHandler,
  FlatShippingHandler,
  DummyPaymentHandler,
  DefaultFulfillmentCodeStrategy,
} from '@lunejs/core';
import { config } from 'dotenv';

config();

const luneServer = new LuneServer({
  app: { port: Number(process.env.PORT) ?? 8080 },
  auth: {
    jwtExpiresIn: Number(process.env.JWT_EXPIRATION) ?? 604800,
    jwtSecret: process.env.JWT_SECRET ?? 'secret',
  },
  db: {
    url: process.env.DATABASE_URL ?? '',
  },
  assets: {
    imageProcessor: new DefaultImageProcessor(),
    storageProvider: new LocalStorageProvider('http://localhost:8080'),
  },
  discounts: {
    handlers: [
      OrderPriceDiscountHandler,
      ProductDiscountHandler,
      FreeShippingDiscountHandler,
    ],
  },
  orders: {
    codeStrategy: new DefaultOrderCodeStrategy(),
    fulfillmentCodeStrategy: new DefaultFulfillmentCodeStrategy(),
  },
  shipping: {
    handlers: [new FlatShippingHandler()],
  },
  payments: {
    handlers: [DummyPaymentHandler],
  },
  logger: {
    levels: ['*'],
  },
  plugins: [new AssetServerPlugin(), new AdminUiServerPlugin()],
});

luneServer.start();
```

---

## 5. Configure Environment Variables

Create a `.env` file in the project root:

```dotenv
PORT=8080
JWT_EXPIRATION=604800
JWT_SECRET=your-super-secret-key-change-in-production
DATABASE_URL=postgres://rw_lune_user:your_password@localhost:5432/my_lune_app
```

> **Important:** Replace `your-super-secret-key-change-in-production` with a secure secret and update the database credentials accordingly.

---

## 6. Set Up Database Migrations

Create a `scripts` directory and add the migration files:

```bash
mkdir scripts
```

Create `scripts/migrations.ts`:

```typescript
import * as path from 'path';

import { LuneMigration } from '@lunejs/core';
import { config } from 'dotenv';

config({ path: path.resolve(process.cwd(), './scripts/.env.migration') });

const luneMigration = new LuneMigration(process.env.DATABASE_URL as string);

luneMigration
  .runMigrations()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));
```

Create `scripts/.env.migration`:

```dotenv
DATABASE_URL="postgres://postgres:postgres@localhost:5432/my_lune_app"
```

> **Note:** This file uses admin credentials (e.g., `postgres` user) since migrations require elevated privileges to create tables and schemas.

---

## 7. Create the Admin UI Client

Use Vite to scaffold a React TypeScript application:

```bash
yarn create vite client --template react-ts
cd client
```

### Install Client Dependencies

```bash
yarn add @fontsource-variable/geist @lunejs/admin-ui
yarn add -D @tailwindcss/vite tailwindcss tw-animate-css
```

### Configure Vite

Replace the contents of `client/vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
});
```

### Configure the Main Entry Point

Replace the contents of `client/src/main.tsx`:

```tsx
import '@fontsource-variable/geist';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@lunejs/admin-ui';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App config={{ apiUrl: 'http://localhost:8080' }} />
  </StrictMode>
);
```

### Add the Styles

Replace the contents of `client/src/index.css`:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

/**
 * Import styles from @lune/admin-ui package
 * This ensures that all Tailwind classes used in admin-ui are scanned
 */
@source "../../node_modules/@lunejs/admin-ui/dist/**/*.js";
@source "../../node_modules/@lunejs/ui/dist/**/*.js";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-distinct: var(--distinct);
  --color-distinct-foreground: var(--distinct-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --distinct: oklch(62.3% 0.214 259.815);
  --distinct-foreground: oklch(54.6% 0.245 262.881);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  --warning: oklch(0.852 0.199 91.936);
  --warning-foreground: oklch(0.421 0.095 57.708);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --distinct: oklch(54.6% 0.245 262.881);
  --distinct-foreground: oklch(62.3% 0.214 259.815);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
  --warning: oklch(0.795 0.184 86.047);
  --warning-foreground: oklch(0.421 0.095 57.708);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Geist Variable', sans-serif;
  }

  html {
    color-scheme: light;
  }

  html.dark {
    color-scheme: dark;
  }

  body,
  button,
  input {
    -webkit-font-smoothing: antialiased;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
  }

  textarea {
    resize: none;
    field-sizing: content;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: 0.3s fadeIn;
}

.quick-fade-in {
  animation: 0.1s fadeIn;
}
```

Go back to the project root:

```bash
cd ..
```

---

## 8. Add NPM Scripts

Update your root `package.json` to include the following scripts:

```json
{
  "scripts": {
    "client:dev": "cd ./client && yarn dev",
    "server:dev": "ts-node index.ts",
    "migrate": "ts-node ./scripts/migrations.ts",
    "server:build": "rimraf dist && tsc -p build.tsconfig.json",
    "client:build": "cd ./client && yarn build",
    "start": "node dist/index.js"
  }
}
```

---

## 9. Database Setup

### Create the Database

Connect to PostgreSQL and create a new database:

```sql
CREATE DATABASE my_lune_app;
```

### Run Migrations

Ensure your `scripts/.env.migration` file has admin credentials, then run:

```bash
yarn migrate
```

### Create the Application User with RLS Permissions

After migrations complete successfully, execute the following SQL to create a dedicated user with Row-Level Security (RLS) permissions:

```sql
-- 1. Create the application user
CREATE USER rw_lune_user WITH PASSWORD 'your_secure_password';

-- 2. Grant privileges on the database
GRANT ALL PRIVILEGES ON DATABASE "my_lune_app" TO rw_lune_user;

-- 3. Grant privileges on all existing objects in the schema
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO rw_lune_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO rw_lune_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO rw_lune_user;

-- 4. Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO rw_lune_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO rw_lune_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO rw_lune_user;

-- 5. Grant usage on the schema
GRANT USAGE ON SCHEMA public TO rw_lune_user;
```

> **Security Note:** Replace `your_secure_password` with a strong, unique password. Update the `DATABASE_URL` in your `.env` file with this user's credentials.

---

## 10. Running the Application

### Development Mode

Start the server:

```bash
yarn server:dev
```

In a separate terminal, start the client:

```bash
yarn client:dev
```

The server will be available at `http://localhost:8080` and the admin UI at `http://localhost:5173` (Vite's default port).

### Production Build

Build both server and client:

```bash
yarn server:build
yarn client:build
```

Start the production server:

```bash
yarn start
```

---

## Troubleshooting

### Fontsource Module Error

If you encounter the following TypeScript error:

```
Cannot find module '@fontsource-variable/geist' or its corresponding type declarations.ts(2307)
```

Update `client/tsconfig.app.json` and set:

```jsonc
{
  "compilerOptions": {
    // ... other options
    "noUncheckedSideEffectImports": false,
  },
}
```
