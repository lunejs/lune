#!/bin/bash

docker-compose up -d

npx knex migrate:latest --env test --knexfile ./database/knexfile.ts

npx ts-node tests/utils/setup-test-db.ts

yarn jest --config=./jest/jest.config.js $@

docker-compose down
