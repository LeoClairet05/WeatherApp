import { WEATHER_KEY } from "./config.js";

export async function getWeather(zip, countryCode) {
    let res = await fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zip+","+countryCode+"&appid="+WEATHER_KEY, {
      method: "get",
      headers: {
        Accept: "*/*",
      }
    }).then((res) => res.json())
    .catch((e) => {console.log('Fetch error getWeather: ' + e)});
     
    return res;

} 

export async function getWeatherByCity(city, countryCode) {
    let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+","+countryCode+"&appid="+WEATHER_KEY, {
      method: "get",
      headers: {
        Accept: "*/*",
      }
    }).then((res) => res.json())
    .catch((e) => {console.log('Fetch error getWeather: ' + e)});
     
    return res;

}
