import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const fetches = data.results.map(p => fetch(p.url).then(res => res.json()));
        Promise.all(fetches).then(pokemonData => setPokemon(pokemonData));
      });
  }, []);

  return (
    <div className="App">
      <h1>Pokémon</h1>
      <input 
        type="text" 
        placeholder="Search Pokémon"
        onChange={e => setSearch(e.target.value.toLowerCase())} 
      />
      <div className="pokemon-container">
        {pokemon.filter(p => p.name.includes(search)).map(p => (
          <div key={p.id} className="pokemon-card">
            <img src={p.sprites.front_default} alt={p.name} />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;