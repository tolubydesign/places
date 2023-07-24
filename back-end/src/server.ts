import { readFileSync } from 'fs';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { resolvers } from './core/resolvers/resolver';
import ServerMiddleware from './utils/plugin/logger.plugin';
import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PluginContext } from './utils/plugin/models.plugin';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = readFileSync('./src/schema/schema.graphql', { encoding: 'utf-8' });
import * as dotenv from 'dotenv';
import { ApolloMiddleware } from './middleware/apollo.middleware';
dotenv.config()

const path = '/graphql';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const httpServer = http.createServer(app);
const server: ApolloServer<BaseContext> = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Specify the path where we'd like to mount our server
app.use(
  path,
  ApolloMiddleware(server),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
