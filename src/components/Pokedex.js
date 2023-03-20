import {useEffect, useContext } from 'react'
import { PokemonContext } from '.././context/PokemonContext'
import Pokemon from './Pokemon'

function Pokedex() {
  const pokedexContext = useContext(PokemonContext)
  const {pokemon, setPokemon, isLoading, setIsLoading, next, setNext, previous, setPrevious} = pokedexContext

  //Updates the state data values by calling the API.
  useEffect(() => {
  const retrievePokemonName = async () => {
  setIsLoading(true);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const data = await response.json();
  setNext(data.next)
  setPrevious(data.previous)

  const pokemonDataPromises = data.results.map(async pokemon => {
    const response = await fetch(pokemon.url);
    return response.json();
  });

  const pokemonData = await Promise.all(pokemonDataPromises);

  const formattedPokemonData = pokemonData.map(data => {
    return {
      nameAndURL: {
        name: data.name,
        url: data.url,
      },
      previous: data.previous,
      next: data.next,
      sprite: data.sprites.front_default,
      id: data.id,
      types: data.types
    }
  });

  setPokemon(formattedPokemonData);
  setIsLoading(false);
}
  /*
  const retrieve151PokemonName = async () => {
    setIsLoading(true)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`)
    const data = await response.json()
    setPokemon151(data.results)
    setIsLoading(false)
  }
  */

    retrievePokemonName()
    //retrieve151PokemonName()
  }, [setIsLoading, setNext, setPokemon, setPrevious])

  //Updates the screen by calling the API on click of the next button, and stores the next 20 Pokemon in the state variables. 
  const updateNext = async () => {
    setIsLoading(true)
    const response = await fetch(`${next}`)
    const data = await response.json()
  setNext(data.next)
  setPrevious(data.previous)
    

  const pokemonDataPromises = data.results.map(async pokemon => {
    const response = await fetch(pokemon.url);
    return response.json();
  });

  const pokemonData = await Promise.all(pokemonDataPromises);

  const formattedPokemonData = pokemonData.map(data => {
    return { 
      nameAndURL: {
        name: data.name,
        url: data.url,
      },
      previous: data.previous,
      next: data.next,
      sprite: data.sprites.front_default,
      id: data.id,
      types: data.types
    }
  });

  setPokemon(formattedPokemonData);
  setIsLoading(false);

  }

  //Updates the screen by calling the API on click of the previous button, and stores the previous 20 Pokemon in the state variables. 
  const updatePrevious = async () => {
    setIsLoading(true)
    const response = await fetch(`${previous}`)
    const data = await response.json()
    setPrevious(data.previous)
    setNext(data.next)

  const pokemonDataPromises = data.results.map(async pokemon => {
    const response = await fetch(pokemon.url);
    return response.json();
  });

  const pokemonData = await Promise.all(pokemonDataPromises);

  const formattedPokemonData = pokemonData.map(data => {
    return { 
      nameAndURL: {
        name: data.name,
        url: data.url,
      },
      previous: data.previous,
      next: data.next,
      sprite: data.sprites.front_default,
      id: data.id,
      types: data.types
    }
  });

  setPokemon(formattedPokemonData);
  setIsLoading(false);

  }

  return (
    <>
    <div className="pokedex">
      {isLoading ? <h1 className="loading">Loading...</h1> : 
      pokemon.map((individualPokemon) => 
      <Pokemon 
      key={individualPokemon.nameAndURL.name} 
      pokemonName={individualPokemon.nameAndURL.name} 
      pokemonURL={individualPokemon.nameAndURL.url}
      sprite={individualPokemon.sprite}
      types={individualPokemon.types}
      number={individualPokemon.id}
      />
  )}
    </div>
    <div className="buttons">
      {previous ? <button onClick={() => updatePrevious()} >Previous Page</button> : null}
      {next && <button onClick={() => updateNext()} >Next Page</button>}
    </div>
    </>
  )
}

export default Pokedex