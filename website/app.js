/* Global Variables */
// API URL and API key with Unit set to Imperial
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'd3ef38a43f231726976dc66febc96243&units=imperial';

// Local Server URL to send POST requests to
const serverURL = 'http://localhost:8000';

// URL to POST to server-side
const postURL = `${serverURL}/add`;

// Default options for making a request
let options = {
    method: "",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    body: "",
};

// Variable to keep temp data
let temp = document.getElementById("temp");

// User input for feelings
let feelings = document.getElementById("content").value;

// Formatted Date
let date = document.getElementById("date");

// check DOM is loaded first, before JavaScript functions
document.addEventListener("DOMContentLoaded", () => {
    generateBTN();
});

// Event Listener for click on Generate button
const generateBTN = () => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', getWeather);
}

// Function called by event listener
const getWeather = async () => {

    // Get the zipcode entered by the user
    let zipCode = document.getElementById("zip").value;

  // Get the feelings content entered by the user
    feelings = document.getElementById("feelings").value;

  // Dynamic URL to get data from OpenWeather API
    const dynamicURL = `${weatherURL}?zip=${zipCode}&appid=${apiKey}`;

  // Get weather data
    const weatherData = await postData(dynamicURL);

    // If valid data, store temp only in temp variable
    if (weatherData) {
    temp = weatherData['main'].temp;
    }

  // Store formatted current date
    let d = new Date();
    date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

  // Post weather data to the server
    postWeatherData(temp, date, feelings);

  // Update the UI
    await updateUI();
};

// Build new JS object to post to server
const postWeatherData = async (temp, date, feelings) => {
  // Making new object with data to be sent to the server
    const data = {
    temp: temp,
    date: date,
    feelings: feelings,
    };

    // Method of POST and Stringifying the data so the server can use it
    options["method"] = "POST";
    options["body"] = JSON.stringify(data);

    // Post data to server using the options specified
    await postData(postURL, options);
};

// Update DOM elements with user and weather data
const updateUI = async () => {
    try {
    const data = await getProjectData();

    if (data) {
        date.innerHTML = `${data.date}`;
        temp.innerHTML = `${data.temperature}`;
        feelings.innerHTML = `${data.userResponse}`;
    }
    } catch (error) {
        console.log("Unable to update the page: ", error);
    }
};

// Access projectData object from server
const getProjectData = async () => {

    // Options for GET and to remove the Body section from GET request
    options["method"] = "GET";
    delete options["body"];

    // Get server-side data
    const serverData = await postData(postURL, options);

    // return the data
    return serverData;
};


// Fetch request 
const postData = async (url = "", options = {}) => {
    const response = await fetch(url, options);
    try {
        const newData = await response.json();
    return newData;
    } catch (error) {
    console.log("Something went wrong!", error);
    }
};