let now = new Date();

let h6 = document.querySelector("h6");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

const ampm = hour >= 12 ? "pm" : "am";

hour %= 12;
hour = hour || 12;
minutes = minutes < 10 ? `0${minutes}` : minutes;

h6.innerHTML = `${day} ${hour}:${minutes}`;

let current = document.querySelector(".today");
current.innerHTML = `${day}`;

//city search field
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appId=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let city = document.querySelector("#search-field");
city.addEventListener("submit", citySearch);

//show temperature
function showTemperature(response) {
  let cityTemp = document.querySelector(".current-degree");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
}
//temperature conversion

function units(event) {
  event.preventDefault();

  let currentDegree = document.querySelector(".current-degree");
  currentDegree.innerHTML = Math.round(24 * 1.8 + 32);
}

let fahrenheitLink = document.querySelector("#metric-select-f");
fahrenheitLink.addEventListener("click", units);

function unitsCelsius(event) {
  event.preventDefault();

  let currentDegree = document.querySelector(".current-degree");
  currentDegree.innerHTML = Math.round(24);
}

let celsiusLink = document.querySelector("#metric-select-c");
celsiusLink.addEventListener("click", unitsCelsius);
