var express = require('express');
var path = require('path');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 8080);

app.use('/assets', express.static(path.join(__dirname, '/htdocs/assets')));
app.use('*', express.static(path.join(__dirname, '/htdocs/index.html')));
app.use('*', express.static(path.join(__dirname, '/htdocs')));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
