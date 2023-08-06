import { ApolloQueries } from "./query/query";
import { ApolloMutations } from "./mutations/mutations";
import { GraphQLFieldResolverParams} from "@apollo/server"
import { GraphQLFieldResolver } from "graphql";
import { IResolvers } from "@graphql-tools/utils";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers: IResolvers<any, any> = {
  Query: ApolloQueries(),
  Mutation: ApolloMutations(),
};