var Driver = require('./model');
var Leg = require('../legs/model');

exports.retrievePosition = function (req, res) {
    Driver.findOne()
        .populate({
            path: 'activeLegID',
            populate: [{
                path: 'startStop'
            }, {
                path: 'endStop',
            }]
        })
        .exec(function (err, driver) {
            if (err) return res.status(400).send(err);
            return res.send(driver);
        });
}

exports.updatePosition = function (req, res) {
    var newLeg = req.body.activeLegID;
    var newLegProgress = req.body.legProgress;

    // validation
    if (!newLeg)
        return res.status(422).send("Please provide an 'activeLegID': a leg on which the driver should be located.");
    if (newLeg.length > 2 || newLeg.match(/[1-9]/g))
        return res.status(422).send("The new leg provided should be a combination of two adjacent letters.");
    if (!newLegProgress)
        return res.status(422).send("Please provide a 'legProgress': the percentage already accomplished by the driver for the selected leg.");
    if (newLegProgress !== 0 && isNaN(parseInt(newLegProgress)))
        return res.status(422).send("Could not convert leg progress into a number.");
    if (newLegProgress < 0 || newLegProgress > 100)
        return res.status(422).send("Leg progress should be between 0 and 100.");

    // update db
    Leg.findOne({legID: newLeg}).exec(function(err, leg) {
        if (err) 
            return res.status(500).send(err);
        else if (!leg)
            return res.status(404).send("New leg could not be found in the list of available legs.");
        else {
            Driver.updateOne({ activeLegID: leg._id, legProgress: newLegProgress }).exec(function (err, response) {
                if (err) return res.status(500).send(err);
                return res.send("Driver's location updated successfully.");
            });
        }
    });
}