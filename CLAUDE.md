# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vendyx is an e-commerce platform built as a monorepo using Turborepo. It consists of a GraphQL backend (`vendyx-core`), a server application, an admin UI, and shared packages.

## Monorepo Structure

- **packages/vendyx-core**: Core backend logic (GraphQL API, database, business logic)
- **packages/vendyx-server**: Server entry point that bootstraps vendyx-core
- **packages/vendyx-admin-ui**: React admin dashboard (Vite + React 19)
- **packages/vendyx-ui**: Shared UI component library (Radix UI + Tailwind)
- **packages/vendyx-common**: Shared utilities and types
- **packages/vendyx-eslint-config**: Shared ESLint configuration

## Common Commands

### Root Level (Turborepo)
```bash
yarn dev              # Run all packages in development mode
yarn build            # Build all packages
yarn lint             # Lint all packages
yarn format           # Format code with Prettier
yarn check-types      # Type check all packages
```

### vendyx-core (packages/vendyx-core)
```bash
yarn build                    # Compile TypeScript and run post-build scripts
yarn start:dev                # Start development server with nodemon
yarn test                     # Run integration tests (requires Docker)
yarn gen:types                # Generate GraphQL TypeScript types
yarn migrate:local            # Run database migrations locally
```

### vendyx-admin-ui (packages/vendyx-admin-ui)
```bash
yarn start:dev                # Start Vite dev server
yarn build                    # Build for production
yarn test                     # Run tests with Vitest
yarn gen:types                # Generate GraphQL client types
```

### vendyx-server (packages/vendyx-server)
```bash
yarn start:dev                # Start development server with ts-node
yarn build                    # Build TypeScript
yarn start                    # Run production build
```

## Architecture

### Backend Architecture (vendyx-core)

The backend follows a layered architecture:

1. **API Layer** (`src/api/`): GraphQL APIs (Admin & Storefront)
   - `admin/`: Admin GraphQL API with resolvers and field resolvers
   - `storefront/`: Public-facing storefront GraphQL API
   - `upload/`: File upload handling
   - Uses `graphql-yoga` for GraphQL server

2. **Business Logic Layer** (`src/business/`): Domain services
   - Organized by domain (shop, user, product, variant, option, asset)
   - Each domain has services and error definitions
   - Services contain core business logic and validation

3. **Persistence Layer** (`src/persistence/`):
   - `entities/`: TypeScript entity definitions
   - `repositories/`: Data access layer (uses Knex.js)
   - `serializers/`: Convert database rows to entities
   - Uses PostgreSQL with Row Level Security (RLS)

4. **Configuration** (`src/config/`):
   - `vendyx.config.ts`: Main configuration interface
   - Asset handling (storage providers, image processors)
   - Plugin system support

5. **Plugin System** (`src/plugin/`):
   - Plugins can extend functionality via `config()` and `register()` hooks
   - Example: `AssetServerPlugin` for serving uploaded assets

### Database

- Uses **Knex.js** for query building and migrations
- PostgreSQL with Row Level Security (RLS) enabled on tables
- Migrations located in `packages/vendyx-core/database/migrations/`
- Multi-tenancy support via shop_id columns
- Connection managed through `src/persistence/connection.ts`

### GraphQL API Structure

- Two separate APIs: Admin API (`/admin-api`) and Storefront API (`/storefront-api`)
- Schema files use `.gql` extension in resolver directories
- Resolvers and field resolvers are separate classes
- Context building includes JWT authentication and database transaction support
- Custom plugins: `useTransaction()`, `useErrorLogger()`, `useQueryLogger()`

### Testing

- Integration tests using Jest and Supertest
- Tests located in `packages/vendyx-core/tests/`
- Test structure mirrors API structure (admin/ and storefront/)
- Uses Docker Compose to spin up test database
- Test helper utilities in `tests/utils/`
- Run tests with: `yarn test` (runs `scripts/it-tests.sh`)

### Frontend Architecture (vendyx-admin-ui)

- React 19 with React Router v7
- TanStack Query for data fetching
- GraphQL client using `graphql-request`
- UI components from `@vendyx/ui` package
- Tailwind CSS for styling
- Form handling with `react-hook-form` + Zod validation

## Development Workflow

### Setting Up Local Environment

1. Ensure Node.js >= 22 is installed
2. Run `yarn install` at root
3. Set up environment variables for vendyx-core (DATABASE_URL, JWT_SECRET, etc.)
4. Run database migrations: `cd packages/vendyx-core && yarn migrate:local`
5. Start development: `yarn dev` from root

### Running Tests

Tests require Docker. The test script (`packages/vendyx-core/scripts/it-tests.sh`):
1. Spins up Docker containers (test database)
2. Runs migrations
3. Executes Jest tests
4. Tears down containers

To run a specific test file:
```bash
cd packages/vendyx-core
yarn test path/to/test.test.ts
```

### Code Generation

- Backend: `yarn gen:types` generates TypeScript types from GraphQL schema
- Frontend: `yarn gen:types` generates GraphQL client types and runs formatting

### Database Migrations

Located in `packages/vendyx-core/database/migrations/`. Each migration:
- Creates a table
- Often followed by a migration enabling RLS on that table
- Uses snake_case for database columns (serializers convert to camelCase)

Create new migration:
```bash
cd packages/vendyx-core
npx knex migrate:make migration_name --env local --knexfile ./database/knexfile.ts
```

## Important Patterns

### Error Handling
- Use `ErrorResult` pattern from `src/utils/error-result`
- Services return `Result<T, ErrorType>` for operations that can fail
- GraphQL resolvers handle error results and convert to GraphQL errors

### Authentication
- JWT-based authentication via `JwtService`
- Access token passed in `Authorization` header
- Context includes authenticated user info

### Multi-tenancy
- Most tables include `shop_id` column
- RLS policies enforce tenant isolation
- Context includes `shopId` for scoping queries

### Entities & Serialization
- Database rows use snake_case
- Entities use camelCase
- Serializers in `src/persistence/serializers/` handle conversion
- Base `Entity` class provides common fields (id, createdAt, updatedAt)

## Package Manager

Uses **Yarn 1.22.22** (Yarn Classic) with workspaces.
