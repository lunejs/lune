#!/bin/bash
find src/lib/api/codegen -type f -name '*.ts' -exec sed -i '' '/\/\* eslint-disable \*\//d' {} +

npx eslint --fix src/lib/api/codegen/fragment-masking.ts \
  src/lib/api/codegen/graphql.ts \
  src/lib/api/codegen/gql.ts > /dev/null 2>&1

find src/lib/api/codegen -type f -name '*.ts' -exec sed -i '' '1s;^;/* eslint-disable */\n;' {} +

echo -e "\033[32m✔\033[0m Formatted"