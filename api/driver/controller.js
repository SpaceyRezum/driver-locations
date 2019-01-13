var Driver = require('./model.js');

exports.retrievePosition = function (req, res) {
    Driver.findOne().exec(function(err, driver) {
        if (err) return res.status(400).send(err);
        return res.send(driver);
    });
}

exports.updatePosition = function(req, res) {
    var newLeg = req.body.activeLegID;
    var newLegProgress = req.body.legProgress;

    // validation
    if (!newLeg)
        return res.status(422).send("Please provide an 'activeLegID': a leg on which the driver should be located.");
    if (!newLegProgress)
        return res.status(422).send("Please provide a 'legProgress': the percentage already accomplished by the driver for the selected leg.");
    if (newLegProgress !== 0 && isNaN(parseInt(newLegProgress)))
        return res.status(422).send("Could not convert leg progress into a number.");
    if (newLegProgress < 0 || newLegProgress > 100)
        return res.status(422).send("Leg progress should be between 0 and 100.");
    
    // update db
    Driver.updateOne({activeLegID: newLeg, legProgress: newLegProgress}).exec(function(err, response) {
        if (err) return res.status(500).send(err);
        return res.send("Driver's location updated successfully.");
    })
}