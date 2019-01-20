#### How to use the app
The usage of the application is pretty straightforward as the interface constitutes of four parts:
1. The map on the right hand side for grid visualization.
2. The map's legend under the map itself which describes the color schemes used.
3. The main driver's form (top left hand side) that allows users to modify the driver's position on the global route (the save button allows the data to be stored in the database) and to toggle the main driver's information display on the map.
4. The bonus driver's form (bottom left hand side) that allows users to modify the bonus driver's absolute position on the map (same thing, the save button allows the data to be stored in the database) and to toggle the bonus driver's information display on the map.

#### API Structure and available operations
The API is composed of 4 parts with various operation each:
1. /driver
-- GET '/driver' retrieves the main driver's location
-- PUT '/driver' requiring the two following parameters to update the driver's location: `{ activeLegID: 2 letter string representing a leg between two existing stops, legProgress: number between 0 to 100}`. Modifications should reflect in real-time on the app thanks to the use of socket.io.
2. /stops
-- GET '/stops' retrieves all stops of the path
3. /legs
-- GET '/legs' retrieves all legs constituting the path
4. /bonusdriver
-- GET '/bonusdriver' retrieves the bonus driver's location
-- PUT '/bonusdriver' requiring the two following parameters to update the bonus driver's location: `{ x: number between 0 to 200, y: number between 0 to 200}`. Modifications should reflect in real-time on the app thanks to the use of socket.io.
