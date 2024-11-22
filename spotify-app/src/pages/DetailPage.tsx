import React, { useEffect, useState } from "react";
import { getDetails } from "../services/spotifyApi";
import { SpotifyDetails } from "../interfaces/spotify.interface";

const DetailPage = ({ id, type, token }) => {
  const [details, setDetails] = useState<SpotifyDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getDetails(id, type, token);
      setDetails(data);
    };
    fetchDetails();
  }, [id, type, token]);

  if (!details) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <img
        src={details.images[0]?.url}
        alt={details.name}
        className="w-1/2 mx-auto"
      />
      <h1 className="text-3xl font-bold mt-4">{details.name}</h1>
      <audio controls src={details.preview_url} className="mt-4 w-full">
        Tu navegador no soporta el reproductor de audio.
      </audio>
    </div>
  );
};

export default DetailPage;
