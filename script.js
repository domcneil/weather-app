/*function currentLocationWeather(request) {
  let displayName = document.querySelector("#display-city");
  displayName.innerHTML = request.data.name;
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = Math.round(request.data.main.temp);
  // Display description of weather with capitalized first letter
  let weatherDescription = request.data.weather[0].description;
  let firstLetterDescr = weatherDescription.charAt(0);
  let firstLetterCapitalize = firstLetterDescr.toUpperCase();
  let remainingString = weatherDescription.slice(1);
  let weatherDescriptionDisplay = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionDisplay.innerHTML = firstLetterCapitalize + remainingString;
  //Display windspeed + template literal to include MPH
  let wind = document.querySelector("#wind");
  wind.innerHTML = ` ${Math.round(request.data.wind.speed)} mph`;
  //Display humidity + template literal to include percent sign
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${request.data.main.humidity} %`;}*/

//Function to display various information collected from API call such as name of city, description of weather, temperature, wind speed, and humidity
function currentWeather(weather) {
  console.log(weather.data);
  //Display name of city called through API
  let displayName = document.querySelector("#display-city");
  displayName.innerHTML = weather.data.name;
  // Display temperature of city input by user during API call
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = Math.round(weather.data.main.temp);
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

/*function changeFarenheitTemp() {
  let farenheitTemp = document.querySelector("#temperature");
  farenheitTemp.innerHTML = "65";
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", changeFarenheitTemp);

function changeCelsiusTemp() {
  let celsiusTemp = document.querySelector("#temperature");
  celsiusTemp.innerHTML = "18";
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeCelsiusTemp);*/

inputCity("New York");
