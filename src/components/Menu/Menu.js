import { useEffect } from 'react';
import './Menu.scss';
import MenuButton from "./MenuButton";
import {useMenu} from "./MenuContext";

export default function Menu({children}){

    const {menuOpened} = useMenu();

    return(
        <div id="container" className="menuContainer">
            <div id="menu" className="menuBlock">
                <MenuButton/>
                {children}
            </div>
        </div>
    )
}