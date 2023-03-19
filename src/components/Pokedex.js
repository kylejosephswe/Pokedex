import { useState, useEffect } from 'react'
import Pokemon from './Pokemon'
function Pokedex() {
  const [pokemon, setPokemon] = useState([])
  const [previous, setPrevious] = useState(null)
  const [next, setNext] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
  const retrievePokemonName = async () => {
    setIsLoading(true)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
    const data = await response.json()
    setPokemon(data.results)
    setPrevious(data.previous)
    setNext(data.next)
    setIsLoading(false)
  }
    retrievePokemonName()
  }, [])

  const updateNext = async () => {
    setIsLoading(true)
    const response = await fetch(`${next}`)
    const data = await response.json()
    setPokemon(data.results)
    setPrevious(data.previous)
    setNext(data.next)
    setIsLoading(false)
  }

  const updatePrevious = async () => {
    setIsLoading(true)
    const response = await fetch(`${previous}`)
    const data = await response.json()
    setPokemon(data.results)
    setPrevious(data.previous)
    setNext(data.next)
    setIsLoading(false)
  }

  return (
    <>
    <div className="pokedex">
      { isLoading ? <h1 className="loading">Loading...</h1> : 
      pokemon.map((individualPokemon) => 
      <Pokemon key={individualPokemon.name} pokemonName={individualPokemon.name} pokemonURL={individualPokemon.url} />
      ) }
    </div>
    <div className="buttons">
      {previous ? <button onClick={() => updatePrevious()} >Previous Page</button> : null}
      {next && <button onClick={() => updateNext()} >Next Page</button>}
    </div>
    </>
  )
}

export default Pokedex