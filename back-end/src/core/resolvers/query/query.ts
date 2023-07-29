import { GraphQLError } from "graphql";
import mariadb from "../../../utils/connection/mariadb.connection";
import { Place } from "./model.query";

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
 * 
 * 
 * @see {@link https://graphql.org/learn/schema/}
 * @returns 
 */
export function ApolloQueries(): Record<string, () => any> {

  return {
    GetAllBooks: async () => {
      return books
    },
    books: async () => books,
    information: async (): Promise<Place[] | undefined> => {
      console.log("information request");
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