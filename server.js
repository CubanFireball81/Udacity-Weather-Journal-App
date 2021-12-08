// Setup empty JS object to act as endpoint for all routes
let projectData = {
    temp: "",
    date: "",
    feelings: ""
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)});

// Return data for the get route
app.get("/all", (request, response) => {
    response.send(projectData);
});

// Add data to projectData for the post route also handle empty date and temp errors
app.post("/add", (request, response) => {

    // Throw error if temp is empty
    if (!request.body.temp) {
    throw new Error("Temp can not be empty!");
    }

    // Thrown error if date is empty
    if (!request.body.date) {
    throw new Error("Date can not be empty!");
    }

    projectData["temp"] = request.body.temp;
    projectData["date"] = request.body.date;
    projectData["feelings"] = request.body.feelings;
});