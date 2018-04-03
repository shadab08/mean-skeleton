var ObjectId = require('mongodb').ObjectID;
var logger = require("../../resources/logger");

var DBAccessModule = function(){
    var findDocument = function(db, collection, condition, options, callback){
        var collection = db.get(collection);
        collection.findOne(condition, options, function (err, response) {
            callback(err, response);
        });
    };

    var findAllDocuments = function(db, collection, condition, options, callback){
        var collection = db.get(collection);
        collection.find(condition, options, function (err, response) {
            callback(err, response);
        });
    };

    var insertDocument = function(db, collection, document, callback){
        var collection = db.get(collection);
        collection.insert(document, function (err, response) {
            callback(err, response);
        });
    };

    var updateDocuments = function(db, collection, condition, updateDoc, callback){
        var collection = db.get(collection);
        collection.update(condition, updateDoc, function (err, response) {
            callback(err, response);
        });
    };

    var replaceDocument = function(db, collection, condition, updateDoc, callback){
        var collection = db.get(collection);
        collection.replaceOne(condition, updateDoc, function (err, response) {
            callback(err, response);
        });
    };

    var deleteDocuments = function(db, collection, condition, callback){
        var collection = db.get(collection);
        collection.remove(condition, function (err, response) {
            callback(err, response);
        });
    };

    return {
        findDocument: findDocument,
        findAllDocuments: findAllDocuments,
        insertDocument: insertDocument,
        updateDocuments: updateDocuments,
        replaceDocument : replaceDocument,
        deleteDocuments: deleteDocuments
    };
}();

module.exports = DBAccessModule;