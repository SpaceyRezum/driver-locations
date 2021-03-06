import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';

class Leg extends PureComponent {
    render() {
        const { startStop, endStop, completed, scaleMultiplier, color } = this.props;
        return <Line points={
                [startStop.x * scaleMultiplier,
                startStop.y * scaleMultiplier,
                endStop.x * scaleMultiplier,
                endStop.y * scaleMultiplier]
            }
            closed
            stroke={color ? color : (completed ? "red" : "black")} />
    }
}

Leg.propTypes = {
    startStop: PropTypes.object,
    endStop: PropTypes.object,
    completed: PropTypes.bool,
    scaleMultiplier: PropTypes.number,
    color: PropTypes.string
}

export default Leg;