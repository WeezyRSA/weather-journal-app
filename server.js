// Setup empty JS object to act as endpoint for all routes
projectData = [];

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const listening = () => {
  console.log(`Server running on localhost: ${port}`);
}
app.listen(port, listening);

app.get('/', function(req, res) {
  console.log(projectData);
  res.send(projectData);
});
app.post('/entry', function(req, res) {
  const newEntry = {
    temperature : req.body.temperature,
    date : req.body.date,
    userResponse : req.body.userResponse
  };
  projectData.push(newEntry);
  res.send(projectData);
});

