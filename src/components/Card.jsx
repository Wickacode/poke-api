import React, { useEffect, useState, useContext } from "react";
import { FilterContext } from "../pages/Main";

export default function Card({ pokemon, loading, infopokemon }) {
  const { filterType } = useContext(FilterContext);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    if (filterType) {
      const filtered = pokemon.filter((item) =>
        item.name.toLowerCase().startsWith(filterType.toLowerCase())
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(pokemon);
    }
  }, [pokemon, filterType]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1em",
        margin: "20px 0",
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        filteredPokemon.map((item) => (
          <div key={item.id} onClick={() => infopokemon(item)}>
            <div className="pokeList">
              <h4>{item.id}</h4>
              <img src={item.sprites.front_default} alt={item.name} />
              <span>{capitalizeFirstLetter(item.name)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
