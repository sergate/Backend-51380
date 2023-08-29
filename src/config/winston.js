const winston = require('winston');

//Niveles de errores
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'white',
  },
};

//Logger de produccion
const loggerProd = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize({ colors: customLevels.colors }), winston.format.simple()),
    }),
    new winston.transports.File({
      filename: './src/errors.log',
      level: 'error',
      format: winston.format.simple(),
    }),
  ],
});

//Logger Dev
const loggerDev = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(winston.format.colorize({ colors: customLevels.colors }), winston.format.simple()),
    }),
    new winston.transports.File({
      filename: './src/errors.log',
      level: 'warning',
      format: winston.format.simple(),
    }),
  ],
});

const mdwlLogger = (req, res, next) => {
  req.logger = process.env.NODE_ENV ? loggerProd : loggerDev;
  req.logger.info(`${req.method}` + `${req.url} - Todo piola?`);
  next();
};

module.exports = { mdwlLogger };