export default function Informations(){
    return(
        <section className="home">
            <p style={{textAlign:"center", width:"80%", alignSelf:"center", color:"white"}}> 
                L'application est utilisable sur mobile comme une PWA (Vous pouvez ajouter à l'écran d'accueil sur votre mobile afin de voir le rendu).
            </p>
            <br></br>
            <p style={{textAlign:"center", width:"80%", alignSelf:"center", color:"white"}}> 
                Le projet devait comporter à l'origine un système de recherche de ville vocal en utilisant une API de speech to text. Mais je n'ai pas eu le temps de mettre en place cette fonctionnalité.
            </p>
            <br></br>
            <p style={{textAlign:"center", width:"80%", alignSelf:"center", color:"white"}}> 
                Utilisation de deux API: 
                Openweathermap (<a target="_blank" href="https://openweathermap.org">Cliquez ici</a>) qui permet d'obtenir les informations météorologiques d'une ville 
                et l'api autocomplete d'HEREAPI (<a target="_blank" href="https://developer.here.com/documentation/geocoder-autocomplete/dev_guide/topics/quick-start-get-suggestions.html">Cliquez ici</a>), qui permet de trouver des prédicitions de villes et informations sur celles-ci en fonction d'une chaine de caractère donnée.
                Ainsi les deux API sont complémentaires et permettent la recherche de n'importe quelle ville avec un système d'autocomplétion et grace aux informations précises renvoyées par l'autocomplétion obtenir la météo dans la ville choisie.
            </p>
        </section>
    )
}