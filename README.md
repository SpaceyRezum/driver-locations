## Driver Location App
Provided a grid (200x200), a set of stops (with x & y coordinates), a main driver's location and a bonus driver's location, this app will allow you to:
- Visualize the position of the main driver on the (fake) map, his/her current leg (i.e. a path between two stops), the legs already completed as well as the time left to finish the entire route.
- Visualize the position of the bonus driver, his/her path to the closest stop and the legs needing completion after the closest stop.
- Change the position of the main driver
- Change the position of the bonus driver

#### Tech Stack
- FrontEnd
-- React using [Create React App](https://github.com/facebook/create-react-app) as boilerplate configuration
-- [Material UI - React](https://material-ui.com) for simple UI components (inputs, forms, sliders, etc.)
-- [Konva-React](https://konvajs.github.io/docs/react/) a React adaptation of the Konva framework which simplifies the use of HTML5 Canvas for grid rendering
- BackEnd
-- Node.js & Express.js
-- Socket.io for real-time rendering
-- MongoDB via [MongooseJS](https://mongoosejs.com/)

#### How to run the app
1. Download the solution locally from Github
2. Set up the database locally
-- Install [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/) and follow the steps to launch the mongo shell
-- Once the shell started in terminal by typing `mongo` once `mongod` is running or using any Mongo DB management solution), proceed to create the database and seeding the initial data
-- Create the `driver_location_db` locally by typing `use driver_location_db` in the mongo shell
-- Open a terminal window and navigate to the folder where the solution is stored and paste the steps from [database-seed.txt](../database-seed.txt).

3. Install solution dependencies
-- Open terminal at root of solution folder and run `npm install`
-- Then `cd client`, `npm install`

4. Run the solution
-- Get back to folder root and run `npm run dev` to start both the server and the client at the same time (default ports are localhost:3000 for the client and localhost:5000 for the server). A new tab should open in your browser with the app ready to use.