import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from 'knex';

import type { Database, Transaction } from '@/persistence/connection';

import { FixtureDefaults } from './default-fixtures';
import type { Fixture } from './fixtures';
import { TEST_VENDYX_CONFIG } from './test-config';

export class TestHelper {
  private db: Database;
  private trx: Transaction;

  static Regex = {
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  };

  constructor() {
    this.db = this.connect();
  }

  async resetDatabase() {
    if (this.trx) await this.trx.rollback();

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

  async generateTrx() {
    if (!this.db) {
      throw new Error('Database connection is not initialized.');
    }

    this.trx = await this.db.transaction();

    return this.trx;
  }

  async loadFixtures(fixtures: Fixture[]) {
    if (!this.db) {
      throw new Error('Database connection is not initialized.');
    }

    for (const fixture of fixtures) {
      const partialEntities = await fixture.build();

      const entitiesWithDefaults = partialEntities.map(entity => {
        const defaults = FixtureDefaults[fixture.table]();

        if (!defaults) throw new Error('No defaults found for fixture table: ' + fixture.table);

        return { ...defaults, ...entity };
      });

      await this.db(fixture.table).insert(entitiesWithDefaults);
    }
  }

  static generateJWT(payload: Record<string, any>): string {
    return jwt.sign(payload, TEST_VENDYX_CONFIG.auth.jwtSecret ?? '');
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
