import { exec } from 'child_process';
import { dest, parallel, src } from 'gulp';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Copy gql schema files to dist folder
 * This is needed to make the schema file available for the reference in the graphql module when used in the server package
 * This is because the schema files are not copied to the dist folder by default
 * And when trying to reference for the graphql module it will not be found and it will throw an error
 */
export const copySchemaToDistFolder = () => {
  const stream = src('../src/**/*.gql');

  return stream.pipe(dest('../dist/src'));
};

/**
 * Compile database migrations from TypeScript to JavaScript
 */
export const compileDatabaseMigrations = async () => {
  await execAsync(
    'tsc ../database/migrations/*.ts ../database/knexfile.ts --outDir ../dist/database --module commonjs --moduleResolution node'
  );
};

export const postBuild = parallel(copySchemaToDistFolder, compileDatabaseMigrations);
