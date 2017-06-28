'use strict';
var express = require('express');
var app = express();
//var server = require('http').Server(app);
//var io = require('socket.io')(server);
var colors = require('colors');
var strFormat = require('string-format');
var sql = require('mssql');
var sqlServer = require('./SqlServer/sqlserver.js');
var sqlConn = new sqlServer();
var http = require('http'); //importing http
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;

const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

// Initialize socket module.
var socketModule = require('./socket-module.js')(sqlConn, io)

var logger = require('./logger.js');

var config = require('./main-server-conf.json');

sqlConn.SqlTestConnection();

logger.level = 'error';
