import express from 'express';
import { AdminApi } from './api/admin/admin.api';
import { createConnection } from './persistence/connection';
import dotenv from 'dotenv';
import { Logger } from './logger/logger';

Logger.banner('v0.0.1');

dotenv.config({ path: `.env.local`, quiet: true });
Logger.ready('Environment loaded from .env.local');

const app = express();
const port = 3000;

const database = createConnection();

const adminApi = new AdminApi(database);

app.use(adminApi.handler);

app.listen(port, () => {
  Logger.ready('Ready at http://localhost:3000');
});
