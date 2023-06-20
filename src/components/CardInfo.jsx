import React, { useState } from "react";

export default function CardInfo({ data, pokemonTypes, onFilterChange }) {
  const [filterType, setFilterType] = useState("");

  const filteredAbilities = data?.abilities?.filter(
    (poke) => poke.ability.type?.name === filterType
  );

  return (
    <div className="cardInfoContainer">
      {!data ? (
        <div>Loading ...</div>
      ) : (
        <>
          <h1>{data.name}</h1>
          <div className="types">
            <span>Type: </span>
            <ul>
              {data.types.map((type) => (
                <li key={type.type.name}> {type.type.name}</li>
              ))}
            </ul>
          </div>
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
