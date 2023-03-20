import PokemonProvider from './context/PokemonContext'
import Pokedex from './components/Pokedex'
import SearchBar from './components/SearchBar'
import './App.css';

function App() {
  return (
      <PokemonProvider>
    <div className="app">
      <h1 className="header-title">National Pokédex</h1>
      <SearchBar />
      <Pokedex />
    </div>
      </PokemonProvider>
  );
}

export default App;
