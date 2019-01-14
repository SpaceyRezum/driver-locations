import React, { Component } from 'react';
import styles from './App.module.css';
import Canvas from './Canvas/Canvas';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: [],
      legs: [],
      driver: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.all([
      axios.get('/stops'),
      axios.get('/legs'),
      axios.get('/driver')
    ]).then(axios.spread((stopsRes, legsRes, driverRes) => {
      this.setState({
        stops: stopsRes.data,
        legs: legsRes.data,
        driver: driverRes.data
      });
    }));
  }

  render() {
    const {stops, legs, driver} = this.state;
    return (
      <div className={styles.app}>
        <div className={styles.canvasContainer}>
          <Canvas stops={stops} legs={legs} driver={driver} />
        </div>
      </div>
    );
  }
}

export default App;
