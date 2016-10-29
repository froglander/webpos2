var models  = require('../models');
var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Send our static landing html page
  //res.sendFile(path.resolve(__dirname, '../public/landing.html'));
  res.sendFile(path.resolve(process.cwd() + '../public/landing.html'));
});

module.exports = router;
