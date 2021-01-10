import { API_KEY } from "./config.js";

export async function autocomplete(city) {
    let res = await fetch("https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey="+API_KEY+"&resultType=city&maxresults=3&query=" + city, {
      method: "get",
      headers: {
        Accept: "*/*",
      }
    })
     
    return res.json();

} 


