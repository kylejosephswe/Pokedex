import { useState } from 'react'

function SearchBar() {
  const [search, setSearch] = useState('')
  console.log(search)
  return (
    <input 
    type="text" 
    placeholder="Search Pokemon..."
    className="search-bar"
    onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default SearchBar