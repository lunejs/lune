import express from 'express';
import { AdminApi } from './api/admin/admin.api';
import { createConnection } from './persistence/connection';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.local`, quiet: true });

const app = express();
const port = 3000;

const database = createConnection();

const adminApi = new AdminApi(database);

app.use(adminApi.handler);

app.listen(port, () => {
  console.log(`Vendyx running on port ${port}`);
});
