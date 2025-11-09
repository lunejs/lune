#!/bin/bash

docker-compose up -d --build

npx knex migrate:latest --env test --knexfile ./database/knexfile.ts

npx ts-node -r tsconfig-paths/register tests/utils/setup-test-db.ts

yarn jest --config=./jest/jest.config.js --runInBand $@

docker-compose down -v  
