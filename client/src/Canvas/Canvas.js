import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import Leg from '../Leg/Leg';
import Stop from '../Stop/Stop';
import Driver from '../Driver/Driver';
import mapPath from './map.jpg';
import {checkForCompletion} from '../helpers';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundMap: null,
            scaleMultiplier: 4, // add a scaleMultiplier for visual clarity
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
        const { backgroundMap, scaleMultiplier } = this.state;
        const { stops, legs, driver } = this.props;
        const driverX = driver && driver.activeLegID ? driver.activeLegID.startStop.x + (driver.activeLegID.endStop.x - driver.activeLegID.startStop.x) * driver.legProgress / 100 : 0;
        const driverY = driver && driver.activeLegID ? driver.activeLegID.startStop.y + (driver.activeLegID.endStop.y - driver.activeLegID.startStop.y) * driver.legProgress / 100 : 0;
        return (
            <Stage width={800} height={800}>
                <Layer>
                    <Image image={backgroundMap} />
                </Layer>
                <Layer>
                    {legs ? legs.map((leg) => <Leg key={leg._id} startStop={leg.startStop} endStop={leg.endStop} completed={checkForCompletion(leg, driver)} scaleMultiplier={scaleMultiplier} />
                    ) : null}

                    {driver && driver.activeLegID ?
                        <Leg key={driver._id} startStop={driver.activeLegID.startStop} endStop={{ x: driverX, y: driverY }} completed={true} scaleMultiplier={scaleMultiplier} /> : null}
                </Layer>
                <Layer>
                    {stops ? stops.map((stop) => <Stop key={stop._id} x={stop.x} y={stop.y} name={stop.name} scaleMultiplier={scaleMultiplier} />) : null}

                    {driver && driver.activeLegID ? <Driver driverX={driverX} driverY={driverY} scaleMultiplier={scaleMultiplier} /> : null}
                </Layer>
            </Stage>
        );
    }
}

export default Canvas;