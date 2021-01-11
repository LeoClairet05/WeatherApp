import { autocomplete } from '../../services/autocomplete';

export default function SearchBar(){

    const _autocomplete = async(city) =>{
        try{
            let res = await autocomplete(city);
            document.getElementById('cities').innerHTML = "";

            if(res.suggestions === undefined){
                return;
            }
            
            for(let i=0; i<res.suggestions.length; i++){
                document.getElementById('cities').innerHTML += "<a href='/weather?city="+res.suggestions[i].address.city+"&zip="+res.suggestions[i].address.postalCode+"&countryCode="+res.suggestions[i].countryCode+"'>- "+res.suggestions[i].address.city+", "+res.suggestions[i].address.state+", "+res.suggestions[i].address.country+"</a>";
            }
            
        }catch(err){
            console.log('Autocomplete error : ' + err);
        }
    }

    const clearInput = () =>{
        document.getElementById('citySearch').value = "";
        document.getElementById('cities').innerHTML = "";
    }

    return(
        <div className="searchBox">
            <div className="search-box" id ="citySearchBox">
                <input id="citySearch" type="text" placeholder="Rechercher une ville" onInput={(e)=>_autocomplete(e.target.value)}/>
                <span onClick={()=>{clearInput()}}></span>
            </div>
            <div id="cities"></div>
        </div>
    )
}