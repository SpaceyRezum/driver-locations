import React, { Component } from 'react';
import styles from './App.module.css';
import axios from 'axios';
import io from 'socket.io-client';
import Form from './Form/Form';
import Canvas from './Canvas/Canvas';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: [],
      legs: [],
      driver: {},
    }
    
    const socket = io.connect('http://localhost:3000');
    socket.on('new driver location', function (data) {
      this.setState({driver: data});
    }.bind(this));

    this.handleFormChange = this.handleFormChange.bind(this);
    this.saveDriverLocationToDb = this.saveDriverLocationToDb.bind(this);
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
    const { stops, legs, driver } = this.state;
    return (
      <div className={styles.app}>
        {stops && legs && driver ?
          <>
            <div className={styles.formContainer}>
              <Form driver={driver} availableLegs={legs} changeHandler={this.handleFormChange} saveHandler={this.saveDriverLocationToDb} />
            </div>
            <div className={styles.canvasContainer}>
              <Canvas stops={stops} legs={legs} driver={driver} />
            </div>
          </> : null}
      </div>
    );
  }

  handleFormChange(event, value) {
    const newDriver = { ...this.state.driver };
    if (event.target.name === "activeLegID") {
      const newActiveLeg = this.state.legs.find((leg) => {
        return leg.legID === event.target.value;
      })
      newDriver.activeLegID = { ...newActiveLeg };
    } else if (value) {
      newDriver.legProgress = value;
    }
    this.setState({ driver: newDriver });
  }

  saveDriverLocationToDb() {
    axios.put('/driver', { "activeLegID": this.state.driver.activeLegID.legID, "legProgress": this.state.driver.legProgress })
    .then((response, err) => { if (err) return alert(err); else return alert(response.data) });
  }
}

export default App;
