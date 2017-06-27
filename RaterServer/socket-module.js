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

    socket.on('test', (data) => {
        logger.info(data);
    })

    socket.on('upvote', (data) => {
        let query = `UPDATE RapQuotes SET Votes = Votes + 1 WHERE ID = @QuoteID`;

        // route event stores a list of lines, everythin else stores lat+lng
        let params = [
            sqc.paramize('QuoteID', data, sql.Int),
        ];

        sqc.SqlExecuteStatementCallback(query, params, null,
            (recordSet) => {
                logger.log(recordSet);
            });
    })

    socket.on('downvote', (data) => {
        let query = `UPDATE RapQuotes SET Votes = Votes - 1 WHERE ID = @QuoteID`;

        // route event stores a list of lines, everythin else stores lat+lng
        let params = [
            sqc.paramize('QuoteID', data, sql.Int),
        ];

        sqc.SqlExecuteStatementCallback(query, params, null,
            (recordSet) => {
                logger.log(recordSet);
            });
    })

    socket.on('get_quotes_list', () => {
        let query = `SELECT * FROM RapQuotes
            ORDER BY Votes DESC;`;

        sqc.SqlSelectParamCall(query, [],
            (data) => {
                socket.emit('list_quotes', data)
            });

    })

    socket.on('get_quotes', () => {

        let query = `SELECT * FROM RapQuotes
            ORDER BY NEWID();`;

        sqc.SqlSelectParamCall(query,[],
            (data) => {
                socket.emit('card_quotes', data)
        });
    });
}

