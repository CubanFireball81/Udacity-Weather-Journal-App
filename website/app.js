/* Global Variables */
// API URL and API key with Unit set to Imperial
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d3ef38a43f231726976dc66febc96243&units=imperial';

// Variable to keep temp data
let temp = ''

// Zipcode Variable
let zipCode = '';

// User input for feelings
let feelings = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(d);

// check DOM is loaded first, before JavaScript functions
document.addEventListener("DOMContentLoaded", () => {
    generateBTN();
});


// Event Listener for click on Generate button
const generateBTN = () => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', weatherData);
}

// Function called by event listener
function weatherData (e) {
    zipCode = document.getElementById('zip').value;
    getAPI(weatherURL, zipCode, apiKey);
}

// Function to get Web API Data
const getAPI = async (weatherURL, zipCode, apiKey) => {
    const res = await fetch(weatherURL + zipCode + apiKey);
    try {
        const data = await res.json();
        temp = data.main.temp;
        console.log(temp);
    } catch(error) {
        console.log('error', error);
    }
}
























/*
//Code to add to functions//
zipCode = document.getElementById('zip').value;
    feelings = document.getElementById('feelings').value;
    // Update HTML element with current date for user
    document.getElementById('date').innerHTML = d;
    //Update HTML element with user's input for their feelings
    document.getElementById('content').innerHTML = feelings;
*/