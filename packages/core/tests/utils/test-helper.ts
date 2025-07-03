import knex from 'knex';
import { Database } from '@/persistence/connection';

export class TestHelper {
  private db: Database;

  static Regex = {
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  };

  constructor() {
    this.db = this.connect();
  }

  async resetDatabase() {
    const tables = await this.db.raw(`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public';
  `);

    for (const row of tables.rows) {
      await this.db.raw(`TRUNCATE TABLE "${row.tablename}" RESTART IDENTITY CASCADE`);
    }
  }

  async destroyDatabase() {
    if (!this.db) {
      throw new Error('Database connection is not initialized.');
    }

    await this.db.destroy();
  }

  getQueryBuilder() {
    return this.db;
  }

  static generateUUID() {
    return crypto.randomUUID();
  }

  private connect() {
    return knex({
      client: 'pg',
      connection: process.env.ADMIN_DATABASE_URL
    });
  }
}
