var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BonusDriverSchema = new mongoose.Schema({
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

module.exports = mongoose.model('BonusDriver', BonusDriverSchema);