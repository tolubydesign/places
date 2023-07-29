import { RedisClientType, RedisModules, createClient } from 'redis';

// TODO: create configuration function
/**
 * A general class to establish a connection with the Reds database
 * 
 * @see {@link https://northflank.com/guides/connecting-to-a-redis-database-using-node-js}
 * @see {@link https://betterstack.com/community/guides/scaling-nodejs/}
 * @see {@link https://redis.io/docs/clients/nodejs/}
 */
class RedisConnection {
  private redisSingletonClient: RedisClientType | undefined;
  private readonly falseConfig = {
    user: "",
    host: "localhost",
    port: 6379,
    password: "",
    database: 0,
  };

  // redis://%v:%v@%v:%v/%v", redisConfig.User, redisConfig.Password, redisConfig.Host, redisConfig.Port, redisConfig.Database
  private databaseUrl: string; // `redis[s]://[[username][:password]@][host][:port][/db-number]`

  constructor() {
    this.databaseUrl = `redis://${this.falseConfig.user}:${this.falseConfig.password}@${this.falseConfig.host}:${this.falseConfig.port}/${this.falseConfig.database}`;
    this.establishRedisConnection();
  }


  /**
   * Establish connection to redis database.
   * @return redis.connect()
   */
  private async establishRedisConnection() {
    try {
      this.redisSingletonClient = createClient({
        url: this.databaseUrl,
      });
      await this.redisSingletonClient?.connect();
    } catch (error: any) {
      console.log("redis client connection error:", error?.code);
    }
  }

  public getRedisSingleton(): RedisClientType | undefined {
    return this.redisSingletonClient;
  }

  getRedisConfiguration() {
    return this.falseConfig;
  }
}

const RedisConnectionSingleton = new RedisConnection();
export default RedisConnectionSingleton.getRedisSingleton();
