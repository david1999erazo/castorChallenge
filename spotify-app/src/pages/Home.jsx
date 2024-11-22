import React, { useState } from "react";
import ResultsList from "../components/ResultList";
import SearchForm from "../components/SearchForm";
import { searchSpotify } from "../services/spotifyApi";

const Home = ({ token }) => {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const data = await searchSpotify(query, token);
    setResults(data.tracks.items); // Por ejemplo, para canciones
  };

  return (
    <div className="p-6">
      <SearchForm onSearch={handleSearch} />
      <ResultsList results={results} />
    </div>
  );
};

export default Home;
