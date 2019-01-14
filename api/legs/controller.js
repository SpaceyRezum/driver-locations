var Leg = require('./model');

exports.retrieveAll = function(req, res) {
    Leg.find()
    .populate('startStop')
    .populate('endStop')
    .exec(function(err, legs) {
        if (err) return res.status(500).send(err);
        return res.send(legs)
    });
}