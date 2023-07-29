import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextDidResolveOperation,
  GraphQLRequestContextExecutionDidStart,
  GraphQLRequestContextParsingDidStart,
  GraphQLRequestContextValidationDidStart,
  GraphQLRequestExecutionListener,
  GraphQLRequestListener,
  GraphQLRequestListenerParsingDidEnd,
  GraphQLRequestListenerValidationDidEnd,
  GraphQLServerContext,
  GraphQLServerListener
} from "@apollo/server";
// import { logger } from "../../core/log/winston-logging";
import * as dotenv from 'dotenv';
import { ApolloPluginContext } from "./models.plugin";
import serverLogger from "../../core/log/logger";
dotenv.config()

const serverOrigin = process.env.SERVER_ORIGIN;
const logger = serverLogger;
logger.setLogKey("apollo-middleware");

/**
 * @description Apollo Middleware Plugin  Apollo Server Plugin for server logging. Utilises Winston
 * @returns ApolloServerPlugin 
 * 
 * @see {@link https://www.apollographql.com/docs/apollo-server/integrations/plugins/}
 * @see {@link https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference}
 */
export function ServerMiddleware(): ApolloServerPlugin<ApolloPluginContext> {
  return {
    async serverWillStart(service: GraphQLServerContext): Promise<void | GraphQLServerListener> {
      logger.info("Server will start.");

      return {
        async serverWillStop(): Promise<void> {
          logger.info("Server will stop.");
        },
      };
    },

    async requestDidStart(context: GraphQLRequestContext<any>): Promise<GraphQLRequestListener<any> | void> {
      return {
        async parsingDidStart(requestContext: GraphQLRequestContextParsingDidStart<any>): Promise<void | GraphQLRequestListenerParsingDidEnd> {
          // NOTE: function called when new request has been started
          logger.info(`request did start - parsing did start`);

          return async (err: Error | undefined) => {
            if (err) {
              logger.error(`ERROR - request did start - parsing did start`);
            }
          };
        },

        async didResolveOperation(requestContext: GraphQLRequestContextDidResolveOperation<any>): Promise<void> {
          if (requestContext?.errors) {
            logger.error(`ERROR - request did start - did resolve operation`);
          }
        },

        // Fires whenever Apollo Server will validate a request's document AST against your GraphQL schema.
        async validationDidStart(requestContext: GraphQLRequestContextValidationDidStart<any>): Promise<void | GraphQLRequestListenerValidationDidEnd> {
          // This end hook is unique in that it can receive an array of errors,
          // which will contain every validation error that occurred.
          return async (errors: readonly Error[] | undefined) => {
            if (errors) {
              logger.error(`ERROR - request did start - validation did start`)
            }

            return
          };
        },

        async didEncounterErrors(requestContext: GraphQLRequestContextDidEncounterErrors<any>): Promise<void> {
          if (requestContext?.errors) logger.error(`ERROR - request did start - did encounter errors`);
        },

        async executionDidStart(requestContext: GraphQLRequestContextExecutionDidStart<any>): Promise<void | GraphQLRequestExecutionListener<any>> {
          // NOTE: infinite requests made here. (When using apollo graphql website)
          return {
            async executionDidEnd(err) {
              if (err) {
                logger.info("ERROR - request did start - execution did start - execution did end");
                console.error(err);
              }
            },
          };
        },
      };
    },
  };
}
