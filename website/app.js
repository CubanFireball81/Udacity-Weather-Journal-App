/* Global Variables */
// URL for OpenWeatherMap API
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d3ef38a43f231726976dc66febc96243&units=imperial';

// Get the current date
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// "Generate" Button Event listener
document.getElementById('generate').addEventListener('click', performAction);

// Function called by the event listener
function performAction(e) {
  e.preventDefault();

  // Collect users input
  const userZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(weatherURL, userZip, apiKey)
    .then(function (userData) {

      // POST the collected data
      postData('/add', { date: newDate, temp: userData.main.temp, feelings })
    }).then(function (newData) {

      // Update to update HTML
      refreshUI();
    })
}

// GET API data from OpenWeather
const getWeather = async (weatherURL, userZip, apiKey) => {

  // Pass fetch() info to the res
  const res = await fetch(weatherURL + userZip + apiKey);
  try {

    // Collect data from fetch() in json format
    const userData = await res.json();
    return userData;

    // If there is an error, console log error details
  } catch (error) {
    console.log("error", error);
  }
}

// Post data function
const postData = async (url = '', data = {}) => {

  // Specify type of request POST and Content-Type
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      'Content-Type': 'application/json',
    },

    // Convert JSON to string so server can handle the data.
    body: JSON.stringify(data),
  });

    // Try to POST data but if there is an error, console.log  error details
    try {
      const newData = await res.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
};

// Update DOM elements with dynamic data from GET/POST requests along with user entered data.
const refreshUI = async () => {
  const req = await fetch('/all');
  try {
    // Try to convert data to json, then update the DOM elements
    const updateData = await req.json()
    document.getElementById('date').innerHTML = updateData.date;
    document.getElementById('temp').innerHTML = updateData.temp;
    document.getElementById('feeling').innerHTML = updateData.feelings;
  }
  // If an error happens, console.log the error details
  catch (error) {
    console.log("error", error);
  }
};