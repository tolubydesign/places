import { GraphQLError } from "graphql";
import { PoolConnection } from "mariadb";
import { ReturnResponseStatus } from "../response-handling";

/**
 * ...
 * @param mariadbConnection Possibly, mariadb
 * @returns mariadb connection
 */
export function GraphQLErrorIfMariaDBUndefined(mariadbConnection: PoolConnection | undefined): PoolConnection {
  if (!mariadbConnection) {
    throw new GraphQLError("Can't connect to database.", {
      extensions: {
        code: ReturnResponseStatus(500),
      },
    });
  }

  return mariadbConnection;
}

/**
 * Create a connection to the mariadb.
 * The function will throw an error if a connection cant be established.
 * @param mariadbConnection mariadb connection as promise.
 * @returns 
 */
export async function CreateConnectionToMariadb(mariadbConnection: Promise<PoolConnection | undefined>): Promise<PoolConnection> {
  const connection = await mariadbConnection;
  const establishedConnection = GraphQLErrorIfMariaDBUndefined(connection);
  return establishedConnection
}