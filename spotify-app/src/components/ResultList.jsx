import React from "react";
import { Link } from "react-router-dom";

const ResultsList = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-lg font-bold">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 mx-4">
      {results.map((item) => (
        <Link
          to={`/details/${item.id}`}
          key={item.id}
          className="p-3 border rounded"
        >
          <img
            src={item.album.images[0]?.url}
            alt={item.name}
            className="w-full rounded  h-70"
          />
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>{item.artists[0]?.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ResultsList;
