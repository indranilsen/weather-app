var express = require('express');

var app = express();

var port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
  res.send("Hello World!");
});

app.get('/api', function(req, res) {
  res.send("Hey World!");
});

app.get('/api/coords', function(req, res) {
    res.send("COORDINATES");
});

app.get('/api/location', function(req, res) {
  res.send("LOCATION");
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
