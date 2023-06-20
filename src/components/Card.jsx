import React, { useEffect, useState } from "react";

export default function Card({ pokemon, loading, infopokemon, filterType }) {
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    if (filterType) {
      const filtered = pokemon.filter((item) =>
        item.types.some((type) => type.type.name === filterType)
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(pokemon);
    }
  }, [pokemon, filterType]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1em", margin: "20px 0" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        filteredPokemon.map((item) => (
          <div key={item.id} onClick={() => infopokemon(item)}>
            <div className="pokeList">
              <h4>{item.id}</h4>
              <img src={item.sprites.front_default} alt={item.name} />
              <span>{item.name}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
