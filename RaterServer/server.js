'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var colors = require('colors');
var strFormat = require('string-format');

var logger = require('./logger.js');

var config = require('./main-server-conf.json');

// Load the Cloudant library. 
var Cloudant = require('cloudant');

var me = ''; // Set this to your own account 
var password = '';

Cloudant({ account: me, password: password }, function (err, cloudant) {
    if (err) {
        return console.log('Failed to initialize Cloudant: ' + err.message);
    }

    var db = cloudant.db.use("quotes");
    db.get("rap-quotes", function (err, data) {
        // The rest of your code goes here. For example: 
        console.log(JSON.stringify(data[0]));

        for (var i = 0; i < data.length; i++) {
            data[i] = {
                quote: data[i].quote,
                quotee: data[i].quotee,
                id: i
            }
        }

        db.insert(data, function (err, body) {
            console.log(err);
        }); 
    });


});


server.listen(config.port_number, () => {
    logger.info(`Map started on port ${config.port_number.toString().green.bold}`);
});
