import React, { useState, useEffect } from "react";
import Card from "./Card";
import CardInfo from "./CardInfo";

export default function Main() {
  // Différents états du composant
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokeDex, setPokeDex] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [nextUrl, setNextUrl] = useState();

  //Récupération des données depuis l'API
  const pokeFunction = async () => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    getPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);
    setLoading(false);
  };

  //Récupération des inforamtions détaillées d'un Pokémon
  const getPokemon = async (results) => {
    results.map(async (item) => {
      const response = await fetch(item.url);
      const data = await response.json();
      setPokeData((state) => {
        state = [...state, data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFunction();
  }, [url]);

  return (
    <div className="container">
      <div className="leftSpace">
        <Card
          pokemon={pokeData}
          loading={loading}
          infopokemon={(poke) => setPokeDex(poke)}
        />
        <div className="navigationBtn">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl);
              }}
            >
              Previous
            </button>
          )}

          {nextUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="rightSpace">
        <CardInfo data={pokeDex} />
      </div>
    </div>
  );
}
