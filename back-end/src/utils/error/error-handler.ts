import { GraphQLError, GraphQLErrorOptions } from 'graphql';
import { GraphQLResponseCode, KeyTypeApolloServerErrorCode, ReturnResponseMessage, ReturnResponseStatus } from "../../helpers/response-handling";
import { ApolloServerErrorCode } from '@apollo/server/dist/esm/errors';

type ServerResponseCode = KeyTypeApolloServerErrorCode | GraphQLResponseCode | null

/**
 * Internal Server Error Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 * @constructor Requires message, to return back to user.
 */
export class ApolloInternalServerError extends GraphQLError {
  constructor(
    message: string = ReturnResponseMessage(500),
    customCode: ServerResponseCode = null
  ) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: customCode ?? ReturnResponseStatus(500),
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
  constructor(
    message: string = ReturnResponseMessage(401),
    customCode: ServerResponseCode = null
  ) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: customCode ?? ReturnResponseStatus(401),
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
  constructor(
    message: string = ReturnResponseMessage(502),
    customCode: ServerResponseCode = null
  ) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: customCode ?? ReturnResponseStatus(502),
      }
    };

    super(message, options)
  }
};

/**
 * Bad Gateway Error Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 * @constructor Requires message, to return back to user.
 */
export class ApolloNotFoundError extends GraphQLError {
  constructor(
    message: string = ReturnResponseMessage(404),
    customCode: ServerResponseCode = null
  ) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: customCode ?? ReturnResponseStatus(404),
      }
    };

    super(message, options)
  }
};

/**
 * Bad Request (400) Error | Invalid inputs Handler that extends the graphql GraphQL Error class.
 * 
 * Used to return and error if issues occurred when request is made.
 * @constructor `{message}` Requires message, to return back to user.
 * 
 */
export class ApolloBadRequestError extends GraphQLError {
  constructor(
    message: string = ReturnResponseMessage(400),
    // TODO: create type that is combination of camel_case + capital letters  and string.
    customCode: ServerResponseCode = null
  ) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: customCode ?? ReturnResponseStatus(400),
      }
    };

    super(message, options)
  }
};

