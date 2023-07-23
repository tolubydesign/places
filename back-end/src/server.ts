import express from 'express';
import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PluginContext } from './utils/plugin/models.plugin';
import { resolvers } from './core/resolvers/resolver';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = readFileSync('./src/schema/schema.graphql', { encoding: 'utf-8' });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server: ApolloServer<BaseContext> = new ApolloServer({
  typeDefs,
  resolvers,
});

// const app = express();
// server.applyMiddleware({ app });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);