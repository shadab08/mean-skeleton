var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'debug',
            humanReadableUnhandledException: true,
            json: false,
            colorize: true,
            'timestamp':function() {
                return new Date();
            }
        })
    ],
    exitOnError: false
});

module.exports = logger;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};