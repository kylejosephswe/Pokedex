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

  /*
  const displayTypes = () => {
    if (types.length > 1) {
      return <div>
        <p>{types[0].type.name}</p>
        <p>{types[1].type.name}</p>
      </div>
    }
    else {
      return <p>
        {types[0].type.name}
      </p>
    }
  }
*/

  return (
    <div className="pokemon-card">
      {isLoading ? <h2>Loading...</h2> :
        <img className="pokemon-sprite" src={sprite} alt="pokemon sprite"></img>
      }
      {renderNumber()}
      <h4 className="pokemon-name">{pokemonName}</h4>
      {/*displayTypes()*/}
    </div>
  )
}

export default Pokemon