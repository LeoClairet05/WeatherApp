import { WEATHER_KEY } from "./config.js";

export async function autocomplete(zip, countryCode) {
    let res = await fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zip+","+countryCode+"&appid="+WEATHER_KEY, {
      method: "get",
      headers: {
        Accept: "*/*",
      }
    })
     
    return res.json();

} 


