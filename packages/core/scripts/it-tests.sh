#!/bin/bash

docker-compose up -d

npx knex migrate:latest --env test --knexfile ./database/knexfile.ts

yarn jest --config=./jest/jest.config.js $@

docker-compose down
