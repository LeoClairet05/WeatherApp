import Route from './components/Router/Route';
import HomePage from './scenes/Homepage/Homepage';

function App() {
  return (
    <>
      <Route path="/" Component={HomePage} />
    </>
  );
}

export default App;
