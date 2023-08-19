import { GraphQLError } from "graphql";
import mariadb from "../../../utils/connection/mariadb.connection";
import { Place } from "../model";
import { GraphQLFieldResolverParams } from "@apollo/server";
import { ReturnErrorStatus } from "../../../helpers/response-handling";
import { GraphQLErrorIfMariaDBUndefined } from "../../../helpers/database/checks";

/**
 * Full collection of Apollo queries.
 * @see {@link https://graphql.org/learn/schema/}
 * @returns 
 */
export function ApolloQueries(): Record<string, (context: GraphQLFieldResolverParams<undefined, any, any>) => unknown> {
  return {
    getAllPlaces: async (): Promise<Place[] | undefined> => {
      const connection = await mariadb;
      const establishedConnection = GraphQLErrorIfMariaDBUndefined(connection);

      const places: Promise<Place[] | undefined> = establishedConnection.query(`SELECT * FROM place`);
      return places;
    }
  }
}