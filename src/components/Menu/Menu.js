import './Menu.scss';
import MenuButton from "./MenuButton";

export default function Menu({children}){

    return(
        <div id="container" className="menuContainer">
            <div id="menu" className="menuBlock">
                <MenuButton/>
                {children}
            </div>
        </div>
    )
}