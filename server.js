var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Use bodyParser so body of client-to-server requests can be read as JSON object
app.use(bodyParser.json());

// Connect to local database
mongoose.connect('mongodb://localhost/driver_location_db');

// API routes
app.use('/legs', require('./api/legs'));
app.use('/stops', require('./api/stops'));
app.use('/driver', require('./api/driver')(io));
app.use('/bonusdriver', require('./api/bonusdriver')(io));

// Fallback in case no other no appropriate route is found
app.get('*', (req, res) => res.sendFile(__dirname + '/client/public/index.html'));

server.listen(port, () => console.log(`Listening on port ${port}`));

io.on('connection', function (socket) {
    console.log('connection established.');
    socket.on('new driver location', function (data) { console.log('new driver location:', data) });
    socket.on('new bonus driver location', function (data) { console.log('new bonus driver location:', data) });
    socket.on('disconnect', function () {
        console.log('connection closed.');
    });
});
