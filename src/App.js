import PokemonProvider from "./context/PokemonContext";
import Pokedex from "./components/Pokedex";
import "./App.css";

function App() {
  return (
    <PokemonProvider>
      <div className="app">
        {/* <SearchBar /> */}
        <Pokedex />
      </div>
    </PokemonProvider>
  );
}

export default App;
