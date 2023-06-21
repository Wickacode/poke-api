import React from "react";

export default function CardInfo({ data}) {

  return (
    <div className="cardInfoContainer">
      {!data ? (
        <div className="loader" />
      ) : (
        <>
          <h1>{data.name}</h1>
          <div className="basicDetails">
            <div className="types">
              <span>Type: </span>
              <ul>
                {data.types.map((type) => (
                  <li key={type.type.name}> {type.type.name}</li>
                ))}
              </ul>
            </div>

            <div className="dimensions">
              <p>
                <b>Height: </b> {data.height}
              </p>
              <p>
                <b>Weight: </b> {data.weight}
              </p>
            </div>
          </div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />

          <ul className="abilities">
          {data.abilities.map((poke) => (
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
