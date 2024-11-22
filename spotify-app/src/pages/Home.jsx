import React, { useState } from "react";
import ResultsList from "../components/ResultList";
import SearchForm from "../components/SearchForm";
import { searchSpotify } from "../services/spotifyApi";

const Home = ({ token }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const data = await searchSpotify(query, token);
      setResults(data.tracks.items);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in search spotify server");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <SearchForm onSearch={handleSearch} />
      <ResultsList results={results} isLoading={isLoading} />
    </div>
  );
};

export default Home;
