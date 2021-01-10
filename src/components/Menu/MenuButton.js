import { useMenu } from './MenuContext';
import './Menu.scss';
import ham from "../../assets/menu.png";
import cross from "../../assets/cross.png";

export default function MenuButton(){
    const {menuOpened, setMenuOpened} = useMenu();

    const animateMenu = () =>{
        setMenuOpened(!menuOpened)
        if(!menuOpened){
            document.getElementById('container').style = "display:flex; transition:1s;";
            setTimeout(()=>{
                document.getElementById('menu').style = "transition:1s; transform: translate3d(0, 0, 0);";        
                setTimeout(()=>{
                    document.getElementById('option1').style = "transition:1s; transform: translate3d(0, 0, 0);"
                },250)
                setTimeout(()=>{
                    document.getElementById('option2').style = "transition:1s; transform: translate3d(0, 0, 0);"
                },500)
                setTimeout(()=>{
                    document.getElementById('option3').style = "transition:1s; transform: translate3d(0, 0, 0);"
                },750)
            },50)
        }else{
            document.getElementById('option1').style = "transition:1s; transform: translate3d(100vw, 0, 0);"
            document.getElementById('option2').style = "transition:1s; transform: translate3d(100vw, 0, 0);"
            document.getElementById('option3').style = "transition:1s; transform: translate3d(100vw, 0, 0);"
            document.getElementById('menu').style = "transition:1s; transform: translate3d(100vw, 0, 0);";
            document.getElementById('container').style = "display:none";
        }
    }
    return(

        <>
        {!menuOpened ? <button className="hamburger" onClick={()=>{animateMenu()}}><img alt="Hamburger" src={ham} width="25" height="25"/> </button>: <button alt="Croix" className="cross" onClick={()=>{animateMenu()}}><img src={cross} width="25" height="25"/></button>}
        </>

    )
}