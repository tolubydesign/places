import { ApolloInternalServerError } from "../../../utils/error/error-handler";
import { CreateConnectionToMariadb } from "../../../helpers/database/checks";
import mariadbConnection from "../../../utils/connection/mariadb.connection";
import { AccountCreationArgs, DeleteAccountRequestArgs, MutationGraphQLFieldResolverParams, UserDetails } from "./model.mutations";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { ReturnResponse } from "../../../helpers/response-handling";


/**
 * Full collection of Apollo mutations.
 * @returns dictionary of mutations.
 */
export function ApolloMutations(): Record<string, (
  _: MutationGraphQLFieldResolverParams['source'],
  args: MutationGraphQLFieldResolverParams['args'],
  context: MutationGraphQLFieldResolverParams['contextValue'],
  info: GraphQLResolveInfo
) => any> {
  return {
    createAccount: async (_, { email, surname, name, password, username }: AccountCreationArgs, context, info): Promise<UserDetails> => {
      const connection = await CreateConnectionToMariadb(mariadbConnection);
      // TODO: JWT connection
      const sql = `
        INSERT INTO account (username, password, email, surname, name)
        VALUES (?, ?, ?, ?, ?)
        RETURNING id,username
      `;
      const values = [username, password, email, surname, name];
      const user: Promise<UserDetails[] | undefined> = connection.query(sql, values);
      const returningUser = await user;

      console.log('function call create account, awaited returningUser', returningUser);

      if (!returningUser) throw new ApolloInternalServerError("Request to database did not return the relevant information.");
      return returningUser[0];
    },
    deleteAccount: async (_, { id }: DeleteAccountRequestArgs, context, info) => {
      const connection = await CreateConnectionToMariadb(mariadbConnection)
      const sql = `DELETE FROM account WHERE id=?`
      connection.query(sql, id);
      return ReturnResponse(200)
    },
  }
}