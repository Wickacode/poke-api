import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import CardInfo from "../components/CardInfo";

export default function Main() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokeDex, setPokeDex] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [nextUrl, setNextUrl] = useState();
  const [availablePages, setAvailablePages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(parseInt(selectedPage));
    setUrl(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        (selectedPage - 1) * 20
      }&limit=20`
    );
  };

  useEffect(() => {
    pokeFunction();
  }, [url]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container">
      <div className="leftSpace">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filtrer par nom..."
          className="nameFilter"
        />

        <Card
          pokemon={pokeData.filter((poke) =>
            poke.name.toLowerCase().includes(filter.toLowerCase())
          )}
          loading={loading}
          infopokemon={(poke) => setPokeDex(poke)}
        />
        <div className="navigationBtn">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl);
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </button>
          )}

          <select
            value={currentPage.toString()}
            onChange={handlePageChange}
            style={{ border: "none", padding: "10px" }}
          >
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
                setCurrentPage(currentPage + 1);
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
