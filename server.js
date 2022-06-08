// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const port = 8000;
const cors = require('cors');
// const bodyParser = require('bodyParser');
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.use(cors());

app.post("/all", async function (req, res) {
    const body = await req.body;
    projectData = body;
    res.send(projectData);
    console.log(projectData);
});

app.get("/", async (req, res) => {
    console.log(projectData);
    res.send(projectData);
});

app.listen(port, function () { console.log('listening on port' + port); });