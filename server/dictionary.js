/**
 * Created by Ken on 25/08/2015.
 */
'use strict';
var dburl = {
    "url" : [       "mongodb://123:456@ds040948.mongolab.com:40948/words"    ]
};

var express = require('express'),
    path    = require('path'),
    log		= require('winston').loggers.get('app:server'),
    bodyParser  = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    MONGODB_URI = "mongodb://localhost:27017/template",
    router  = express.Router(),
    _ = require('lodash');

var db;
var wordCollection;

MongoClient.connect( dburl.url[0], function(err, database) {
    if(err){
        console.log(err);
        throw err;
    }
    db = database;
    wordCollection = db.collection('words');
});



router    //.use(bodyParser())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(function (req, res, next){
        console.log("inside");
        next();
    })
    .route('/dictionary')
    .get(function(req,res) {
        wordCollection.find({}).toArray(function(err, docs) {
           if(err){
               res.status(400).send('Not Found');
           }
            if(docs){
                res.json(docs);
            }
        });
    })
    .post(function(req,res){
        console.log(req.body);
        var doc = req.body;
        wordCollection.insert(doc, { w:1 }, function(err, result) {
            res.status(200).send('inserted');
            if(err)
                console.log(err);
            if(result){
                console.log(result);
            }
        });

    })
    .put(function(req, res){
        res.status(200).send("Delete");
    });

router.param('id', function(req, res, next){  //Go first
        console.log("Receiving");
        req.dbQuery = { _id : new ObjectID( req.params.id) };
        next();
    })
    .route('/dictionary/:id')
    .get(function(req, res){
        res.status(200).send("Delete");
    })
    //.put( function(req, res){
    //    console.log("in router 6");
    //    var contact = req.body;
    //    console.log("contact " + contact);
    //    delete contact.$promise;        //angular use add to object
    //    delete contact.$resolved;       //they are sent to server, delete so it isn't stored
    //})
    .delete(function(req,res){
        res.status(200).send("Delete");
    });

module.exports = router;

/*
 @completed:
 C :
 R :
 U :
 D :
 */