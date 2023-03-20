import {useState, createContext } from 'react'

export const PokemonContext = createContext({})

const PokemonProvider = ({children}) => {
  //Stores the original state data values.
  const [pokemon, setPokemon] = useState([])
  const [previous, setPrevious] = useState(null)
  const [next, setNext] = useState(null)
  const [isLoading, setIsLoading] = useState(true) 

  //Stores the state data values.
  const [sprite, setSprite] = useState(null)
  const [number, setNumber] = useState('')
  const [types, setTypes] = useState([])

  //Stores the 151 pokemon state data as an object.
  const [pokemon151, setPokemon151] = useState([])

    return (
        <PokemonContext.Provider value={{pokemon, setPokemon, previous, setPrevious, next, setNext, isLoading, setIsLoading, sprite, setSprite, number, setNumber, types, setTypes, pokemon151, setPokemon151}}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider