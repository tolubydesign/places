import { createPool, type PoolConnection, type Pool } from "mariadb";

class MariadbConnection {
  private pool: Pool | undefined;
  constructor() {
    this.establishConnection();
  }

  private establishConnection() {
    this.pool = createPool({
      host: "localhost",
      user: "mysqluser",
      password: "secret",
      database: "mariadatabase",
      port: 1022,
      connectionLimit: 5,
    });

    console.log("Total connections: ", this.pool.totalConnections());
    console.log("Active connections: ", this.pool.activeConnections());
    console.log("Idle connections: ", this.pool.idleConnections());
  }

  async getMariadbPool(): Promise<PoolConnection | undefined>  {
    if (!this.pool) return undefined
    const connection = await this.pool.getConnection();
    return connection;
  }
}

const mariadbSingleton = new MariadbConnection();
export default mariadbSingleton.getMariadbPool();
