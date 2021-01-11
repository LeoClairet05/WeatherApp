import { useEffect, useState } from 'react';
import { getParam } from '../../services/getParam';
import { getWeather, getWeatherByCity } from '../../services/getWeather';
import Loading from '../../components/Loading/Loading';
import '../../style/style.scss';
import WeatherSwitch from '../../components/Weather/WeatherSwitch';
import AddFavorite from '../../components/Favorites/AddFavorite';

const getCountryISO2 =  require('country-iso-3-to-2');

export default function Weather(){
    const countryCode = getParam("countryCode").length!==2 ? getCountryISO2(getParam("countryCode")): getParam("countryCode");
    const zip = getParam("zip");
    const city = getParam("city");

    const [loaded, setLoaded] = useState(false);
    
    const [temp, setTemp] = useState(null);
    const [tempFeels, setTempFeels] = useState(null);
    const [wind, setWind] = useState(null);
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [idWeather, setIdWeather] = useState("");

    const _getWeather = async() =>{
        try{
            let res = await getWeather(zip, countryCode);
            if(res.cod !== undefined && res.cod == 404){
                res = await getWeatherByCity(city, countryCode);
                if(res.cod !== undefined && res.cod == 404){
                    document.getElementById('weatherContainer').innerHTML = "<h1>Ville introuvable</h1>";
                    setLoaded(true);
                    return;
                }
            }
                setTemp(Math.round(res.main.temp-273.15));
                setTempFeels(Math.round(res.main.feels_like-273.15));
                setWind(Math.ceil(res.wind.speed*3.6));
                setIdWeather(res.weather[0].id);
                let sunriseObj = new Date(res.sys.sunrise * 1000 + 1*60*60*1000).toUTCString();
                let sunriseHour = sunriseObj.slice(-12, -7);
                let sunsetObj = new Date(res.sys.sunset * 1000 + 1*60*60*1000).toUTCString();
                let sunsetHour = sunsetObj.slice(-12, -7);
                setSunrise(sunriseHour);
                setSunset(sunsetHour);
                setLoaded(true);
        }catch(err){
            console.log('getWeather error: ' + err);
        }
    }
    
    useEffect(()=>{
        _getWeather();
    },[])

    return(
        <>
            {!loaded ? <Loading />:<></>}
            <section id="weatherContainer">
                <h1>{decodeURI(city)}</h1>
                <h2>{temp}°</h2>
                <h6>Ressenti {tempFeels}°</h6>

                {loaded ? <WeatherSwitch idWeather={idWeather}/>:<></>}

                <div className="row"><hr style={{marginTop:"2em", marginBottom:"2em"}} /></div>

                <svg style={{marginBottom:"0.5em"}} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.1522 4.56522C24.376 4.56522 21.3043 7.63761 21.3043 11.413C21.3043 11.833 21.6445 12.1739 22.0652 12.1739C22.486 12.1739 22.8261 11.833 22.8261 11.413C22.8261 8.47609 25.216 6.08696 28.1522 6.08696C31.0884 6.08696 33.4783 8.47609 33.4783 11.413C33.4783 14.35 31.0884 16.7391 28.1522 16.7391H0.76087C0.34087 16.7391 0 17.08 0 17.5C0 17.92 0.34087 18.2609 0.76087 18.2609H28.1522C31.9284 18.2609 35 15.1885 35 11.413C35 7.63761 31.9284 4.56522 28.1522 4.56522Z" fill="white"/>
                    <path d="M13.6957 3.04349C10.7587 3.04349 8.36956 5.43262 8.36956 8.36957C8.36956 8.78957 8.71043 9.13044 9.13043 9.13044C9.55043 9.13044 9.8913 8.78957 9.8913 8.36957C9.8913 6.27186 11.5979 4.56523 13.6957 4.56523C15.7934 4.56523 17.5 6.27186 17.5 8.36957C17.5 10.4673 15.7934 12.1739 13.6957 12.1739H0.76087C0.34087 12.1739 0 12.5148 0 12.9348C0 13.3548 0.34087 13.6957 0.76087 13.6957H13.6957C16.6326 13.6957 19.0217 11.3065 19.0217 8.36957C19.0217 5.43262 16.6326 3.04349 13.6957 3.04349Z" fill="white"/>
                    <path d="M26.6304 21.3044H0.76087C0.34087 21.3044 0 21.6452 0 22.0652C0 22.4852 0.34087 22.8261 0.76087 22.8261H26.6304C28.7281 22.8261 30.4348 24.5327 30.4348 26.6304C30.4348 28.7281 28.7281 30.4348 26.6304 30.4348C24.5327 30.4348 22.8261 28.7281 22.8261 26.6304C22.8261 26.2104 22.486 25.8696 22.0652 25.8696C21.6445 25.8696 21.3043 26.2104 21.3043 26.6304C21.3043 29.5674 23.6942 31.9565 26.6304 31.9565C29.5666 31.9565 31.9565 29.5674 31.9565 26.6304C31.9565 23.6935 29.5666 21.3044 26.6304 21.3044Z" fill="white"/>
                </svg>

                <p>Vents de {wind}km/h</p>

                <div className="row" style={{justifyContent:"space-between", width:"80%", marginTop:"1em"}}>
                    <div className="ltlContainer">
                        <svg style={{marginBottom:"0.5em"}} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            
                                <path d="M24.0857 22.415V26.1466C24.0857 26.6046 24.457 26.9759 24.915 26.9759C25.3729 26.9759 25.7442 26.6046 25.7442 26.1466V22.415C25.7442 21.957 25.3729 21.5857 24.915 21.5857C24.457 21.5857 24.0857 21.957 24.0857 22.415Z" fill="white"/>
                                <path d="M35.0605 31.044C35.2803 31.0444 35.4917 30.957 35.6468 30.8011L38.2856 28.1623C38.6091 27.8387 38.6091 27.3136 38.2856 26.9896C37.9616 26.6657 37.4365 26.6657 37.1125 26.9896L34.4741 29.6284C34.2369 29.8653 34.166 30.222 34.2944 30.5322C34.4227 30.842 34.7252 31.044 35.0605 31.044Z" fill="white"/>
                                <path d="M42.9512 37.3537C40.527 37.3537 39.3034 37.9198 38.1202 38.4672C37.0731 38.9511 36.0823 39.4086 34.1027 39.426C33.6845 34.8226 29.7702 31.1222 25.0186 31.1222C20.2674 31.1222 16.3531 34.8226 15.9345 39.426C13.9548 39.4086 12.964 38.9511 11.9169 38.4672C10.7338 37.9198 9.51016 37.3537 7.08597 37.3537C6.62802 37.3537 6.25671 37.725 6.25671 38.183C6.25671 38.6413 6.62802 39.0122 7.08597 39.0122C9.14493 39.0122 10.1536 39.4787 11.2209 39.9723C12.4045 40.5197 13.6281 41.0854 16.0519 41.0854C18.4761 41.0854 19.6997 40.5197 20.8833 39.9723C21.9506 39.4787 22.9592 39.0122 25.0182 39.0122C27.0771 39.0122 28.0858 39.4787 29.1535 39.9723C30.3371 40.5197 31.5607 41.0854 33.9845 41.0854C36.4087 41.0854 37.6327 40.5197 38.8159 39.9723C39.8836 39.4787 40.8923 39.0122 42.9512 39.0122C43.4092 39.0122 43.7805 38.6413 43.7805 38.183C43.7805 37.725 43.4092 37.3537 42.9512 37.3537ZM25.0186 37.3537C22.5944 37.3537 21.3708 37.9198 20.1876 38.4672C19.4317 38.8167 18.7052 39.1523 17.6144 39.3183C18.0809 35.5839 21.2554 32.7807 25.0194 32.7807C28.783 32.7807 31.9575 35.5839 32.424 39.3183C31.3327 39.1527 30.6059 38.8167 29.85 38.4668C28.666 37.9198 27.4424 37.3537 25.0186 37.3537Z" fill="white"/>
                                <path d="M14.3906 30.8007C14.7149 31.1213 15.2373 31.1197 15.56 30.797C15.8823 30.4747 15.8839 29.9524 15.5636 29.628L12.9248 26.9893C12.6009 26.6653 12.0762 26.6653 11.7522 26.9893C11.4283 27.3132 11.4283 27.8383 11.7522 28.1623L14.3906 30.8007Z" fill="white"/>
                                <path d="M42.9512 41.8109C40.527 41.8109 39.3034 42.377 38.1202 42.9244C37.0525 43.418 36.0439 43.8841 33.9845 43.8841C31.9255 43.8841 30.9169 43.4176 29.8496 42.9244C28.666 42.377 27.4424 41.8109 25.0186 41.8109C22.5952 41.8109 21.3708 42.377 20.1876 42.9244C19.1199 43.418 18.1116 43.8841 16.0523 43.8841C13.9933 43.8841 12.9851 43.4176 11.9173 42.9244C10.7338 42.377 9.51016 41.8109 7.08597 41.8109C6.62802 41.8109 6.25671 42.1822 6.25671 42.6402C6.25671 43.0986 6.62802 43.4694 7.08597 43.4694C9.14493 43.4694 10.1536 43.9359 11.2209 44.4295C12.4045 44.9769 13.6281 45.5426 16.0519 45.5426C18.4761 45.5426 19.6997 44.9769 20.8833 44.4295C21.9506 43.9359 22.9592 43.4694 25.0182 43.4694C27.0771 43.4694 28.0858 43.9359 29.1535 44.4295C30.3371 44.9769 31.5607 45.5426 33.9845 45.5426C36.4087 45.5426 37.6327 44.9769 38.8159 44.4295C39.8836 43.9359 40.8923 43.4694 42.9512 43.4694C43.4092 43.4694 43.7805 43.0986 43.7805 42.6402C43.7805 42.1822 43.4092 41.8109 42.9512 41.8109Z" fill="white"/>
                                <path d="M42.9512 46.2682C40.527 46.2682 39.3034 46.8343 38.1202 47.3817C37.0525 47.8753 36.0439 48.3413 33.9845 48.3413C31.9255 48.3413 30.9169 47.8749 29.8496 47.3817C28.666 46.8343 27.4424 46.2682 25.0186 46.2682C22.5952 46.2682 21.3708 46.8343 20.1876 47.3817C19.1199 47.8753 18.1116 48.3413 16.0523 48.3413C13.9933 48.3413 12.9851 47.8749 11.9173 47.3817C10.7338 46.8343 9.51016 46.2682 7.08597 46.2682C6.62802 46.2682 6.25671 46.6395 6.25671 47.0974C6.25671 47.5558 6.62802 47.9267 7.08597 47.9267C9.14493 47.9267 10.1536 48.3931 11.2209 48.8867C12.4045 49.4342 13.6281 49.9998 16.0519 49.9998C18.4761 49.9998 19.6997 49.4342 20.8833 48.8867C21.9506 48.3931 22.9592 47.9267 25.0182 47.9267C27.0771 47.9267 28.0858 48.3931 29.1535 48.8867C30.3371 49.4342 31.5607 49.9998 33.9845 49.9998C36.4087 49.9998 37.6327 49.4342 38.8159 48.8867C39.8836 48.3931 40.8923 47.9267 42.9512 47.9267C43.4092 47.9267 43.7805 47.5558 43.7805 47.0974C43.7805 46.6395 43.4092 46.2682 42.9512 46.2682Z" fill="white"/>
                                <path d="M20.0962 7.07376H22.7382V15.8846C22.7382 16.3425 23.1095 16.7138 23.5675 16.7138H26.4699C26.9278 16.7138 27.2991 16.3425 27.2991 15.8846V7.07376H29.9416C30.2699 7.07376 30.5671 6.88022 30.7 6.57977C30.8328 6.27974 30.7761 5.92949 30.555 5.68654L25.6325 0.271694C25.4754 0.0983929 25.2523 0 25.0187 0C24.785 0 24.5623 0.0983929 24.4052 0.271694L19.4823 5.68654C19.2617 5.92949 19.205 6.27974 19.3378 6.57977C19.4706 6.88022 19.7678 7.07376 20.0962 7.07376ZM25.0187 2.0622L28.0668 5.41526H26.4699C26.0119 5.41526 25.6406 5.78656 25.6406 6.24451V15.0553H24.3967V6.24451C24.3967 5.78656 24.0254 5.41526 23.5675 5.41526H21.9705L25.0187 2.0622Z" fill="white"/>
                            
                        </svg>

                        <p>Levé du soleil</p>
                        <p>{sunrise}</p>
                    </div>
                    <div className="ltlContainer">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0857 22.415V26.1466C24.0857 26.6046 24.457 26.9759 24.915 26.9759C25.3729 26.9759 25.7442 26.6046 25.7442 26.1466V22.415C25.7442 21.957 25.3729 21.5857 24.915 21.5857C24.457 21.5857 24.0857 21.957 24.0857 22.415Z" fill="white"/>
                            <path d="M35.0605 31.044C35.2803 31.0444 35.4917 30.957 35.6468 30.8011L38.2856 28.1623C38.6091 27.8387 38.6091 27.3136 38.2856 26.9896C37.9616 26.6657 37.4365 26.6657 37.1125 26.9896L34.4741 29.6284C34.2369 29.8653 34.166 30.222 34.2944 30.5322C34.4227 30.842 34.7252 31.044 35.0605 31.044Z" fill="white"/>
                            <path d="M42.9512 37.3537C40.527 37.3537 39.3034 37.9198 38.1202 38.4672C37.0731 38.9511 36.0823 39.4086 34.1027 39.426C33.6845 34.8226 29.7702 31.1222 25.0186 31.1222C20.2674 31.1222 16.3531 34.8226 15.9345 39.426C13.9548 39.4086 12.964 38.9511 11.9169 38.4672C10.7338 37.9198 9.51016 37.3537 7.08597 37.3537C6.62802 37.3537 6.25671 37.725 6.25671 38.183C6.25671 38.6413 6.62802 39.0122 7.08597 39.0122C9.14493 39.0122 10.1536 39.4787 11.2209 39.9723C12.4045 40.5197 13.6281 41.0854 16.0519 41.0854C18.4761 41.0854 19.6997 40.5197 20.8833 39.9723C21.9506 39.4787 22.9592 39.0122 25.0182 39.0122C27.0771 39.0122 28.0858 39.4787 29.1535 39.9723C30.3371 40.5197 31.5607 41.0854 33.9845 41.0854C36.4087 41.0854 37.6327 40.5197 38.8159 39.9723C39.8836 39.4787 40.8923 39.0122 42.9512 39.0122C43.4092 39.0122 43.7805 38.6413 43.7805 38.183C43.7805 37.725 43.4092 37.3537 42.9512 37.3537ZM25.0186 37.3537C22.5944 37.3537 21.3708 37.9198 20.1876 38.4672C19.4317 38.8167 18.7052 39.1523 17.6144 39.3183C18.0809 35.5839 21.2554 32.7807 25.0194 32.7807C28.783 32.7807 31.9575 35.5839 32.424 39.3183C31.3327 39.1527 30.6059 38.8167 29.85 38.4668C28.666 37.9198 27.4424 37.3537 25.0186 37.3537Z" fill="white"/>
                            <path d="M14.3906 30.8007C14.7149 31.1213 15.2373 31.1197 15.56 30.797C15.8823 30.4747 15.8839 29.9524 15.5636 29.628L12.9248 26.9893C12.6009 26.6653 12.0762 26.6653 11.7522 26.9893C11.4283 27.3132 11.4283 27.8383 11.7522 28.1623L14.3906 30.8007Z" fill="white"/>
                            <path d="M42.9512 41.8109C40.527 41.8109 39.3034 42.377 38.1202 42.9244C37.0525 43.418 36.0439 43.8841 33.9845 43.8841C31.9255 43.8841 30.9169 43.4176 29.8496 42.9244C28.666 42.377 27.4424 41.8109 25.0186 41.8109C22.5952 41.8109 21.3708 42.377 20.1876 42.9244C19.1199 43.418 18.1116 43.8841 16.0523 43.8841C13.9933 43.8841 12.9851 43.4176 11.9173 42.9244C10.7338 42.377 9.51016 41.8109 7.08597 41.8109C6.62802 41.8109 6.25671 42.1822 6.25671 42.6402C6.25671 43.0986 6.62802 43.4694 7.08597 43.4694C9.14493 43.4694 10.1536 43.9359 11.2209 44.4295C12.4045 44.9769 13.6281 45.5426 16.0519 45.5426C18.4761 45.5426 19.6997 44.9769 20.8833 44.4295C21.9506 43.9359 22.9592 43.4694 25.0182 43.4694C27.0771 43.4694 28.0858 43.9359 29.1535 44.4295C30.3371 44.9769 31.5607 45.5426 33.9845 45.5426C36.4087 45.5426 37.6327 44.9769 38.8159 44.4295C39.8836 43.9359 40.8923 43.4694 42.9512 43.4694C43.4092 43.4694 43.7805 43.0986 43.7805 42.6402C43.7805 42.1822 43.4092 41.8109 42.9512 41.8109Z" fill="white"/>
                            <path d="M42.9512 46.2682C40.527 46.2682 39.3034 46.8343 38.1202 47.3817C37.0525 47.8753 36.0439 48.3413 33.9845 48.3413C31.9255 48.3413 30.9169 47.8749 29.8496 47.3817C28.666 46.8343 27.4424 46.2682 25.0186 46.2682C22.5952 46.2682 21.3708 46.8343 20.1876 47.3817C19.1199 47.8753 18.1116 48.3413 16.0523 48.3413C13.9933 48.3413 12.9851 47.8749 11.9173 47.3817C10.7338 46.8343 9.51016 46.2682 7.08597 46.2682C6.62802 46.2682 6.25671 46.6395 6.25671 47.0974C6.25671 47.5558 6.62802 47.9267 7.08597 47.9267C9.14493 47.9267 10.1536 48.3931 11.2209 48.8867C12.4045 49.4342 13.6281 49.9998 16.0519 49.9998C18.4761 49.9998 19.6997 49.4342 20.8833 48.8867C21.9506 48.3931 22.9592 47.9267 25.0182 47.9267C27.0771 47.9267 28.0858 48.3931 29.1535 48.8867C30.3371 49.4342 31.5607 49.9998 33.9845 49.9998C36.4087 49.9998 37.6327 49.4342 38.8159 48.8867C39.8836 48.3931 40.8923 47.9267 42.9512 47.9267C43.4092 47.9267 43.7805 47.5558 43.7805 47.0974C43.7805 46.6395 43.4092 46.2682 42.9512 46.2682Z" fill="white"/>
                            <path d="M29.9414 9.64007H27.2994L27.2994 0.82925C27.2994 0.371298 26.9281 -3.8147e-06 26.4701 -3.8147e-06H23.5677C23.1098 -3.8147e-06 22.7385 0.371298 22.7385 0.82925V9.64007H20.096C19.7677 9.64007 19.4705 9.83362 19.3376 10.1341C19.2048 10.4341 19.2615 10.7843 19.4826 11.0273L24.4051 16.4421C24.5622 16.6154 24.7853 16.7138 25.0189 16.7138C25.2526 16.7138 25.4753 16.6154 25.6324 16.4421L30.5553 11.0273C30.7759 10.7843 30.8326 10.4341 30.6998 10.1341C30.567 9.83362 30.2698 9.64007 29.9414 9.64007ZM25.0189 14.6516L21.9708 11.2986L23.5677 11.2986C24.0257 11.2986 24.397 10.9273 24.397 10.4693L24.397 1.6585L25.6409 1.6585L25.6409 10.4693C25.6409 10.9273 26.0122 11.2986 26.4701 11.2986H28.0671L25.0189 14.6516Z" fill="white"/>
                        </svg>
                        <p>Couché du soleil</p>
                        <p>{sunset}</p>
                    </div>

                </div>
                <AddFavorite city={city} countryCode={countryCode} />
            </section>
        </>
    )
}