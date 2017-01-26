var express = require('express');
var dotenv = require('dotenv');

var router = require('./src/routes');

var app = express();

var port = 3000;

dotenv.load();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', router);

app.listen(port, function() {
  console.log("Listening on port " + port);
});
