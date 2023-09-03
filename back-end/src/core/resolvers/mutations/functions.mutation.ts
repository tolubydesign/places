import mariadbConnection from "../../../utils/connection/mariadb.connection";
import { CreateConnectionToMariadb } from "../../../helpers/database/checks";
import { Response, ReturnResponse } from "../../../helpers/response-handling";
import { BookmarkGroup, MutationGraphQLFieldResolverParams, UserDetails } from "./model.mutations";
import { ApolloBadRequestError, ApolloInternalServerError } from "../../../utils/error/error-handler";
import { Bookmark, Place } from "../model";
import { GraphQLResolveInfo } from "graphql";


export async function createBookmarkRequest(
  _: MutationGraphQLFieldResolverParams['source'],
  { userID, locationID, groupID }: any,
  context: MutationGraphQLFieldResolverParams['contextValue'],
  info: GraphQLResolveInfo
): Promise<Response> {
  if (!userID || !locationID || !groupID) throw new ApolloBadRequestError("Invalid inputs provided", "BAD_REQUEST");
  const connection = await CreateConnectionToMariadb(mariadbConnection);
  // TODO: validation user.

  // Confirm user is real
  const userSQL = `SELECT id, username, email FROM account WHERE id=? LIMIT 1`;
  const userResponse: UserDetails[] | undefined = await connection.query(userSQL, userID);
  if (!userResponse || (userResponse && !userResponse[0])) {
    throw new ApolloBadRequestError("User search request to database returned undefined.");
  }

  // Confirm location is real
  const locationSQL = `SELECT id, name FROM place WHERE id=?`;
  const locationResponse: Place[] | undefined = await connection.query(locationSQL, locationID);
  if (!locationResponse || (locationResponse && !locationResponse[0])) {
    throw new ApolloBadRequestError("Location search request to database returned undefined.");
  }

  // Confirm bookmark group is real
  const bookmarkGroupSQL = `SELECT id, title FROM bookmark_group WHERE id=? LIMIT 1`;
  const bookmarkGroupResponse: BookmarkGroup[] | undefined = await connection.query(bookmarkGroupSQL, groupID);
  if (!bookmarkGroupResponse || (bookmarkGroupResponse && !bookmarkGroupResponse[0])) {
    throw new ApolloBadRequestError("Bookmark Group search request to database returned undefined.");
  }

  const sql = `
    INSERT INTO bookmark  (creator_id, location_id, parent_group)
    VALUES (?, ?, ?)
    RETURNING *
  `;

  const values = [userResponse[0].id, locationResponse[0].id, bookmarkGroupResponse[0].id];

  const responses: Bookmark[] | undefined = await connection.query(sql, values);
  if (!responses || (responses && !responses[0])) throw new ApolloInternalServerError(
    "Request to database did not return the relevant information.",
    "INTERNAL_SERVER_ERROR"
  );

  return ReturnResponse(200);
};

