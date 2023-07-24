import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import parse from 'body-parser';
import {config} from 'dotenv';
import { ApolloServer, BaseContext } from '@apollo/server';
config()

const {json} = parse
const environment = process.env.ENV

export function ApolloMiddleware(server: ApolloServer<BaseContext>): any[] {
  return [
    cors<cors.CorsRequest>(), 
    json(), 
    expressMiddleware(server)
  ]
}