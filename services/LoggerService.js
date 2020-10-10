const winston = require("winston");
const fs = require("fs");
const path = require("path");

const logDir = "log"; // Directory path for logs

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {
    service: "smoke-signal-service",
    time: new Date().toISOString(),
  },
  transports: [
    // - Write all logs error (and below) to `error.log`.
    new winston.transports.File({
      filename: path.join(logDir, "/error.log"),
      level: "error",
    }),
    // - Write to all logs with level `info` and below to `combined.log`
    new winston.transports.File({
      filename: path.join(logDir, "/combined.log"),
    }),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
