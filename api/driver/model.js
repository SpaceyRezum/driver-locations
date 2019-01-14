var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverSchema = new mongoose.Schema({
    activeLegID: { type: Schema.ObjectId, ref: 'Leg' },
    legProgress: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    }
});

module.exports = mongoose.model('Driver', DriverSchema);