import React, { useState, useEffect, createContext } from "react";
import Card from "../components/Card";
import CardInfo from "../components/CardInfo";
import ErrorPage from "./ErrorPage";

export const FilterContext = createContext();

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
  const [error, setError] = useState(false);

  const pokeFunction = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await res.json();
      getPokemon(data.results);
      setPrevUrl(data.previous);
      setNextUrl(data.next);

      const totalPages = Math.ceil(data.count / data.results.length);
      const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
      setAvailablePages(pages.reduce((acc, page) => [...acc, page], []));
    } catch (error) {
      setError(true);
    }

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
    <FilterContext.Provider value={{ filterType: filter, setFilterType: setFilter }}>
      <div className="container">
        <div className="leftSpace">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Filtrer par nom..."
            className="nameFilter"
          />

          {error ? (
            <ErrorPage />
          ) : (
            <Card
              pokemon={pokeData}
              loading={loading}
              infopokemon={(poke) => setPokeDex(poke)}
            />
          )}
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
              className="pageSelection"
            >
              {availablePages.map((page) => (
                <option key={page} value={page.toString()}>
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
          {pokeDex ? <CardInfo data={pokeDex} /> : <h3>No Pokemon selected</h3>}
        </div>
      </div>
    </FilterContext.Provider>
  );
}
