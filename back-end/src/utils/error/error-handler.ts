import { GraphQLError, GraphQLErrorOptions } from 'graphql';
import { ReturnResponseMessage, ReturnResponseStatus } from "../../helpers/response-handling";

/**
 * Internal Server Error Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 * @constructor Requires message, to return back to user.
 */
export class ApolloInternalServerError extends GraphQLError {
  constructor(message: string = ReturnResponseMessage(500)) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ReturnResponseStatus(500),
      }
    };

    super(message, options)
  }
}

/**
 * Unauthorised Error Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 * @constructor Requires message, to return back to user.
 */
export class ApolloUnauthorisedError extends GraphQLError {
  constructor(message: string = ReturnResponseMessage(401)) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ReturnResponseStatus(401),
      }
    };

    super(message, options)
  }
}

/**
 * Bad Gateway Error Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 * @constructor Requires message, to return back to user.
 */
export class ApolloBadGatewayError extends GraphQLError {
  constructor(message: string = ReturnResponseMessage(502)) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ReturnResponseStatus(502),
      }
    };

    super(message, options)
  }
} 