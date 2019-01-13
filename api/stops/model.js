var mongoose = require('mongoose');

var StopSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 1,
        uppercase: true,
        required: true
    },
    x: {
        type: Number,
        min: 0,
        max: 200,
        required: true
    },
    y: {
        type: Number,
        min: 0,
        max: 200,
        required: true
    }
});

module.exports = mongoose.model('Stop', StopSchema);