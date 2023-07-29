import winston, { format, transports, createLogger } from "winston";
import * as dotenv from 'dotenv'
dotenv.config()

const { combine, timestamp, label, printf } = format;
const PrintFormat = printf(({ level, message, label, timestamp, }) => {
  return `${level} ${timestamp} ${label} ${message}`;
});
const environment = (process.env.ENV === 'production') ? 'production' : 'development';

const consoleTransport = new transports.Console();

/**
 * @description Log events occurring on the Apollo server.
 * @see {@link https://github.com/winstonjs/winston}
 * @see {@link https://www.npmjs.com/package/winston}
 * @see {@link https://blog.appsignal.com/2021/09/01/best-practices-for-logging-in-nodejs.html}
 */
export const logger = createLogger({
  levels: winston.config.syslog.levels,
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    label({ label: environment }),
    PrintFormat,
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    consoleTransport
  ],
});

logger.profile(environment)

// fired when a log file is created
consoleTransport.on('new', (filename, b, c) => {
  console.log('new _______', filename);
});

// fired when a log file is rotated
consoleTransport.on('rotate', (oldFilename, newFilename) => {
  console.log('rotate _______', oldFilename, newFilename);
});

// fired when a log file is archived
consoleTransport.on('archive', (zipFilename) => {
  console.log('archive _______', zipFilename);
});

// fired when a log file is deleted
// consoleTransport.on('logRemoved', (removedFilename) => {});
consoleTransport.on('finish', (info: any) => {
  console.log('finish _______', info);
});

logger.on('finish', function (info: any) {
  // All `info` log messages has now been logged
  console.log('finish _______', info);
  return;
});

logger.on('error', function (err) { /* Do Something */ });

if (process.env.ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
