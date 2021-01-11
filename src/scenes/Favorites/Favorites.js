import './Favorites.scss';

export default function Favorites(){
    const favorites = localStorage.getItem('favorites');
    return(
        <>
            <section id="weatherContainer">

                {(favorites !== undefined && favorites !== null)&& (JSON.parse(favorites).length !== 0)? JSON.parse(favorites).map((favorite)=>(<a href={"/weather?city=" + favorite.city + "&countryCode=" + favorite.countryCode}>{decodeURI(favorite.city)}</a>)) : "Aucun favoris"}
            
            </section>
        </>
    )
}