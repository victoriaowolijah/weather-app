/* Global Variables */
// Personal API Key for openWeatherMap API
const apiKey = "";
const generate = document.getElementById('generate');
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const showFeelings = document.getElementById('show-feelings');
const content = document.getElementById('content');
const title = document.getElementsByClassName('title');
const temp = document.getElementById('temp');
const dateNow = document.getElementById('dateNow');
const showError = document.getElementById('show-error');
const submitBtn = document.getElementById('submit-btn');
const report = document.getElementById('report');

/* Create a new date instance dynamically with JS */
// let date = d.toDateString();
let date = new Date();
let newDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
const baseUrl = (key, zip) => `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`;

// GET request function
const getWeatherData = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json()
        submitBtn.innerText = "Generate"
        return data
    } catch (error) {
        showError.innerHTML = JSON.stringify(error);
        submitBtn.innerText = "Generate"
    }
}

// POST Weather Data to the backend
const postWeatherData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json()
        return newData
    } catch (error) {
        console.log("error", error);
    }

}

//Update the UI with Weather Data
const updateUIWithWeather = async (data) => {
    temp.innerHTML = `${data.temp}&deg${'C'}`;
    dateNow.innerHTML = data.date
    showFeelings.innerHTML = data.feelings
    report.style.display = 'block';
}


function handleSubmit(e) {
    e.preventDefault();
    submitBtn.innerText = "Generating...";
    //make a POST to the backend API
    const res = getWeatherData(baseUrl(apiKey, zipCode.value))
    res.then(data => {
        if (data.cod == 200) {
            const getApi = {
                temp: data.main.temp,
                date: newDate,
                feelings: feelings.value
            }
            postWeatherData('/all', getApi)
            updateUIWithWeather(getApi);
            console.log(getApi);
        }
    })

}

// Listen for submit
generate.addEventListener('submit', handleSubmit);
