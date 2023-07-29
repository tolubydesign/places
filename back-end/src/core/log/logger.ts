import { logger } from "./winston-logging";
import redisClient from "../../utils/connection/redis.connection";

class ServerLoggerSingleton {
  private readonly defaultLogKey = "server";
  private logKey?: string;
  private timestamp: Date = new Date();

  constructor() {}

  /**
   * Establish what key Log events are going 
   * @param name log key we want Redis to add logs to.
   */
  setLogKey(name: string) {
    this.logKey = name;
  }

  /**
   * Log information to redis and winston logger
   * @param description log information
   */
  async info(description: string) {
    this.checkKey();

    return await redisClient?.set(`${this.logKey}-info`, `${description} { timestamp: ${this.timestamp.toLocaleString}}`).then(() => {
      logger.info(description)
    }).catch((error: Error) => {
      logger.error(`redis client set error ${error.message}`);
    });
  }

  /**
   * Log warning to redis and winston logger
   * @param description warning message
   */
  async warning(description: string) {
    this.checkKey();

    return await redisClient?.set(`${this.logKey}-warning`, `${description} { timestamp: ${this.timestamp.toLocaleString}}`).then(() => {
      logger.warning(description);
    }).catch((error: Error) => {
      logger.error(`redis client set error ${error.message}`);
    });
  }

  /**
   * Log error to redis and winston logger
   * @param description error message
   */
  async error(description: string) {
    this.checkKey();

    return await redisClient?.set(`${this.logKey}-error`, `${description} { timestamp: ${this.timestamp.toLocaleString}}`).then(() => {
      logger.error(description);
    }).catch((error: Error) => {
      logger.error(`redis client set error ${error.message}`);
    });
  }

  /**
   * Check that logKey has an assigned name.
   * @returns 
   */ 
  private checkKey = () => (!this.logKey) ? this.logKey = this.defaultLogKey : null;
};

const serverLoggerSingleton = new ServerLoggerSingleton();
export default serverLoggerSingleton;