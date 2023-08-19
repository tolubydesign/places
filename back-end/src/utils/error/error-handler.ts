import { GraphQLError, GraphQLErrorOptions } from 'graphql';
import {ReturnErrorMessage} from "../../helpers/response-handling";

/**
 * ...
 */
export class ApolloInternalServerError extends GraphQLError {
  constructor(message: string) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ReturnErrorMessage(403) ,
      }
    };

    super(message, options)
  }
}

/**
 * ...
 */
export class ApolloUnauthorisedError extends GraphQLError {
  constructor(message: string) {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ReturnErrorMessage(401) ,
      }
    };

    super(message, options)
  }
}
