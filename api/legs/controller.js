var Leg = require('./model');

exports.retrieveAll = function(req, res) {
    Leg.find().exec(function(err, legs) {
        if (err) return res.status(500).send(err);
        return res.send(legs)
    });
}