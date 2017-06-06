var winston = require('winston');
var colors = require('colors');

var customTheme = {
    levels: {
        silly: 0, input: 1, verbose: 2,
        prompt: 3, info: 4, data: 5,
        help: 6, warn: 7, debug: 8,
        error: 9
    },
    colors: {
        silly: 'rainbow', input: 'grey', verbose: 'cyan',
        prompt: 'grey', info: 'green', data: 'grey',
        help: 'cyan', warn: 'yellow', debug: 'cyan',
        error: 'red'
    }
};

colors.setTheme(customTheme.colors);

var fs = require('fs');

var dir = './Logs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var awesomeLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: './Logs/all-logs.json' })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: './Logs/exceptions.json' })
    ],
    
    levels: customTheme.levels
});

winston.addColors(customTheme.colors);

module.exports = awesomeLogger;