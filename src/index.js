function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = ((date.getHours() + 11) % 12) + 1;
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionsElement = document.querySelector("#conditions");
  let feelElement = document.querySelector("#feel");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  farenheitTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  cityElement.innerHTML = response.data.city;
  conditionsElement.innerHTML = response.data.condition.description;
  feelElement.innerHTML = Math.round(response.data.temperature.feels_like);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.description}`);
}

// Functions as search engine
function search(city) {
  let apiKey = "be8of109b6t500324a628a4f8a83394b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=be8of109b6t500324a628a4f8a83394b&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

// Function that occurs when clicking Submit button
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//Function to convert F to C
function showCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
  // Remove active class from Farenheit link
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//Function to convert C to F
function showFarenheitTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

// Default temp in F
let farenheitTemperature = null;

// Event listener for Submit button
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Event listener for Celsius conversion
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// Event listener for Farenheit conversion
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

// Default page load city
search("Austin");

// let now = new Date();

// let h6 = document.querySelector("h6");

// let days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// let day = days[now.getDay()];

// let hour = now.getHours();
// let minutes = now.getMinutes();

// const ampm = hour >= 12 ? "pm" : "am";

// hour %= 12;
// hour = hour || 12;
// minutes = minutes < 10 ? `0${minutes}` : minutes;

// h6.innerHTML = `${day} ${hour}:${minutes}`;

// let current = document.querySelector(".today");
// current.innerHTML = `${day}`;

// //city search field
// function citySearch(event) {
//   event.preventDefault();
//   let cityInput = document.querySelector("#city-search");

//   let h1 = document.querySelector("h1");
//   h1.innerHTML = `${cityInput.value}`;

//   let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appId=${apiKey}&units=metric`;

//   axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
// }

// let city = document.querySelector("#search-field");
// city.addEventListener("submit", citySearch);

// //show temperature
// function showTemperature(response) {
//   let cityTemp = document.querySelector(".current-degree");
//   cityTemp.innerHTML = Math.round(response.data.main.temp);
//   console.log(response.data.main.temp);
// }
// //temperature conversion

// function units(event) {
//   event.preventDefault();

//   let currentDegree = document.querySelector(".current-degree");
//   currentDegree.innerHTML = Math.round(24 * 1.8 + 32);
// }

// let fahrenheitLink = document.querySelector("#metric-select-f");
// fahrenheitLink.addEventListener("click", units);

// function unitsCelsius(event) {
//   event.preventDefault();

//   let currentDegree = document.querySelector(".current-degree");
//   currentDegree.innerHTML = Math.round(24);
// }

// let celsiusLink = document.querySelector("#metric-select-c");
// celsiusLink.addEventListener("click", unitsCelsius);
