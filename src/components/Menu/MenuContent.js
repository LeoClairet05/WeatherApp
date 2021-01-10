import './Menu.scss';

export default function MenuContent(){
    return(
        <>
            <h1>Menu</h1>
            <div className="row"><hr/></div>
            <ul>
                <li id="option1"><a href="/">Accueil</a></li>
                <li id="option2"><a href="/">Favoris</a></li>
                <li id="option3"><a href="/">Informations</a></li>
            </ul>
        </>
        
    )
}