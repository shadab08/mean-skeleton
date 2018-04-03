var express = require('express');
var router = express.Router();

var logger = require('../resources/logger');
var dbAccess = require('./utils/dbaccess');

var collection_name = "coll_edf_consumer";

/* GET edf consumers listing. */
router.get('/consumers', function(req, res, next) {
  logger.debug("Getting EDF consumer listing");
  var db = req.edfDB;
  dbAccess.findAllDocuments(db, collection_name, {}, {}, function(err, response){
    if(err) {
      logger.error("Error in getting EDF consumers", err);
      res.send({success: false, error: "Error in getting EDF consumers"});
    } 
    else res.send({success: true, data: response});
  });
});

router.post('/consumer', function(req, res, next){
  logger.debug("Creating new consumer with data", req.body);
  var db = req.edfDB;

  var document = {
    edfhook: req.body.edfHook,
    consumer_url: req.body.consumerURL,
    created_by: req.body.createdBy,
    create_date: new Date()
  }
  dbAccess.insertDocument(db, collection_name, document, function(err, response){
    if(err) {
      logger.error("Error in creating EDF consumers", err);
      res.send({success: false, error: "Error in creating EDF consumers"});
    }
    else res.status(201).send({success: true, data: response});
  });
});

module.exports = router;
