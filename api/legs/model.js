var mongoose = require('mongoose');

var LegSchema = new mongoose.Schema({
    startStop: {
        type: String,
        maxlength: 1,
        uppercase: true,
        required: true
    },
    endStop: {
        type: String,
        maxlength: 1,
        uppercase: true,
        required: true
    },
    speedLimit: {
        type: Number,
        min: 0
    },
    legID: {
        type: String,
        minlength: 2,
        maxlength: 2,
        required: true
    }
});

module.exports = mongoose.model('Leg', LegSchema);