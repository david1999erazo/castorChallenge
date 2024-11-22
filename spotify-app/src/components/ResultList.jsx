import React from "react";

const ResultsList = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {results.map((item) => (
        <div key={item.id} className="p-4 border rounded">
          <img
            src={item.album.images[0]?.url}
            alt={item.name}
            className="w-full rounded"
          />
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>{item.artists[0]?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
