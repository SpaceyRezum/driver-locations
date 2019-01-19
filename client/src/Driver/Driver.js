import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Circle} from 'react-konva';

class Driver extends PureComponent {
    render() {
        const { driverX, driverY, scaleMultiplier, color} = this.props;
        return <Circle x={driverX * scaleMultiplier} y={driverY * scaleMultiplier} radius={driverX ? 8 : 0} fill={color ? color : "black"} />
    }
}

Driver.propTypes = {
    driverX: PropTypes.number,
    driverY: PropTypes.number,
    scaleMultiplier: PropTypes.number,
    color: PropTypes.string
}

export default Driver;