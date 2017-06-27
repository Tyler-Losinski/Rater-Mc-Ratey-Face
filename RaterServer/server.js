'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var colors = require('colors');
var strFormat = require('string-format');
var sql = require('mssql');
var sqlServer = require('./SqlServer/sqlserver.js');
var sqlConn = new sqlServer();
// Initialize socket module.
var socketModule = require('./socket-module.js')(sqlConn, io)

var logger = require('./logger.js');

var config = require('./main-server-conf.json');


server.listen(config.port_number, () => {
    logger.info(`Map started on port ${config.port_number.toString().green.bold}`);
});

sqlConn.SqlTestConnection();

logger.level = 'error';

sqlConn.SqlSelectParamCall(`
        SELECT TOP 10 ID, Quote, Quotee
        FROM RapQuotes;
    `, [], (data) => {
        logger.info(data);
    });


