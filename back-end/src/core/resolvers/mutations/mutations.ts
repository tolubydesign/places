import { GraphQLErrorIfMariaDBUndefined } from "../../../helpers/database/checks";
import { ReturnErrorStatus } from "../../../helpers/response-handling";
import mariadbConnection from "../../../utils/connection/mariadb.connection";
import { AccountCreationArgs, MutationGraphQLFieldResolverParams, UserDetails } from "./model.mutations";
import { GraphQLFieldResolverParams } from "@apollo/server";
import { GraphQLError, GraphQLResolveInfo } from "graphql";


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
    // parent: undefined, args: AccountCreationArgs, context: any, info: any
    createAccount: async (_, { email, surname, name, password, username }: AccountCreationArgs, context, info): Promise<any> => {
      const connection = await (await mariadbConnection);
      const establishedConnection = GraphQLErrorIfMariaDBUndefined(connection);
      const accounts: UserDetails | undefined = await establishedConnection.query(`SELECT * FROM account`);
      console.log('function call create account, accounts', accounts);

      const sql = `
        INSERT INTO account (username, password, email, surname, name)
        VALUES (?, ?, ?, ?, ?)
        RETURNING id,username
      `;
      const values = [username, password, email, surname, name];

      const user: Promise<UserDetails[] | undefined> = establishedConnection.query(sql, values);
      const returningUser = await user;
      console.log('function call create account, awaited user', returningUser);
      if (!returningUser) {
        throw new GraphQLError("");
      }


      return returningUser[0];
    },
    deleteAccount: async () => {

    }
  }
}