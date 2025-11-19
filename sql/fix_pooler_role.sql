-- FIX POOLER ROLE FOR SUPABASE TRANSACTION POOLING
-- Este script crea el rol del pooler con la contraseña correcta en formato MD5

-- Step 1: CREATE the pooler role
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_roles
        WHERE rolname = 'postgres.llfnkdxldxxhyqfherno'
    ) THEN
        CREATE ROLE "postgres.llfnkdxldxxhyqfherno"
        WITH LOGIN
        ENCRYPTED PASSWORD 'FLUIDEZ2025j';
        RAISE NOTICE 'Role created successfully.';
    ELSE
        RAISE NOTICE 'Role already exists, skipping create.';
    END IF;
END$$;

-- Step 2: Grant necessary permissions
GRANT CONNECT ON DATABASE postgres TO "postgres.llfnkdxldxxhyqfherno";

GRANT USAGE ON SCHEMA public TO "postgres.llfnkdxldxxhyqfherno";

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "postgres.llfnkdxldxxhyqfherno";

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "postgres.llfnkdxldxxhyqfherno";

-- Step 3: Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON TABLES TO "postgres.llfnkdxldxxhyqfherno";

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON SEQUENCES TO "postgres.llfnkdxldxxhyqfherno";

-- Step 4: Force MD5 password encryption (required for PgBouncer)
SET password_encryption = 'md5';

ALTER ROLE "postgres.llfnkdxldxxhyqfherno" WITH PASSWORD 'FLUIDEZ2025j';

-- Reset to default
SET password_encryption = 'scram-sha-256';

-- Verify the role was created
SELECT 
    rolname,
    rolcanlogin,
    rolconnlimit
FROM pg_roles 
WHERE rolname = 'postgres.llfnkdxldxxhyqfherno';
