import React, { useState } from "react";

export default function CardInfo({ data, pokemonTypes, onFilterChange }) {
  const [filterType, setFilterType] = useState("");

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    onFilterChange(selectedType);
  };

  const filteredAbilities = data?.abilities?.filter(
    (poke) => poke.ability.type?.name === filterType
  );

  return (
    <div className="cardInfoContainer">
      <div className="filters">
        <label htmlFor="filterType">Filtrer par type :</label>
        <select id="filterType" onChange={handleFilterChange}>
          <option value="">All</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {!data ? (
        <div>Loading ...</div>
      ) : (
        <>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <ul className="abilities">
            {filteredAbilities.map((poke) => (
              <li key={poke.ability.name}>{poke.ability.name}</li>
            ))}
          </ul>
          <div className="stats">
            {data.stats.map((poke) => {
              return (
                <>
                  <span>
                    {poke.stat.name}: {poke.base_stat}
                  </span>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
