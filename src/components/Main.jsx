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
  const [availablePages, setAvailablePages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");

  //Récupération des données depuis l'API
  const pokeFunction = async () => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    getPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);

    const totalPages = Math.ceil(data.count / data.results.length);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    setAvailablePages(pages);

    setLoading(false);
  };

  //Récupération des inforamtions détaillées d'un Pokémon
  const getPokemon = async (results) => {
    const pokemonData = await Promise.all(
      results.map(async (item) => {
        const response = await fetch(item.url);
        const data = await response.json();
        return data;
      })
    );

    const sortedData = pokemonData.sort((a, b) => (a.id > b.id ? 1 : -1));
    setPokeData(sortedData);
  };

  const handlePageChange = (e) => {
    const selectedPage = e.target.value;
    setSelectedPage(selectedPage);
    setUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        (selectedPage - 1) * 20
      }&limit=20`
    );
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

          <select value={selectedPage} onChange={handlePageChange} style={{ border: "none", padding: "10px" }}>
            <option value="">Pages</option>
            {availablePages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>

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
