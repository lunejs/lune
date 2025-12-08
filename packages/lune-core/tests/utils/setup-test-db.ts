import { TestUtils } from './test-utils';

async function main() {
  const testHelper = new TestUtils();
  const q = testHelper.getQueryBuilder();

  console.log('🔧 Setting up app_user...');

  await q.raw(`
    DROP USER IF EXISTS app_user;

    CREATE USER app_user WITH PASSWORD 'womteC_ruqri0_punqah';

    GRANT ALL PRIVILEGES ON DATABASE lune_test TO app_user;

    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;
    GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO app_user;

    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO app_user;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO app_user;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO app_user;

    GRANT USAGE ON SCHEMA public TO app_user;  
  `);

  await testHelper.destroyDatabase();
  console.log('✅ App user setup complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
