import express from 'express';
import { AdminApi } from './api/admin/admin.api';

const app = express();
const port = 3000;

const adminApi = new AdminApi();

app.use('/graphql', adminApi.handler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
