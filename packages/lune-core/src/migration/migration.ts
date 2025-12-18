import kleur from 'kleur';
import path from 'path';

import { createConnection } from '@/persistence/connection/connection';
const { green } = kleur;

export class LuneMigration {
  constructor(private readonly dbUrl: string) {
    if (!dbUrl) throw new Error('No database URL provided');
  }

  async runMigrations() {
    const database = createConnection(this.dbUrl);

    const dir = path.resolve(__dirname, '../../database/migrations');

    console.log('Running migrations...');

    await database.migrate.latest({
      directory: dir,
      extension: 'ts'
    });

    console.log(green('✔'), 'Migrations applied');
  }
}
