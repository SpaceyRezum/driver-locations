import React, { Component, Fragment } from 'react';
import { Stage, Layer, Image, Circle, Text, Line } from 'react-konva';
import mapPath from './map.jpg';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundMap: null,
            scaleMultiplier: 6
        }
    }

    renderDriverAndHighlightLeg(driver) {
        const driverLocation = {
            x: ((driver.activeLegID.startStop.x + (driver.activeLegID.endStop.x - driver.activeLegID.startStop.x) * driver.legProgress / 100) * this.state.scaleMultiplier),
            y: ((driver.activeLegID.startStop.y + (driver.activeLegID.endStop.y - driver.activeLegID.startStop.y) * driver.legProgress / 100) * this.state.scaleMultiplier)
        }
        const highlightedLeg = {
            points: [driver.activeLegID.startStop.x * this.state.scaleMultiplier, driver.activeLegID.startStop.y * this.state.scaleMultiplier, driverLocation.x, driverLocation.y]
        }

        return (
            <Fragment>
                <Circle x={driverLocation.x} y={driverLocation.y} radius={8} fill="red"/>
                <Line points={highlightedLeg.points} closed stroke="red"/>
            </Fragment>
        );
    }
    componentDidMount() {
        const backgroundMap = new window.Image();
        backgroundMap.src = mapPath;
        backgroundMap.onload = () => {
            this.setState({
                backgroundMap: backgroundMap
            });
        };
    }

    render() {
        const { backgroundMap, scaleMultiplier } = this.state;
        const { stops, legs, driver } = this.props;
        return (
            <Stage width={800} height={800} ref={this.stateRef}>
                <Layer>
                    <Image image={backgroundMap} />
                </Layer>
                <Layer>
                    {stops ? stops.map((stop, index) => {
                        return (
                            <Fragment key={stop._id}>
                                <Circle x={stop.x * scaleMultiplier} y={stop.y * scaleMultiplier} radius={10} fill="green" />
                                <Text x={stop.x * scaleMultiplier - 4.5} y={stop.y * scaleMultiplier - 4.5} text={stop.name} />
                            </Fragment>
                        );
                    }) : null}

                    {legs ? legs.map((leg) => {
                        return (
                            <Line key={leg._id}
                                points={
                                    [leg.startStop.x * scaleMultiplier,
                                    leg.startStop.y * scaleMultiplier,
                                    leg.endStop.x * scaleMultiplier,
                                    leg.endStop.y * scaleMultiplier]
                                }
                                closed
                                stroke="black" />
                        );
                    }) : null}

                    {driver && driver.activeLegID ?
                        this.renderDriverAndHighlightLeg(driver)
                        : null}
                </Layer>
            </Stage>
        );
    }
}

export default Canvas;