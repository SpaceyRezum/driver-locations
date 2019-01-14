var express = require('express');
var app = express();
var port = process.env.PORT || 8090;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Use bodyParser so body of client-to-server requests can be read as JSON object
app.use(bodyParser.json());

// Connect to local database
mongoose.connect('mongodb://localhost/driver_location_db');

// API routes
app.use('/legs', require('./api/legs'));
app.use('/stops', require('./api/stops'));
app.use('/driver', require('./api/driver'));
// Fallback in case no other no appropriate route is found
app.get('*', (req, res) => res.send("Hi there, this route is a fallback."));

app.listen(port, () => console.log(`Listening on port ${port}`));