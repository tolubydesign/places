import express from 'express';
import { readFileSync } from 'fs';
import http from 'http';
import * as dotenv from 'dotenv';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import Logger from '@/utils/plugin/logger.plugin';
dotenv.config()

const application = express();
const port = process.env.PORT;
const serverPath = "/api";
const httpServer = http.createServer(application)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = readFileSync('./src/shared/schema/schema.graphql', { encoding: 'utf-8' });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server: ApolloServer<any> = new ApolloServer({
  typeDefs,
  // resolvers,
  csrfPrevention: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    Logger({
      logMessage: true
    })
  ],
  formatError: error => {
    return error
  },
});

// Ensure we wait for our server to start
await server.start();

// Specify the path where we'd like to mount our server
application.use(
  serverPath,
  // Middleware(server),
);

// Modified server startup
await new Promise<void>((resolve) => {
  console.log(`Sever up. On port: http://localhost:${port}${serverPath}`)
  return httpServer.listen({ port: Number(port) }, resolve)
});