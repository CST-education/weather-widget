import css from "./css/styles.css";
import axios from "axios";
console.log("axios", axios);

axios.defaults.baseURL = `https://api.openweathermap.org/data/2.5/weather`;

const refs = {
  city: document.querySelector(".city"),
  icon: document.querySelector(".icon"),
  temp: document.querySelector(".temp"),
  desc: document.querySelector(".description"),
  humidity: document.querySelector(".humidity"),
  wind: document.querySelector(".wind"),
  weather: document.querySelector(".weather"),
  searchInput: document.querySelector(".search-bar"),
  searchBtn: document.querySelector(".search-btn"),
};

let baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
let apiKey = `b17a2dddb01d7481fea6373f92c2e546`;

class Fetch {
  constructor() {
    this.key = apiKey;
  }
  getDataWithAxios(cityName) {
    let params = `?q=${cityName}&appid=${this.key}`;
    axios
      .get(params)
      .then((d) => d.data)
      .then((result) => this.showWeather(result))
      .catch((error) => console.error(error));
  }
  getFetch(cityName) {
    let url = baseUrl + `?q=${cityName}&appid=${this.key}`;
    fetch(url)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          alert("Bad Request!!!");
          throw new Error("Bad Request!!!");
        } else {
          return response.json();
        }
      })
      .then((data) => this.showWeather(data));
  }
  showWeather(data) {
    refs.weather.classList.remove("loading");
    let icon = data.weather[0].icon;
    let temp = Math.round(data.main.temp - 273.15);
    let hum = data.main.humidity;
    let wind = data.wind.speed;
    let desc = data.weather[0].description;
    let city = data.name;

    refs.temp.textContent = `${temp}°C`;
    refs.humidity.textContent = `Humidity: ${hum}%`;
    refs.wind.textContent = `Wind speed: ${wind}km/h`;
    refs.icon.src = `https://openweathermap.org/img/wn/${icon}.png`;
    refs.icon.alt = desc;
    refs.desc.textContent = desc;
    refs.city.textContent = `Weather in ${city}`;
  }
}

const myWeather = new Fetch();
console.log(myWeather);

refs.searchBtn.addEventListener("click", () => {
  let citySearch = refs.searchInput.value;
  // console.log(citySearch);
  myWeather.getFetch(citySearch);
  //   myWeather.getDataWithAxios(citySearch);
});
