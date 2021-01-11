import Route from './components/Router/Route';
import HomePage from './scenes/Homepage/Homepage';
import SearchBar from './components/SearchBar/SearchBar';
import Menu from './components/Menu/Menu';
import MenuContent from './components/Menu/MenuContent';
import MenuButton from "./components/Menu/MenuButton";
import { useState } from 'react';
import { MenuContext } from "./components/Menu/MenuContext";
import Weather from "./scenes/Weather/Weather";
import Favorites from "./scenes/Favorites/Favorites";
import Informations from './scenes/Infos/Informations';

function App() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
    <MenuContext.Provider value={{menuOpened, setMenuOpened}}>
      <Menu handleState={setMenuOpened} opened={menuOpened}>
        <MenuContent />
      </Menu>

      <header>
        <SearchBar />
        <MenuButton handleState={setMenuOpened} opened={menuOpened}/>
      </header>

      <Route path="/" Component={HomePage} />
      <Route path="/weather" Component={Weather} />
      <Route path="/favorites" Component={Favorites}/>
      <Route path="/infos" Component={Informations}/>
    </MenuContext.Provider>
    </>
  );
}

export default App;
