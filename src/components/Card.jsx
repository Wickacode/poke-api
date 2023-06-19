import React from "react";

export default function Card({ pokemon, loading, infopokemon }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"center", gap:"1em" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div key={item.id} onClick={() => infopokemon(item)}>
              <div className="pokeList">
                <h4>{item.id}</h4>
                <img src={item.sprites.front_default} alt={item.name} />
                <span>{item.name}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
