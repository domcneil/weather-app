//Function to get longitude and latitude of input city make API call and then call function to display forecast data
function getForecast(coords) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let lat = coords.lat;
  let lon = coords.lon;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

//Function to display various information collected from API call such as name of city, description of weather, temperature, wind speed, and humidity
function currentWeather(weather) {
  //Display name of city called through API
  let displayName = document.querySelector("#display-city");
  displayName.innerHTML = weather.data.name;
  // Display temperature of city input by user during API call
  currentFahrenheitTemp = weather.data.main.temp;
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = Math.round(currentFahrenheitTemp);
  // Display description of weather with capitalized first letter
  let weatherDescription = weather.data.weather[0].description;
  let firstLetterDescr = weatherDescription.charAt(0);
  let firstLetterCapitalize = firstLetterDescr.toUpperCase();
  let remainingString = weatherDescription.slice(1);
  let weatherDescriptionDisplay = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionDisplay.innerHTML = firstLetterCapitalize + remainingString;
  //Display windspeed + template literal to include MPH
  let wind = document.querySelector("#wind");
  wind.innerHTML = ` ${Math.round(weather.data.wind.speed)} mph`;
  //Display humidity + template literal to include percent sign
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${weather.data.main.humidity}%`;
  let icon = document.querySelector("#present-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`
  );

  getForecast(weather.data.coord);
}
//Function to take city input value and execute weather API call. Then currentWeather function runs
function inputCity(cityName) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
}
/*Function handles the submission of the city by the user, takes the value and runs the above function to call the API and receive weather information. Separating functions in this way allows city search to run on default and populate information so app is not blank*/
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let cityName = cityInput.value;
  inputCity(cityName);
}

// Once user submits city, handleSubmit function above runs to extract value input by user and run API call
let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("click", handleSubmit);

//Function findPosition to find user current location to use for geolocation API call
function findPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  axios.get(url).then(currentWeather);
}
// Trigger function to find current location
function runGeoAPI(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

//Code to create event listener for current location button to execute geolocation API
let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", runGeoAPI);

function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[date.getDay()];

  let hourTime = date.getHours();
  let minuteTime = date.getMinutes();

  if (hourTime < 10) {
    hourTime = `0${hourTime}`;
  }

  if (minuteTime < 10) {
    minuteTime = `0${minuteTime}`;
  }
  return `${day} ${hourTime}:${minuteTime}`;
}

let currentTime = new Date();
let timeAndDate = document.querySelector("#date");
timeAndDate.innerHTML = formatDate(currentTime);

/* let timeAndDate = document.querySelector("#date");
  timeAndDate.innerHTML = formatDate(weather.data.dt * 1000);*/

function showFahrenheitTemp() {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = document.querySelector("#temperature");
  fahrenheitTemp.innerHTML = Math.round(currentFahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#farenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp() {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = document.querySelector("#temperature");
  celsiusConversion = ((currentFahrenheitTemp - 32) * 5) / 9;
  celsiusTemp.innerHTML = Math.round(celsiusConversion);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let currentFahrenheitTemp = null;

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let futureDay = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = futureDay[date.getDay()];
  return day;
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    let maxTemp = Math.round(forecastDay.temp.max);
    let minTemp = Math.round(forecastDay.temp.min);
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
                <div class="future-date">${formatForecastDate(
                  forecastDay.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" width="40"/>
                <div class="future-temp">${maxTemp}° <span class="min-temp"> ${minTemp}°</span></div>
              </div>
           `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

inputCity("New York");
