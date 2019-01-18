import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Circle, Text } from 'react-konva';

class Stop extends PureComponent {
    render() {
        const {x, y, name, scaleMultiplier } = this.props;
        return (
            <Fragment>
                <Circle x={x * scaleMultiplier} y={y * scaleMultiplier} radius={10} fill="green" />
                <Text x={x * scaleMultiplier - 4.5} y={y * scaleMultiplier - 4.5} text={name} />
            </Fragment>
        )
    }
}

Stop.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    name: PropTypes.string,
    scaleMultiplier: PropTypes.number
}

export default Stop;