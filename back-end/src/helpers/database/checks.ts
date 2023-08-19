import { GraphQLError } from "graphql";
import { PoolConnection } from "mariadb";
import { ReturnErrorStatus } from "../response-handling";

export function GraphQLErrorIfMariaDBUndefined(mariadbConnection: PoolConnection | undefined): PoolConnection {
  if (!mariadbConnection) {
    throw new GraphQLError("Can't connect to database.", {
      extensions: {
        code: ReturnErrorStatus(500),
      },
    });
  }

  return mariadbConnection;
}
