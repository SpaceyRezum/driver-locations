var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LegSchema = new mongoose.Schema({
    startStop: {type: Schema.ObjectId, ref: 'Stop'},
    endStop: { type: Schema.ObjectId, ref: 'Stop'},
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