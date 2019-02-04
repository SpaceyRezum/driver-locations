## Driver Location App
Provided a grid (200x200), a set of stops (with x & y coordinates), a main driver's location and a bonus driver's location, this app will allow you to:
- Visualize the position of the main driver on the (fake) map, his/her current leg (i.e. a path between two stops), the legs already completed as well as the time left to finish the entire route.
- Visualize the position of the bonus driver, his/her path to the closest stop and the legs needing completion after the closest stop.
- Change the position of the main driver
- Change the position of the bonus driver

#### Tech Stack
- FrontEnd
  - React using [Create React App](https://github.com/facebook/create-react-app) as boilerplate configuration
  - [Material UI - React](https://material-ui.com) for simple UI components (inputs, forms, sliders, etc.)
  - [Konva-React](https://konvajs.github.io/docs/react/) a React adaptation of the Konva framework which simplifies the use of HTML5 Canvas for grid rendering
- BackEnd
  - Node.js & Express.js
  - Socket.io for real-time rendering
  - MongoDB via [MongooseJS](https://mongoosejs.com/)

#### How to run the app
1. Download the solution locally from Github
2. Set up the database locally
  - Install [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)
  - Open a terminal window and type `mongod` to start MongoDB on localhost
  - Open a second terminal windown and navigate to the root of the folder downloaded in step 1 and type `mongo` to open the mongo shell
  - Create the `driver_location_db` locally by typing `use driver_location_db`
  - Still from the root of the foder donwloaded in step 1 paste the steps from [database-seed.txt](./database-seed.txt) in the mongo shell.

3. Install solution dependencies
  - Exit the mongo shell, and, still at root of solution folder and run `npm install`
  - Then `cd client`, `npm install`

4. Run the solution
  - Get back to folder root and run `npm run dev` to start both the server and the client at the same time (default ports are localhost:3000 for the client and localhost:5000 for the server). A new tab should open in your browser with the app ready to use.
