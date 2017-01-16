var express = require('express');
var compression = require('compression');

var app = express();

var port = 9000;

app.use(compression());
app.use(express.static(__dirname));

app.listen(port, function() {
  console.log("App Server listening on port " + port);
});
