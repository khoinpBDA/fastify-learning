const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { requestContext } = require("@fastify/request-context");

const logDir = process.env.LOG_DIR || "logs";
const logMaxSize = process.env.LOG_MAX_SIZE || "50m";
const logMaxFiles = process.env.LOG_MAX_FILES || "14d";
const serviceName = process.env.SERVICE_NAME || "my-service";
const nodeEnv = process.env.NODE_ENV || "dev"; // dev, stag, beta, pre-live, prod

var fileInfoTransport = new winston.transports.DailyRotateFile({
  dirname: logDir,
  filename: "info-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: logMaxSize,
  maxFiles: logMaxFiles,
  level: "info",
});

var fileErrorTransport = new winston.transports.DailyRotateFile({
  dirname: logDir,
  filename: "error-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: logMaxSize,
  maxFiles: logMaxFiles,
  level: "error",
});

// format
function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  return `${timestamp} ${level} [${requestContext.get("traceid")}] ${message} ${
    Object.keys(args).length ? JSON.stringify(args, "", "") : ""
  }`;
}

// function formatParams(log) {
//     if (log.stack) {
//         return `${log.timestamp} ${log.level} ${log.stack}`;
//     }
//     return `${log.timestamp} ${log.level} ${log.message}`;
// }

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.ms" }),
  winston.format.printf(formatParams)
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  // defaultMeta: { service: serviceName },
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    fileInfoTransport,
    fileErrorTransport,
  ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (nodeEnv !== "prod") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(formatParams)
      ),
    })
  );
}

module.exports = logger;
