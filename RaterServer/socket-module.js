const fileSystem = require('fs');
var logger = require('./logger.js');
var sql = require('mssql');

logger.level = 'error';
var sqc;

/**
 * Socket io is featured in here. Perpare for a asynchronous fully event driven system!
 */
module.exports = (sqlConn, io) => {
    sqc = sqlConn;

    io.on('connection', (socket) => {

        logger.info(`Client has connected...`);

        let netEvent = {
            socket: socket,
            io: io
        };

        voting(sqc, netEvent);
    });
};


function voting(sqc, netEvent) {

    let socket = netEvent.socket;
    let io = netEvent.io;

    socket.on('log_in', (data) => {
        let query = `SELECT * FROM County
            WHERE [EmailAddress] = @email
			AND [Password] = @pass;`;

        sqc.SqlSelectParamCall(query,
            [
                sqc.paramize('email', data.user, sql.NVarChar(sql.MAX)),
                sqc.paramize('pass', data.pass, sql.NVarChar(sql.MAX)),
               
            ],
            (data) => {
                if (typeof data[0] == 'undefined') {
                    socket.emit('login', {sucess: false});
            }
                else
                    socket.emit('login', { sucess: true, agencyId: data[0].ID, agencyName: data[0].Name, permission: data[0].Permission });

        });
    });
}

