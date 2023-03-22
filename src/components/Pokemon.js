function Pokemon({ pokemonName, pokemonURL, sprite, types, number}) {

  //Renders the number to the screen with the appropriate amount of zeros.
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
    else if (number === 1000) {
      return <p>{'#' + number.toString()}</p>
    }
    else if (number > 1000) {
      return <p>{'#' + number.toString()}</p>
    }
    return
  }

  //Hashtable made with key 'type', and value 'color' to allow for efficient type coloring code.
  const typeTable = {
    //type  : color
    'grass': '#9bcc50',
    'poison': '#b97fc9',
    'fire': '#fd7d24',
    'water': '#4592c4',
    'bug': '#729f3f',
    'flying': '#3dc7ef',
    'fairy': '#fdb9e9',
    'ground': '#ab9842',
    'normal': '#a4acaf',
    'fighting': '#d56723',
    'psychic': '#f366b9',
    'rock': '#a38c21',
    'electric': '#eed535',
    'steel': '#9eb7b8',
    'ghost': '#7b62a3',
    'ice': '#51c4e7',
    'dark': '#707070',
    'dragon': '#53a4cf'
  }

  //Returns the types for the pokemon depending on if the Pokemon has one or two types.
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

  return number > 1008 ? null : (
    <div className="pokemon-card">
      <img className="pokemon-sprite" src={sprite} alt="pokemon sprite"></img>
      {renderNumber()}
        <a href={`https://www.pokemon.com/us/pokedex/${pokemonName}`} target="_blank" rel="noreferrer">
      <h4 className="pokemon-name">{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h4>
        </a>
      {displayTypes()}
    </div>
  )
}

export default Pokemon