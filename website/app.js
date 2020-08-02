/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let fullUrl;
const apiKey = '&appid=e5fc7b28f0ec04fe3b3bd0e2924ed3c1';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



const performAction = function(e) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  
  getWeatherByZipCode(baseUrl, zipCode, apiKey)
  .then(function(data) {
    postData('/entry', {
      temperature: data.main.temp,
      date: newDate,
      userResponse: feelings
    });
    
    updateUI();
  });
}
document.getElementById('generate').addEventListener('click', performAction);
const getWeatherByZipCode = async (baseUrl, zip, key) => {
  const res = await fetch(baseUrl+ zip + apiKey);
    try {
      const data = await res.json();
      return data;
    }
    catch(e) {
      console.log('error: ' + e);
    }
};
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  try {
    const newData = await response.json();
    return newData;
  }
  catch(e) {
    console.log('error: ' || e);
  }
};
const updateUI = async () => {
  
  const request = await fetch('/');
  
  try {
    const allData = await request.json();
    // document.getElementById('date').innerHTML = allData[0].date;
    // document.getElementById('temp').innerHTML = allData[0].temperature;
    // document.getElementById('content').innerHTML = allData[0].userResponse;
  }
  catch(e) {
    console.log('error: ' + e.toString());
  }
};