import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import Leg from '../Leg/Leg';
import Stop from '../Stop/Stop';
import Driver from '../Driver/Driver';
import mapPath from './map.jpg';
import { retrieveDriverCoordinates, checkForCompletion, findTheClosestStop, getArrayOfLegsNeedingCompletion } from '../helpers';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundMap: null,
            scaleMultiplier: 4, // add a scaleMultiplier for visual clarity
            bonusDriverColor: "orange"
        }
    }

    componentDidMount() {
        const backgroundMap = new window.Image();
        backgroundMap.src = mapPath;
        backgroundMap.onload = () => {
            this.setState({
                backgroundMap: backgroundMap,
            });
        };
    }

    render() {
        const { backgroundMap, scaleMultiplier, bonusDriverColor } = this.state;
        const { stops, legs, driver, bonusDriver } = this.props;
        const driverCoordinates = driver && driver.activeLegID ? retrieveDriverCoordinates(driver) : null;
        const closestStopToBonusDriver = stops && bonusDriver ? findTheClosestStop(this.props.stops, this.props.bonusDriver) : null;
        const legsNeedingCompletionByBonusDriver = legs && bonusDriver && closestStopToBonusDriver ? getArrayOfLegsNeedingCompletion(legs, closestStopToBonusDriver) : null;
        

        return (
            <Stage width={800} height={800}>
                <Layer>
                    <Image image={backgroundMap} />
                </Layer>
                <Layer>
                    {legs ? legs.map((leg) => <Leg key={leg._id} startStop={leg.startStop} endStop={leg.endStop} completed={checkForCompletion(leg, driver)} scaleMultiplier={scaleMultiplier} />
                    ) : null}

                    {driverCoordinates ?
                        <Leg key={driver._id} startStop={driver.activeLegID.startStop} endStop={driverCoordinates} completed={true} scaleMultiplier={scaleMultiplier} /> : null}
                </Layer>
                <Layer>
                    {bonusDriver ?
                        <Leg startStop={{ x: bonusDriver.x, y: bonusDriver.y }} endStop={closestStopToBonusDriver} color={bonusDriverColor} scaleMultiplier={scaleMultiplier} /> : null}

                    {legsNeedingCompletionByBonusDriver ? legsNeedingCompletionByBonusDriver.map((leg) => <Leg key={`bonus_${leg._id}`} startStop={leg.startStop} endStop={leg.endStop} scaleMultiplier={scaleMultiplier} color={bonusDriverColor}/>) : null}
                </Layer>
                <Layer>
                    {bonusDriver ? <Driver driverX={bonusDriver.x} driverY={bonusDriver.y} scaleMultiplier={scaleMultiplier} color={bonusDriverColor} /> : null}
                    {driverCoordinates ? <Driver driverX={driverCoordinates.x} driverY={driverCoordinates.y} scaleMultiplier={scaleMultiplier} color={"red"}/> : null}
                </Layer>
                <Layer>
                    {stops ? stops.map((stop) => <Stop key={stop._id} x={stop.x} y={stop.y} name={stop.name} scaleMultiplier={scaleMultiplier} />) : null}
                </Layer>
            </Stage>
        );
    }
}

export default Canvas;