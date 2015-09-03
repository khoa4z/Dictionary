/**
 * Created by Ken on 23/08/2015.
 */
'use strict';

var express = require('express'),
    path    = require('path')   ,
    log     = require('winston').loggers.get('app:server'),
    app     = express();

// /Files
var dictionary = require('./dictionary');

//Config -> config files
var config  = {
    "port"  : 3007,
    "ip"    : "127.0.0.1"
};


app.use(express.static(path.join(__dirname + '/../')));
//@todo: Test: app.use(express.static('../'));
app.use(express.static('../public/..'));
app.use(express.static(path.join(__dirname + '/../public/'))); // static serving all files in public

//app.use
app.use('/api', dictionary);           //must specify before

app.get('*', function (req, res) {
    //res.sendFile(path.join('/public/main.html'), {"root": "."}); //If starts outside of the server dir
    res.sendFile(path.join('/public/main.html'), {"root": "../"});
});

// Start Server
app.listen(config.port, config.ip, function (err) {
    if (err) {
        log.error('Unable to listen for connections', err);
        process.exit(10);
    }
    log.info('Magic happens in http://' +
    config.ip + ':' + config.port);
});