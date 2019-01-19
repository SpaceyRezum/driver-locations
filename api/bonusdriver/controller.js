var BonusDriver = require('./model');
var Leg = require('../legs/model');

exports.retrievePosition = function (req, res) {
    BonusDriver.findOne()
        .exec(function (err, driver) {
            if (err) return res.status(400).send(err);
            if (!driver) {
                driver = new BonusDriver({ x: 0, y: 0 }).save(function (error) {
                    if (error) return res.status(500).send(error);
                    return res.send(driver);
                })
            } else 
                return res.send(driver);
        });
}

exports.updatePosition = function (req, res, io) {
    var newX = req.body.x;
    var newY = req.body.y;

    // validation
    if (!newX || !newY)
        return res.status(422).send("Please provide both x and y coordinates.");
    if (newX > 200 || newX < 0 || newY > 200 || newY < 0)
        return res.status(422).send("Bonus driver's coordinates must be on the grid (i.e. between 0 and 200).");
    if (isNaN(parseInt(newX)) || isNaN(parseInt(newY)))
        return res.status(422).send("Coordinates could not be translated to numbers, please make sure you are sending number coordinates.");



    BonusDriver.findOneAndUpdate({ x: newX, y: newY }).exec(function (err, result) {
        if (err) return res.status(500).send(err);
        if (!result) {
            result = new BonusDriver();
            result.x = newX;
            result.y = newY;
        }
        
        result.save(function (error) {
            if (error) return res.status(500).send(error);
            io.sockets.emit('new bonus driver location', { x: newX, y: newY });
            return res.send("Bonus Driver's location updated successfully.");
        });
    });
}