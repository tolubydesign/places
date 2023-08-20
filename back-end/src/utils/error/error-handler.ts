import { GraphQLError, GraphQLErrorOptions } from 'graphql';
import { ReturnResponseStatus } from "../../helpers/response-handling";

/**
 * Internal Server Error Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 */
export class ApolloInternalServerError extends GraphQLError {
  constructor(message: string) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ReturnResponseStatus(403),
      }
    };

    super(message, options)
  }
}

/**
 * Unauthorised Error Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 */
export class ApolloUnauthorisedError extends GraphQLError {
  constructor(message: string) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ReturnResponseStatus(401),
      }
    };

    super(message, options)
  }
}
