exports.checkForCompletion = (leg, driver) => {
    if (driver.activeLegID && driver.activeLegID.legID > leg.legID)
        return true;
    else
        return false;
}

exports.calculateTimeLeft = (driver, legs) => {
    let time = 0;
    legs.forEach(leg => {
        if (!this.checkForCompletion(leg, driver)) {
            let distance = Math.sqrt(Math.abs(leg.startStop.x - leg.endStop.x * leg.startStop.x - leg.endStop.x) + Math.abs(leg.startStop.y - leg.endStop.y * leg.startStop.y - leg.endStop.y));

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