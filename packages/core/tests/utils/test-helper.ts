import knex from 'knex';
import * as bcrypt from 'bcrypt';
import { Database } from '@/persistence/connection';
import { Fixture } from './fixtures';

export class TestHelper {
  private db: Database;

  static Regex = {
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
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

  async loadFixtures(fixtures: Fixture[]) {
    if (!this.db) {
      throw new Error('Database connection is not initialized.');
    }

    for (const { table, fixtures: data } of fixtures) {
      if (!data.length) return;

      await this.db(table).insert(data);
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, bcrypt.genSaltSync());
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
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
