import Route from './components/Router/Route';
import HomePage from './scenes/Homepage/Homepage';

function App() {
  return (
    <>
      <header>

        <div className="searchBox">
          {/* <button className="openBar">
            <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9" stroke="white" stroke-width="2"/>
              <rect x="15" y="17.4142" width="2" height="14" rx="1" transform="rotate(-45 15 17.4142)" fill="white"/>
            </svg>
          </button> */}
          <div className="search-box">
            <input type="text" placeholder="Rechercher une ville"/>
            <span></span>
          </div>
        </div>
        

      </header>
      <Route path="/" Component={HomePage} />
    </>
  );
}

export default App;
