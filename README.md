# React + Typescript Portfolio (Node/Express backend)

## All

Webpack
React
Express

EsLint
Prettier
Jest
CSpell

## Client

Webpack configured for react with scss modules

React-router functionality with routes configured via `src/routes/routes.tsx`

Testing-library for effective component testing

## Server

Express backend with API routing

Working on express and graphql functionality

Working on OAuth functionality

## Testing

`npm test` | `npm run test:client` | `npm run test:server`

run a single test with `npm run test (client|server)/src/path/to/test.ts`

Default testing currently runs in two steps: frontend and backend. A coverage
report is generated for each.

```
=============================== Coverage summary ===============================
Statements   : 100% ( 72/72 )
Branches     : 100% ( 50/50 )
Functions    : 100% ( 17/17 )
Lines        : 100% ( 61/61 )
================================================================================
Test Suites: 6 passed, 6 total
Tests:       31 passed, 31 total
Snapshots:   0 total
Time:        2.087 s
```
