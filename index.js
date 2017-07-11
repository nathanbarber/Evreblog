var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var socket = require('socket.io');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname + '/public' + '/lib' + '/img' + '/favicon.png')));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var server = require('http').Server(app);
var io = socket(server);
server.listen(8083, function() {
    console.log("...listening on 8083");
})

var spoof = "Whales are a widely distributed and diverse group of fully aquatic placental marine mammals. They are an informal grouping within the infraorder Cetacea, usually excluding dolphins and porpoises."
var clientsConnected = 0;
var softDisconnect = false;

io.on('connection', function(socket) {
    clientsConnected++;
    console.log(clientsConnected + ' sockets active');
    io.emit('update', {data: 'Hello new connection!'});
    io.emit('socketsActive', {data: clientsConnected});
    socket.on('softDisconnect', function(data) {
        clientsConnected--;
        console.log(clientsConnected + ' sockets active');
        softDisconnect = true;
        socket.disconnect();
        io.emit('socketsActive', {data: clientsConnected});
    })
    socket.on('disconnect', function(data) {
        if(!softDisconnect) {
            clientsConnected--;
            console.log(clientsConnected + ' sockets active');
            io.emit('socketsActive', {data: clientsConnected});
        } else {
            softDisconnect = false;
        }
    })
})

app.get('/currentStory', function(req, res) {
    res.send(spoof);
})

app.post('/updateStory', function(req, res) {
    console.log(req.query.data);
    spoof += " " + req.query.data;
    res.writeHead(200);
});