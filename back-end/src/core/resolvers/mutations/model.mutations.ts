import { GraphQLFieldResolverParams } from "@apollo/server";
import { Account } from "../model";

export type AccountCreationArgs = Omit<Account, "id">;
export type UserDetails = Omit<Account, "password">;

export type DeleteAccountRequestArgs = {
  id: string,
};

export type MutationGraphQLFieldResolverParams<ArgumentType = any,> = GraphQLFieldResolverParams<undefined, any, ArgumentType>;
