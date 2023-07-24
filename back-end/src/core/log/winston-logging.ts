import winston, { format, transports, createLogger } from "winston";
import * as dotenv from 'dotenv'
dotenv.config()

const { combine, timestamp, label, printf } = format;
const PrintFormat = printf(({ level, message, label, timestamp, }) => {
  return `${level} ${timestamp} ${label} ${message}`;
});

const transport = new winston.transports.Console();

// TODO: Connect to Redis Database
/**
 * @description Log events occuring on the Apollo server.
 * @see {@link https://github.com/winstonjs/winston}
 * @see {@link https://www.npmjs.com/package/winston}
 * @see {@link https://blog.appsignal.com/2021/09/01/best-practices-for-logging-in-nodejs.html}
 */
export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    label({ label: process.env.ENV }),
    PrintFormat,
  ),
  transports: [
    new transports.Http(),
    new transports.Console({
      // filename: 'public/logs/error.log', 
      level: 'error'
    }),
    new transports.Console({
      // filename: 'public/logs/combined.log',
    }),
  ],
  exceptionHandlers: [
    new transports.Console({
      // filename: "public/logs/exceptions.log"
    })
  ],
  rejectionHandlers: [
    new transports.Console({
      // filename: "public/logs/rejections.log"
    })
  ],
});

if (process.env.ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
