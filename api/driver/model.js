var mongoose = require('mongoose');

var DriverSchema = new mongoose.Schema({
    activeLegID: {
        type: String,
        minlength: 2,
        maxlength: 2,
        required: true
    },
    legProgress: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    }
});

module.exports = mongoose.model('Driver', DriverSchema);