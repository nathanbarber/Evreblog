var express = require('express.io');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var socket = require('socket.io');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname + '/public' + '/lib' + '/img' + '/favicon.png')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(8083);

var spoof = "Whales are a widely distributed and diverse group of fully aquatic placental marine mammals. They are an informal grouping within the infraorder Cetacea, usually excluding dolphins and porpoises."

app.get('/currentStory', function(req, res) {
    res.send(spoof);
})

app.post('/updateStory', function(req, res) {
    console.log(req.query.data);
    spoof += " " + req.query.data;
    res.writeHead(200);
});