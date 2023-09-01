import { ApolloBadRequestError, ApolloInternalServerError, ApolloNotFoundError } from "../../../utils/error/error-handler";
import { CreateConnectionToMariadb } from "../../../helpers/database/checks";
import mariadbConnection from "../../../utils/connection/mariadb.connection";
import { AccountCreationArgs, BookmarkGroup, DeleteAccountRequestArgs, MutationGraphQLFieldResolverParams, UserDetails } from "./model.mutations";
import { GraphQLResolveInfo } from "graphql";
import { ReturnResponse } from "../../../helpers/response-handling";
import { Bookmark, Place } from "../model";


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
      const values = [title, description , userID];
      const response: BookmarkGroup[] | undefined = await connection.query(sql, values);
      console.log("create bookmark group", response);
      return ReturnResponse(200);
    },
    createBookmark: async (_, { userID, locationID, groupID }, context, info) => {
      if (!userID || !locationID || !groupID) throw new ApolloBadRequestError("Invalid inputs provided", "BAD_REQUEST");

      const connection = await CreateConnectionToMariadb(mariadbConnection);
      const sql = `
        INSERT INTO bookmark  (creator_id, location_id, parent_group)
        VALUES (?, ?, ?)
        RETURNING *
      `;
      
      // TODO: validation.
      // TODO: confirm that group id is real. creator id must match creator id in found group
      // TODO: confirm location is real
      // 
      
      const values = [userID, locationID, groupID];
      
      const responses: Bookmark[] | undefined = await connection.query(sql, values);
      
      if (!responses) throw new ApolloInternalServerError(
        "Request to database did not return the relevant information.",
        "INTERNAL_SERVER_ERROR"
      );

      console.log("create bookmark", responses);
      return ReturnResponse(200);
    },
    bookmarkEvent: async (_, { userID, locationID, groupBookmarkID }, context, info) => {
      const connection = await CreateConnectionToMariadb(mariadbConnection);
      // TODO: JWT connection
      let place: Place | undefined = undefined;
      let account: UserDetails | undefined = undefined;

      // Find location
      const locationSQL = `SELECT * FROM location WHERE id=?`;
      const placesResponse: Promise<Place[] | undefined> = connection.query(locationSQL, locationID);
      const places: Place[] | undefined = await placesResponse;
      if (!places) {
        throw new ApolloNotFoundError("Location id can't be found.")
      }

      // Find User
      const userSQL = `SELECT * FROM account WHERE id=?`;
      const accountResponse: Promise<UserDetails[] | undefined> = connection.query(userSQL, userID);
      const accounts: UserDetails[] | undefined = await accountResponse;
      if (!accounts) {
        throw new ApolloNotFoundError("User account id can't be found.")
      }

      // Error if unidentified
      place = places[0];
      account = accounts[0];


      // Make bookmark
      if (!account || !place) throw new ApolloInternalServerError("User or Place couldn't be identified.");

      // Add bookmark
      const sql = `
      
        location_id UUID NOT NULL,
        bookmark_group_id UUID NOT NULL,

        INSERT INTO bookmark (location_id, bookmark_group_id)
        VALUES (?, ?)
      `;
      const values = [place.id];
      connection.query(sql, values);
      return ReturnResponse(200)
    }
  }
}