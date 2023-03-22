import { useEffect, useContext} from "react";
import { PokemonContext } from ".././context/PokemonContext";
import { BarLoader } from "react-spinners";
import Pokemon from "./Pokemon";


const override = { display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Pokedex() {
  const pokedexContext = useContext(PokemonContext);
  const {
    pokemon,
    setPokemon,
    isLoading,
    setIsLoading,
    next,
    setNext,
    previous,
    setPrevious,
    pageCount,
    setPageCount,
  } = pokedexContext;

  const retrievePokemonName = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
    );
    const data = await response.json();
    setNext(data.next);
    setPrevious(data.previous);

    const pokemonDataPromises = data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    const formattedPokemonData = pokemonData.map((data) => {
      return {
        nameAndURL: {
          name: data.name,
          url: data.url,
        },
        previous: data.previous,
        next: data.next,
        sprite: data.sprites.front_default,
        id: data.id,
        types: data.types,
      };
    });

    setPokemon(formattedPokemonData);
    setIsLoading(false);
    setPageCount(0)
  };

  //Updates the state data values by calling the API.
  useEffect(() => {
    retrievePokemonName();
    //retrieve151PokemonName()
  }, [setIsLoading, setNext, setPokemon, setPrevious]);

  //Updates the screen by calling the API on click of the next button, and stores the next 20 Pokemon in the state variables.
  const updateNext = async () => {
    setIsLoading(true);
    const response = await fetch(`${next}`);
    const data = await response.json();
    setNext(data.next);
    setPrevious(data.previous);

    const pokemonDataPromises = data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    const formattedPokemonData = pokemonData.map((data) => {
      return {
        nameAndURL: {
          name: data.name,
          url: data.url,
        },
        previous: data.previous,
        next: data.next,
        sprite: data.sprites.front_default,
        id: data.id,
        types: data.types,
      };
    });

    setPokemon(formattedPokemonData);
    setIsLoading(false);
    setPageCount(prev => prev + 1)
  };

  //Updates the screen by calling the API on click of the previous button, and stores the previous 20 Pokemon in the state variables.
  const updatePrevious = async () => {
    setIsLoading(true);
    const response = await fetch(`${previous}`);
    const data = await response.json();
    setPrevious(data.previous);
    setNext(data.next);

    const pokemonDataPromises = data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    const formattedPokemonData = pokemonData.map((data) => {
      return {
        nameAndURL: {
          name: data.name,
          url: data.url,
        },
        previous: data.previous,
        next: data.next,
        sprite: data.sprites.front_default,
        id: data.id,
        types: data.types,
      };
    });

    setPokemon(formattedPokemonData);
    setIsLoading(false);
    setPageCount(prev => prev - 1)
  };

  return (
    <>
      <h1 onClick={retrievePokemonName} className="header-title">
        National Pokédex
      </h1>
      <div className="search-bar-flex">
        <input
          type="text"
          placeholder="Search Pokemon..."
          className="search-bar"
          onChange={(e) =>
            e.target.value.length > 0
              ? setPokemon((prev) =>
                  prev.filter((pokemonData) =>
                    pokemonData.nameAndURL.name.includes(e.target.value.toLowerCase())
                  )
                )
              : retrievePokemonName()
          }
        />
      </div>
      <div className="app">
        <div className="pokedex-container">
      {/* <div className="pokedex"> */}
        {isLoading ? (
          <BarLoader
          color= "#F05365"
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        ) : (
      <div className="pokedex">
          {pokemon.map((individualPokemon) => (
            <Pokemon
              key={individualPokemon.nameAndURL.name}
              pokemonName={individualPokemon.nameAndURL.name}
              pokemonURL={individualPokemon.nameAndURL.url}
              sprite={individualPokemon.sprite}
              types={individualPokemon.types}
              number={individualPokemon.id}
            />
          ))}
          </div>
        )}
      </div>
      {/* </div> */}
      <div className="buttons">
        {previous ? (
          <button onClick={() => updatePrevious()}>Previous Page</button>
        ) : null}
        {pageCount < 6 && next ? <button onClick={() => updateNext()}>Next Page</button> : null}
      </div>
      </div>
    </>
  );
}

export default Pokedex;
