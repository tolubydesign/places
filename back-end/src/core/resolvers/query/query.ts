import mariadb from "../../../utils/connection/mariadb.connection";
import { Place } from "../model";
import { CreateConnectionToMariadb, GraphQLErrorIfMariaDBUndefined } from "../../../helpers/database/checks";
import { MutationGraphQLFieldResolverParams, UserDetails } from "../mutations/model.mutations";
import { GraphQLResolveInfo } from "graphql";
import { ApolloInternalServerError } from "../../../utils/error/error-handler";

/**
 * Full collection of Apollo queries.
 * @see {@link https://graphql.org/learn/schema/}
 * @returns 
 */
export function ApolloQueries(): Record<string, (
  _: MutationGraphQLFieldResolverParams['source'],
  args: MutationGraphQLFieldResolverParams['args'],
  context: MutationGraphQLFieldResolverParams['contextValue'],
  info: GraphQLResolveInfo
) => unknown> {
  return {
    getAllAccounts: async () => {
      const connection = await CreateConnectionToMariadb(mariadb);
      const accounts: UserDetails[] = await connection.query(`SELECT * FROM account`);
      return accounts;
    },
    getAccount: async (_, { id }, context, info) => {
      const connection = await CreateConnectionToMariadb(mariadb);
      const sql = `
      SELECT id, username, name, email, surname FROM account
      WHERE id=?
      LIMIT 1`;
      const user: Promise<UserDetails[] | undefined> = connection.query(sql, id);
      const returningUser = await user;
      if (!returningUser) throw new ApolloInternalServerError("Request to database did not return the relevant information.");
      console.log("function get account", returningUser);
      return returningUser[0];
    },
    getAllPlaces: async (): Promise<Place[] | undefined> => {
      const connection = await mariadb;
      const establishedConnection = GraphQLErrorIfMariaDBUndefined(connection);

      const places: Promise<Place[] | undefined> = establishedConnection.query(`SELECT * FROM place`);
      return places;
    }
  }
}