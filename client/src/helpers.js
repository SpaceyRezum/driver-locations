exports.retrieveDriverCoordinates = (driver) => {
    return {
        x: driver.activeLegID.startStop.x + (driver.activeLegID.endStop.x - driver.activeLegID.startStop.x) * driver.legProgress / 100,
        y: driver.activeLegID.startStop.y + (driver.activeLegID.endStop.y - driver.activeLegID.startStop.y) * driver.legProgress / 100
    }
}

exports.checkForCompletion = (leg, driver) => {
    if (driver && driver.activeLegID && driver.activeLegID.legID > leg.legID)
        return true;
    else
        return false;
}

exports.getArrayOfLegsNeedingCompletion = (legs, closestStopToDriver) => {
    // first sort legs
    const sortedLegs = legs.sort((legA, legB) => {
        return legA.legID >= legB.legID ? 1 : -1;
    });

    let needCompletion = false;
    let result = [];

    sortedLegs.forEach((leg) => {
        if (leg.startStop.name === closestStopToDriver.name)
            needCompletion = true;

        if (needCompletion)
            result.push(leg);
    });

    return result;
}

exports.calculateTimeLeft = (driver, legs) => {
    let time = 0;
    legs.forEach(leg => {
        if (!this.checkForCompletion(leg, driver)) {
            let distance = calculateDistance(leg.startStop.x, leg.endStop.x, leg.startStop.y, leg.endStop.y);

            if (driver.activeLegID.legID === leg.legID)
                distance = distance * (100 - driver.legProgress) / 100;
            time += distance / leg.speedLimit;
        }
    });
    return parseFloat(time).toFixed(2);
}

exports.formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = (time % 1) * 60;
    const seconds = Math.round((minutes % 1) * 60);

    return `${hours} hours, ${Math.floor(minutes)} minutes & ${seconds} seconds`;
}

exports.findTheClosestStop = (stops, driverLocation) => {
    let result = { name: "", x: null, y: null };
    let shortestDistance = null;
    stops.forEach((stop) => {
        const distanceToStop = calculateDistance(driverLocation.x, driverLocation.y, stop.x, stop.y);
        if (shortestDistance === null || shortestDistance > distanceToStop) {
            result = { name: stop.name, x: stop.x, y: stop.y };
            shortestDistance = distanceToStop;
        }
    })
    return result;
}

function calculateDistance(startStopX, startStopY, endStopX, endStopY) {
    return Math.sqrt(Math.abs((startStopX - endStopX) * (startStopX - endStopX)) + Math.abs((startStopY - endStopY) * (startStopY - endStopY)));
}

