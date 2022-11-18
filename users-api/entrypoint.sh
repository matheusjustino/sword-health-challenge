#!/bin/bash

npx mikro-orm migration:up
npx mikro-orm seeder:run
node ./dist/main.js
