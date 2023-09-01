import { GraphQLFieldResolverParams } from "@apollo/server";
import { Account } from "../model";

export type AccountCreationArgs = Omit<Account, "id">;
export type UserDetails = Omit<Account, "password">;

export type BookmarkGroup = {
  id: string,
  title: string,
  description: string,
  creator_id: string,
  timestamp: string,
}

export type Bookmark = {
  id: string,
  owner: string,
  location_id: string,
  parent_group: string,
  timestamp: string,
}

export type DeleteAccountRequestArgs = {
  id: string,
};

export type MutationGraphQLFieldResolverParams<ArgumentType = any> = GraphQLFieldResolverParams<undefined, any, ArgumentType>;
