-- 0. Drop the user (If is already created, omit this step)
DROP USER IF EXISTS lune_server_user;

-- 1. Create the user (If is already created, omit this step)
CREATE USER lune_server_user WITH PASSWORD 'womteC_ruqri0_punqah';

-- 2. Grant all privileges on the database -- `railway` instead of `lune` in prod
GRANT ALL PRIVILEGES ON DATABASE "lune_server" TO lune_server_user;

-- 3. Grant all privileges on all tables, sequences, and functions in the schema
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO lune_server_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO lune_server_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO lune_server_user;

-- 4. Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO lune_server_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO lune_server_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO lune_server_user;

-- 5. Grant usage on the schema https://stackoverflow.com/a/67276542
GRANT USAGE ON SCHEMA public TO lune_server_user;