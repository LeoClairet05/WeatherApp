import Route from './components/Router/Route';
import HomePage from './scenes/Homepage/Homepage';
import SearchBar from './components/SearchBar/SearchBar';
import Menu from './components/Menu/Menu';
import MenuContent from './components/Menu/MenuContent';
import MenuButton from "./components/Menu/MenuButton";
import { useState } from 'react';
import { MenuContext } from "./components/Menu/MenuContext";

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

    </MenuContext.Provider>
    </>
  );
}

export default App;
