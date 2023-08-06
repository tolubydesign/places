import { AccountCreationArgs } from "./model.mutations";
import { GraphQLFieldResolverParams } from "@apollo/server";

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
      
    },
    deleteAccount: async () => {

    }
  }
}