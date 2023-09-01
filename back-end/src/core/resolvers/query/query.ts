import mariadb from "../../../utils/connection/mariadb.connection";
import { Bookmark, Place } from "../model";
import { CreateConnectionToMariadb, GraphQLErrorIfMariaDBUndefined } from "../../../helpers/database/checks";
import { BookmarkGroup, MutationGraphQLFieldResolverParams, UserDetails } from "../mutations/model.mutations";
import { GraphQLResolveInfo } from "graphql";
import { ApolloInternalServerError, ApolloNotFoundError } from "../../../utils/error/error-handler";

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
    getAllAccounts: async (): Promise<UserDetails[]> => {
      const connection = await CreateConnectionToMariadb(mariadb);
      const accounts: UserDetails[] = await connection.query(`SELECT * FROM account`);
      return accounts;
    },
    getAccount: async (_, { id }, context, info): Promise<UserDetails> => {
      const connection = await CreateConnectionToMariadb(mariadb);
      const sql = `
      SELECT id, username, name, email, surname, account_type FROM account
      WHERE id=?
      LIMIT 1`;
      const user: Promise<UserDetails[] | undefined> = connection.query(sql, id);
      const returningUser = await user;
      if (!returningUser) throw new ApolloInternalServerError("Request to database did not return the relevant information.");

      return returningUser[0];
    },
    getPlace: async (_, { id }: { id: string }, context, info): Promise<Place | undefined> => {
      const connection = await CreateConnectionToMariadb(mariadb);
      // TODO: JWT connection
      const sql = `
        SELECT * FROM place
        WHERE id=?
      `;
      const response: Promise<Place[] | undefined> = connection.query(sql, id);
      const places: Place[] | undefined = await response;

      if (!places) return undefined;
      return places[0];
    },
    getAllPlaces: async (): Promise<Place[] | undefined> => {
      const connection = await CreateConnectionToMariadb(mariadb);

      const places: Promise<Place[] | undefined> = connection.query(`SELECT * FROM place`);
      return places;
    },
    getAllBookmarks: async (): Promise<Bookmark[] | undefined> => {
      const connection = await CreateConnectionToMariadb(mariadb);
      const sql = `
        SELECT * FROM bookmark
      `;
      const response: Promise<Bookmark[] | undefined> = connection.query(sql);
      return await response
    },
    allBookmarkGroups: async (_, args, context, info): Promise<BookmarkGroup[] | undefined> => {
      const connection = await CreateConnectionToMariadb(mariadb);
      const bookmarkGroups: BookmarkGroup[] | undefined = await connection.query(`SELECT * FROM bookmark_group`);
      console.log("bookmark_group", bookmarkGroups);
      return bookmarkGroups;
    }
  }
}