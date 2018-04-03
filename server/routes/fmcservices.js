var express = require('express');
var router = express.Router();

var logger = require('../resources/logger');
var dbAccess = require('./utils/dbaccess');

var collection_name = "coll_edf_payload";

/* GET edf consumers listing. */
router.get('/payloads', function(req, res, next) {
  logger.debug("Getting FMC payloads");
  var db = req.edfDB;
  dbAccess.findAllDocuments(db, collection_name, {}, {}, function(err, response){
    if(err) {
      logger.error("Error in getting FMC payloads", err);
      res.send({success: false, error: "Error in getting FMC payloads"});
    } 
    else res.send({success: true, data: response});
  });
});

router.get('/payloads/upload', function(req, res, next) {
  logger.debug("Getting FMC upload payloads");
  var db = req.edfDB;
  dbAccess.findAllDocuments(db, collection_name, {category: "Upload"}, {}, function(err, response){
    if(err) {
      logger.error("Error in getting FMC payloads", err);
      res.send({success: false, error: "Error in getting FMC payloads"});
    } 
    else res.send({success: true, data: response});
  });
});

router.get('/payloads/download', function(req, res, next) {
  logger.debug("Getting FMC payloads");
  var db = req.edfDB;
  dbAccess.findAllDocuments(db, collection_name, {category: "Download"}, {}, function(err, response){
    if(err) {
      logger.error("Error in getting FMC payloads", err);
      res.send({success: false, error: "Error in getting FMC payloads"});
    } 
    else res.send({success: true, data: response});
  });
});

router.post('/upload', function(req, res, next){
  logger.debug("Uploading payload with data", req.body);
  var db = req.edfDB;
  var document = {
    category: "Upload",
    payload: JSON.stringify(req.body),
    created_by: req.body.createdBy || "",
    create_date: new Date()
  };
  dbAccess.insertDocument(db, collection_name, document, function(err, response){
    if(err) {
      logger.error("Error in uploading payload", err);
      res.send({success: false, error: "Error in uploading payload"});
    }
    else res.status(201).send({success: true, data: response});
  });
});

router.post('/download', function(req, res, next){
  logger.debug("Downloading payload with data", req.body);
  var db = req.edfDB;
  var document = {
    category: "Download",
    created_by: req.body.createdBy || "",
    create_date: new Date()
  };
  dbAccess.insertDocument(db, collection_name, document, function(err, response){
    if(err) {
      logger.error("Error in downloading payload", err);
      res.send({success: false, error: "Error in downloading payload"});
    }
    else res.status(201).send({success: true, data: response});
  });
});

module.exports = router;
