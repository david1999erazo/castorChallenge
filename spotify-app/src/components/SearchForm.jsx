import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 justify-center items-center max-w-md w-full mx-auto"
    >
      <i className="fab fa-spotify text-green-500 text-3xl"></i>
      <input
        type="text"
        placeholder="Buscar canciones, artistas o álbumes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchForm;
