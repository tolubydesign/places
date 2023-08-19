import { GraphQLFieldResolverParams } from "@apollo/server";
import { AccountDetails, Account } from "../model";

export type AccountCreationArgs = Omit<Account, "id">;
export type UserDetails = Omit<AccountDetails, "password">;

export type MutationGraphQLFieldResolverParams<ArgumentType = any,> = GraphQLFieldResolverParams<undefined, any, ArgumentType>;
