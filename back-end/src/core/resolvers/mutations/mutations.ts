import { ApolloBadRequestError, ApolloInternalServerError } from "../../../utils/error/error-handler";
import { CreateConnectionToMariadb } from "../../../helpers/database/checks";
import mariadbConnection from "../../../utils/connection/mariadb.connection";
import { AccountCreationArgs, BookmarkGroup, DeleteAccountRequestArgs, MutationGraphQLFieldResolverParams, UserDetails } from "./model.mutations";
import { GraphQLResolveInfo } from "graphql";
import { ReturnResponse } from "../../../helpers/response-handling";
import { createBookmarkRequest } from "./functions.mutation";


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

      if (!returningUser) throw new ApolloInternalServerError(
        "Request to database did not return the relevant information.",
        "INTERNAL_SERVER_ERROR"
      );
      return returningUser[0];
    },
    deleteAccount: async (_, { id }: DeleteAccountRequestArgs, context, info) => {
      const connection = await CreateConnectionToMariadb(mariadbConnection)
      const sql = `DELETE FROM account WHERE id=?`
      connection.query(sql, id);
      return ReturnResponse(200);
    },
    createBookmarkGroup: async (_, { userID, title, description }, context, info) => {
      const connection = await CreateConnectionToMariadb(mariadbConnection);
      const sql = `
        INSERT INTO bookmark_group (title, description, creator_id)
        VALUES (?, ?, ?)
        RETURNING *
      `;
      if (!userID || !title || !description) throw new ApolloBadRequestError(undefined, "BAD_REQUEST");
      const values = [title, description, userID];
      const response: BookmarkGroup[] | undefined = await connection.query(sql, values);
      console.log("create bookmark group", response);
      return ReturnResponse(200);
    },
    createBookmark: (_, args, context, info) => createBookmarkRequest(_, args, context, info)
  }
}