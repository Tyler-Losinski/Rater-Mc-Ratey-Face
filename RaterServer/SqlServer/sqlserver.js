var logger = require('./../logger.js');
var sql = require('mssql');
var config = require('./serverConfig.json');

/**
 * This is the Sql Srever connection class.
 * Quick note: this file might need to be split in the future to allow internal queries to run.
 * That means no request resource headers if necessary
 */
module.exports = class SqlServerConn
{

    // config for your database
    constructor()
    {
    }

    /**
     * Sql operations boiler plate method.
     * Needs to have a response header.
     * @param {any} res
     * @param {any} delegate
     */
    SqlRequired(res, delegate)
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        let connection = new sql.Connection(config);

        logger.info('Sql connection started...');

        connection.connect().then(() => {
            delegate(connection);
        }).catch((err) => {
            logger.error(err);
        });
    }

    /**
     * Sql operations boiler plate method. No response header required.
     * @param {any} delegate
     */
    SqlRequiredInternal(delegate) {

        let connection = new sql.Connection(config);

        logger.info('Sql connection started...');

        connection.connect().then(() => {
            delegate(connection);
        }).catch((err) => {
            logger.error(err);
        });
    }


    /**
     * For testing the sql server
     * @param {any} req
     * @param {any} res
     */
    SqlTestConnection()
    {
        let connection = new sql.Connection(config);

        logger.info(`${`Sql`.magenta.bold} connection started...`);

        connection.connect().then(() => {

            let request = new sql.Request(connection);
            logger.debug('connection was successful.');

        }).catch((err) => {
            logger.error(err);
        });
    }

    /**
     * Generalized for sql querying.
     * @param {any} query
     * @param {any} req
     * @param {any} res
     */
    SqlSelect(query, req, res)
    {
        //connection is actually a connection pool
        this.SqlRequired(res,
            (connection) => {

                let request = new sql.Request(connection);

                request.query(query).then(
                    (recordset) => {

                        res.send(recordset);

                    }).catch(
                    (err) => {
                        logger.error(err);
                    });
        });
    }

    /**
     * Select queries with parameters.
     * These don't actually need to work this way, they can just use socket
     * but in a lot of cases, there's large data transfers,
     * so socket is best reserved for small bite size data.
     * @param {any} query query string
     * @param {any} params an array of {param, type, value} pairs
     * @param {any} res
     */
    SqlSelectParam(query, params, res) {
        this.SqlRequired(res,
            (connection) => {

                let request = new sql.Request(connection);

                
                for (var i in params)
                {
                    // I disagree with this and think that the type should go after value!
                    request.input(params[i].param,
                        params[i].type,
                        params[i].value
                    );
                }

                request.query(query).then(
                    (recordset) => {
                        res.send(recordset);

                    }).catch(
                    (err) => {
                        logger.error(err);
                    });

            });
    }

    /**
     * Makes a query, encapsulated by callback.
     * @param {any} query
     * @param {any} params
     * @param {any} callback
     */
    SqlSelectParamCall(query, params, callback) {
        this.SqlRequiredInternal(
            (connection) => {

                let request = new sql.Request(connection);

                for (var i in params) {
                    // I disagree with this and thing that the type should go after value!
                    request.input(params[i].param,
                        params[i].type,
                        params[i].value
                    );
                }

                request.query(query).then(
                    (recordset) => {
                        callback( recordset);
                    }).catch(
                    (err) => {
                        logger.error(err);
                    });
            });
    }

    /**
     * Executes data inserts into the database, or any kind of non-return statements
     * TODO: still need scalar or output statement queries.
     * Should not return anything.
     * @param {any} query
     * @param {any} params
     */
    SqlExecuteStatement(query, params)
    {
        this.SqlExecuteStatementCallback(query, params, null, () => { });
    }

    /**
     * Handels output params via call back.
     * @param {any} query
     * @param {any} params
     * @param {any} outputParams
     * @param {any} callback
     */
    SqlExecuteStatementCallback(query, params, outputParams, callback) {
        this.SqlRequiredInternal(
            (connection) => {

                let statement = new sql.PreparedStatement(connection);

                let data = this.paramizeForExec(params);

                logger.debug(data);

                // prepare input params
                for (var i in data.paramTypeDef) {
                    statement.input(data.paramTypeDef[i].param,
                        data.paramTypeDef[i].type
                    );
                }

                // add output here.
                for (var i in outputParams) {
                    statement.output(outputParams[i].param,
                        outputParams[i].type
                    );
                }

                statement.prepare(query, (prepareError) => {

                    if (prepareError) {
                        logger.error("prepareError");
                        logger.error(prepareError);
                    }

                    statement.execute(data.paramList, (excError, recordset) => {

                        if (excError) {
                            logger.error(excError);
                        }

                        // >:-[ if a call back exists
                        if (callback) {
                            callback(recordset);
                        }

                        statement.unprepare((uErr) => {
                            if (uErr) {
                                logger.error(uErr);
                            }
                        });
                    })
                });
            });
    }

    /**
     * A small helper function to format parameters.
     * @param {any} param
     * @param {any} value
     * @param {any} type
     */
    paramize(param, value, type)
    {
        return {
            param: param, value: value, type: type
        };
    }

    /**
     * 
     * @param {any} params
     */
    paramizeForExec(params)
    {
        let data = {
            paramTypeDef: [],
            paramList: {}
        };

        for (var i in params) {
            data.paramTypeDef.push(
                {
                  param:  params[i].param,
                  type: params[i].type
                });

            data.paramList[params[i].param] = params[i].value;
        }

        return data;
    }
};
