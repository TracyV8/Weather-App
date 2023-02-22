let now = new Date();

// let hours = now.getHours();
// let minutes = now.getMinutes();
let year = now.getFullYear();
let date = now.getDate();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Decmenber",
];
let month = months[now.getMonth()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${date}, of ${month} ${year}`;

function search(city) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  console.log(city);

  let selectedCity = document.querySelector("h1");
  selectedCity.innerHTML = `${city}`;
  search(city);
}

function showTemperature(response) {
  //document.querySelector("h1").innerHTML = response.data.name;
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let maxTemperature = Math.round(response.data.main.temp_max);
  console.log(maxTemperature);
  let minTemperature = Math.round(response.data.main.temp_min);
  console.log(minTemperature);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;

  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `${maxTemperature}`;

  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `${minTemperature}`;
  let description = response.data.weather[0].description;
  console.log(description);
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  console.log(humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity} %`;

  let wind = response.data.wind.speed;
  console.log(wind);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind} `;

  let pressure = response.data.main.pressure;
  console.log(pressure);
  let currentPressure = document.querySelector("#pressure");
  currentPressure.innerHTML = `${pressure} `;
}
function showLocationTemperature(reply) {
  console.log(reply.data);
  let temperature = Math.round(reply.data.main.temp);
  console.log(temperature);
  let maxTemperature = Math.round(reply.data.main.temp_max);
  console.log(maxTemperature);
  let minTemperature = Math.round(reply.data.main.temp_min);
  console.log(minTemperature);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;

  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `${maxTemperature}`;

  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `${minTemperature}`;

  let currentLocation = document.querySelector("h1");
  currentLocation.innerHTML = reply.data.name;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  console.log(lat);
  let long = position.coords.longitude;
  console.log(long);
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocationTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", citySubmit);

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getCurrentLocation);

search("Perth");
