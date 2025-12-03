#!/bin/bash

# Remove old eslint-disable comments
sed -i '' '/\/\* eslint-disable \*\//d' src/lib/api/codegen/*.ts

# Add eslint-disable at the beginning of all files
for file in src/lib/api/codegen/*.ts; do
  sed -i '' '1s;^;/* eslint-disable */\n;' "$file"
done

echo -e "\033[32m✔\033[0m Formatted"