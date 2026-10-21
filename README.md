# GraphQL + Clean Architecture Boilerplate

A TypeScript GraphQL server skeleton that keeps auth and user logic separate from Apollo and Express.

**Status:** Starter. It is a reusable boilerplate: users and auth are wired through clean-architecture layers, but user data lives in an in-memory array and nothing is built on top of it yet.

## The problem

Teams starting a GraphQL API in TypeScript need a structure where business rules do not depend on the web framework, so the framework or database can change later without rewriting the core. This repo is a worked example of that layout, based on a boilerplate article by Tuan Le (linked from the original README).

## What it does

- Registers and logs in users through GraphQL operations (`registerUser`, `loginUser` in `src/__typedefs/schema.graphql`).
- Hashes passwords with bcrypt in `src/persistence/password.ts` and checks them in `src/services/auth.service.ts`.
- Builds the GraphQL schema from per-domain shards (`src/application/graphql/schemaShards/users.ts`) and merges them with `mergeRawSchemas.ts`.
- Wires services and repositories through an awilix container (`src/IoC/container.ts` and its providers).

## How it's built

- TypeScript on Node, with Apollo Server 2 on Express 4.
- awilix for dependency injection, graphql-tools for schema merging, jsonwebtoken for tokens.
- Schema types are generated with graphql-cli and graphql-schema-typescript (`npm run generate-typedefs`).
- Layering: `entities` and `dto` hold data shapes, `services` define repository interfaces and business logic, and `persistence` holds the concrete repositories. The services depend on the interfaces, and the IoC providers pick the implementation. That is the main decision the repo demonstrates.

## Running it locally

Install dependencies with the lockfile's package manager (`pnpm-lock.yaml` is present, so `pnpm install`).

```bash
npm run dev            # ts-node-dev with live reload, runs src/index.ts
npm run build          # clean and compile to dist/
npm start              # run the compiled dist/index.js
npm run lint
```

## What's left

- Users are stored in an in-memory array (`src/persistence/user.repository.ts`), so data is lost on restart and is not shared between processes. A real database repository is missing.
- The repo has no test suite.
- The GraphQL schema still contains `_empty` placeholder fields in its Query and Mutation types.
- It depends on Apollo Server 2 and Express 4, both old major versions. Apollo Server 2 is end-of-life, so upgrading is a real task before any production use.
- The original README's Docker and deployment notes are not in this repo.
