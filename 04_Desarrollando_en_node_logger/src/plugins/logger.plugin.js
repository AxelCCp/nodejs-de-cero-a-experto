/**
 *  https://www.npmjs.com/package/winston
 *  npm install winston
 */

//forma 1
const winston = require('winston');

//forma 2
//const {combine, timestamp, json} = winston.format;

const logger = winston.createLogger({
    level: 'info',
    
    //forma 1
    format: winston.format.json(),
    
    //forma2
    //format : combine(timestamp(), json()),
    
    //defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));


                    //factory function
  module.exports = function buildLogger(service) {

    return {
        log : (message) => {
            //logger.log('info', message, service);
            logger.log('info', { message, service } );      
        },
        error : (message) => {
          logger.error('error', {message, service, at: new Date().toISOString()} );
        }
    }

  }