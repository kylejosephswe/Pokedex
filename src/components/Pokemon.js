import { useState, useEffect } from 'react'

function Pokemon({ pokemonName, pokemonURL }) {

  const [sprite, setSprite] = useState('')
  const [number, setNumber] = useState('')
  const [types, setTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const retrievePokemonSprite = async () => {
      const response = await fetch(`${pokemonURL}`)
      const data = await response.json()
      setSprite(data.sprites.front_default)
      setNumber(data.id)
      setTypes(data.types)
      setIsLoading(false)
      console.log(data.types)
    }
    retrievePokemonSprite()
  }, [pokemonURL])

  const renderNumber = () => {
    if (number < 10) {
      return <p className="number">{'#000' + number.toString()}</p>
    }
    else if (number < 100) {
      return <p>{'#00' + number.toString()}</p>
    }
    else if (number < 1000) {
      return <p>{'#0' + number.toString()}</p>
    }
    else if (number > 1000) {
      return <p>{'#' + number.toString()}</p>
    }
    return
  }

  const typeTable = {
    'grass': '#9bcc50',
    'poison': '#b97fc9',
    'fire': '#fd7d24',
    'water': '#4592c4',
    'bug': '#729f3f',
    'flying': '#3dc7ef',
    'fairy': '#fdb9e9',
    'ground': '#f7de3f',
    'normal': '#a4acaf',
    'fighting': '#d56723',
    'psychic': '#f366b9',
    'rock': '#a38c21',
    'electric': '#eed535',
    'steel': '#9eb7b8',
    'ghost': '#7b62a3',
    'ice': '#51c4e7',
    'dragon': '#53a4cf'
  }

  const displayTypes = () => {
    if(!types || types.length === 0)
    {
      return
    }
    if (types.length > 1) {
      return <div className="multi-type">
        <span className="test-type" style={{backgroundColor: typeTable[types[0].type.name]}} >{types[0].type.name}</span>
        <span className="test-type" style={{backgroundColor: typeTable[types[1].type.name]}}>{types[1].type.name}</span>
      </div>
    }
    else {
      return <span className="test-type" style={{backgroundColor: typeTable[types[0].type.name]}}>
        {types[0].type.name}</span>
    }
  }

  return (
    <div className="pokemon-card">
      {isLoading ? <h2>Loading...</h2> :
        <img className="pokemon-sprite" src={sprite} alt="pokemon sprite"></img>
      }
      {renderNumber()}
      <h4 className="pokemon-name">{pokemonName}</h4>
      {displayTypes()}
    </div>
  )
}

export default Pokemon