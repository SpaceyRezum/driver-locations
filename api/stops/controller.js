var Stop = require('./model');

exports.retrieveAll = function (req, res) {
    Stop.find().exec(function (err, stops) {
        if (err) return res.status(500).send(err);
        return res.send(stops)
    });
}