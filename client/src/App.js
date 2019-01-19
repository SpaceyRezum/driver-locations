import React, { Component } from 'react';
import styles from './App.module.css';
import axios from 'axios';
import io from 'socket.io-client';
import Canvas from './Canvas/Canvas';
import DriverForm from './Forms/DriverForm';
import BonusDriverForm from './Forms/BonusDriverForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: [],
      legs: [],
      driver: {
        activeLegID: "",
        legProgress: 0
      },
      bonusDriver: {
        x: 0,
        y: 0
      },
      displayDriver: true,
      displayBonusDriver: false
    }

    // socket connection & eventListeners
    const socket = io.connect('http://localhost:3000');
    socket.on('new driver location', function (data) {
      this.setState({ driver: data });
    }.bind(this));
    socket.on('new bonus driver location', function (data) {
      this.setState({ bonusDriver: data });
    }.bind(this));

    // method binding to use this.setState
    this.handleDriverFormChange = this.handleDriverFormChange.bind(this);
    this.handleBonusDriverFormChange = this.handleBonusDriverFormChange.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.saveDriverLocationToDb = this.saveDriverLocationToDb.bind(this);
    this.saveBonusDriverLocationToDb = this.saveBonusDriverLocationToDb.bind(this); 
  }

  componentDidMount() {
    axios.all([
      axios.get('/stops'),
      axios.get('/legs'),
      axios.get('/driver'),
      axios.get('/bonusdriver')
    ]).then(axios.spread((stopsRes, legsRes, driverRes, bonusDriverRes) => {
      this.setState({
        stops: stopsRes.data,
        legs: legsRes.data,
        driver: driverRes.data,
        bonusDriver: bonusDriverRes.data
      });
    }));
  }

  render() {
    const { stops, legs, driver, bonusDriver, displayDriver, displayBonusDriver } = this.state;
    return (
      <div className={styles.app}>
        <>
          <div className={styles.formsContainer}>
            {legs && driver ? <DriverForm driver={driver} availableLegs={legs} changeHandler={this.handleDriverFormChange} saveHandler={this.saveDriverLocationToDb} toggleDisplay={this.toggleDisplay} display={displayDriver}/> : null}
            {bonusDriver ? <BonusDriverForm x={bonusDriver.x} y={bonusDriver.y} changeHandler={this.handleBonusDriverFormChange} saveHandler={this.saveBonusDriverLocationToDb} toggleDisplay={this.toggleDisplay} display={displayBonusDriver}/> : null}
          </div>
          <div className={styles.canvasContainer}>
            {stops && legs && driver && bonusDriver ? <Canvas stops={stops} legs={legs} driver={displayDriver ? driver : null} bonusDriver={displayBonusDriver ? bonusDriver : null}/> : null}
          </div>
        </>
      </div>
    );
  }

  handleDriverFormChange(event, value) {
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

  handleBonusDriverFormChange(event) {
    if (event.target.value < 0 || event.target.value > 200)
      alert("Bonus driver's coordinates must be above 0 and below 200.");
    else {
      const bonusDriver = { ...this.state.bonusDriver };
      bonusDriver[event.target.name] = parseInt(event.target.value);
      this.setState({ bonusDriver: bonusDriver });
    }
  }

  toggleDisplay(event) {
    if (event.target.name === "main")
      this.setState({displayDriver: !this.state.displayDriver});
    else if (event.target.name === "bonus")
      this.setState({displayBonusDriver: !this.state.displayBonusDriver});
  }

  saveDriverLocationToDb() {
    axios.put('/driver', { "activeLegID": this.state.driver.activeLegID.legID, "legProgress": this.state.driver.legProgress })
      .then((response, err) => { if (err) return alert(err); else return alert(response.data) });
  }

  saveBonusDriverLocationToDb() {
    axios.put('/bonusdriver', { "x": this.state.bonusDriver.x, "y": this.state.bonusDriver.y })
      .then((response, err) => { if (err) return alert(err); else return alert(response.data) });
  }
}

export default App;
