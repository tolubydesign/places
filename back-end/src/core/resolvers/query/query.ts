import { GraphQLError } from "graphql";
import mariadb from "../../../utils/connection/mariadb.connection";
import { Place } from "./model.query";
import { GraphQLFieldResolverParams } from "@apollo/server";

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];


/**
 * Full collection of Apollo queries.
 * @see {@link https://graphql.org/learn/schema/}
 * @returns 
 */
export function ApolloQueries(): Record<string, (context: GraphQLFieldResolverParams<undefined, any, any>) => unknown> {
  return {
    GetAllBooks: async () => {
      return books
    },
    books: async () => books,
    information: async (): Promise<Place[] | undefined> => {
      if (!mariadb) {
        throw new GraphQLError("Can't connect to database.", {
          extensions: {
            code: "Internal Server Error",
          },
        });
      }

      const places: Place[] | undefined = await (await mariadb)?.query(`SELECT * FROM place`);
      return places
    },

    GetAllPlaces: async (): Promise<Place[] | undefined> => {
      if (!mariadb) {
        throw new GraphQLError("Can't connect to database.", {
          extensions: {
            code: "Internal Server Error",
          },
        });
      }

      const places: Place[] | undefined = await (await mariadb)?.query(`SELECT * FROM place`);
      return places
    }
  }
}