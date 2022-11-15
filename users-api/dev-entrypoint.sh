#!/bin/bash

npx mikro-orm migration:up
npx mikro-orm seeder:run
yarn start:dev
