import mariadbConnection from "../../../utils/connection/mariadb.connection";
import { AccountCreationArgs, UserDetails } from "./model.mutations";
import { GraphQLFieldResolverParams } from "@apollo/server";
import { GraphQLError } from "graphql";

/**
 * Full collection of Apollo mutations.
 * @returns dictionary of mutations.
 */
export function ApolloMutations(): Record<string, (context: GraphQLFieldResolverParams<undefined, any, any>) => unknown> {
  return {
    // parent: undefined, args: AccountCreationArgs, context: any, info: any
    createAccount: async ({
      source, args, contextValue, info
    }: GraphQLFieldResolverParams<undefined, any, AccountCreationArgs>): Promise<any> => {
      if (!mariadbConnection) {
        throw new GraphQLError("Can't connect to database.", {
          extensions: {
            code: "Internal Server Error",
          },
        });
      }

      var sql = `
        INSERT INTO account (username, password, email, lastname, name)
        VALUES ?
        RETURNING *
      `;
      var values = [
        [args.username, args.password, args.email, args.lastname, args.name]
      ];
      const user: UserDetails | undefined = await (await mariadbConnection)?.execute(sql, values)
      return user;
    },
    deleteAccount: async () => {

    }
  }
}